import { CourseDayItem, CourseDetailResponse, CourseSummaryItem } from "@/api/course";
import Spinner from "@/components/common/Spinner";
import KakaoMap from "@/components/explore/KakaoMap";
import TimelineDayBadgeSection from "@/components/timeline/section/TimelineDayBadgeSection";
import TimelineDaySection from "@/components/timeline/section/TimelineDaySection";
import { COURSE_STATE } from "@/constants/Trip";
import { useCourseDetailQuery } from "@/hooks/query/course";
import { useTimelineScrollSpy } from "@/hooks/useTimelineScrollSpy";
import { createRouteInfo, RenderCourseDayItem, transformCourseDetail } from "@/util/route/route";
import { router } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
import WebView from "react-native-webview";
import EmptyState from "../EmptyState";
import OnAirBanner from "../OnAirBanner";

type OngoingTripSectionProps = {
  courses: CourseSummaryItem[] | undefined;
  isPending: boolean;
  isError: boolean;
  refetch: () => {};
};

export default function OngoingTripSection({
  courses,
  isPending: isCoursesPending,
  isError: isCoursesError,
  refetch,
}: OngoingTripSectionProps) {
  const [isLoading, setIsLoading] = useState(true);
  const courseId = courses?.[0]?.courseId ?? undefined;
  const courseStatus = COURSE_STATE.IN_PROGRESS;
  const { data: courseResponse, isFetching, isError } = useCourseDetailQuery(courseId);

  const [tripTitle, setTripTitle] = useState("");
  const webViewRef = useRef<React.ComponentRef<typeof WebView>>(null);
  const [temp, setTemp] = useState<CourseDayItem[]>([]);

  // 오늘 날짜 구하기 (YYYY-MM-DD 포맷)
  const todayStr = useMemo(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);

  // 오늘 날짜에 해당하는 days 배열의 인덱스 계산
  const targetInitialIndex = useMemo(() => {
    if (!courseResponse?.data?.days) return 0;
    const courseDetail: CourseDetailResponse = courseResponse.data;

    const foundIndex = courseDetail.days.findIndex((item) => item.date === todayStr);

    // 오늘 날짜를 찾지 못했거나 범위를 벗어난 경우 0(첫 번째 날)으로 fallback
    return foundIndex !== -1 ? foundIndex : 0;
  }, [courseResponse, todayStr]);

  const {
    activeIndex,
    setActiveIndex,
    mainScrollRef,
    badgeScrollRef,
    moveToSection,
    handleScroll,
    handleBadgeLayout,
    handleBadgeContainerLayout,
    getSectionLayoutHandler,
  } = useTimelineScrollSpy(targetInitialIndex);

  const [selectedSpotIndexes, setSelectedSpotIndexes] = useState<Record<number, number>>({});
  const selectedSpotIndex = selectedSpotIndexes[activeIndex] ?? 0;

  useEffect(() => {
    if (courseResponse?.data) {
      const courseDetail: CourseDetailResponse = courseResponse.data;
      if (courseDetail.title) setTripTitle(courseDetail.title);
      if (courseDetail.days) {
        setTemp(courseDetail.days);
      }
      const EXCLUDE_KEYS = [
        "mapX",
        "mapY",
        "x",
        "y",
        "lat",
        "lng",
        "latitude",
        "longitude",
        "point",
        "points",
        "path",
        "stopNames",
      ];
      // console.log(
      //   "--------------------------courseDetail.transitRoutes--------------------------",
      //   JSON.stringify(
      //     courseDetail.carRoutes,
      //     (key, value) => {
      //       // 제외하고 싶은 좌표 키 값 필터링
      //       if (EXCLUDE_KEYS.includes(key)) {
      //         return undefined; // undefined를 반환하면 해당 키는 출력에서 제외됩니다.
      //       }
      //       return value;
      //     },
      //     2,
      //   ),
      // );
    }
  }, [courseResponse]);

  const transformedDays: RenderCourseDayItem[] = useMemo(() => {
    if (!courseResponse?.data) return [];
    return transformCourseDetail(courseResponse.data);
  }, [courseResponse]);

  const routeInfo = useMemo(() => {
    if (!courseResponse?.data) {
      return null;
    }

    return createRouteInfo(courseResponse.data, activeIndex, selectedSpotIndex);
  }, [courseResponse, activeIndex, selectedSpotIndex]);

  const badgeOrder = useMemo(() => temp.map((_, index) => index + 1), [temp]);
  const screenWidth = Dimensions.get("window").width;
  const animatedPosition = useSharedValue((screenWidth * 2) / 3);

  // 1. 로딩 상태 처리
  if (isFetching) {
    return (
      <View className={`flex-1 justify-center items-center`}>
        <Spinner />
      </View>
    );
  }

  // 2. 에러 상태 처리
  if (isError) {
    return (
      <EmptyState
        title="일정을 불러오지 못했어요."
        description="네트워크 상태를 확인하고 다시 시도해주세요."
        actionLabel="다시 시도"
        onPressAction={() => refetch()}
      />
    );
  }

  return (
    <View className="flex-1">
      {Number(courses?.length) === 0 ? (
        <EmptyState
          title="아직 여행 일정이 없어요."
          description="새로운 여행 일정을 만들까요?"
          actionLabel="새 일정 만들기"
          onPressAction={() => router.push("/roulette")}
        />
      ) : (
        <>
          <OnAirBanner tripTitle={tripTitle} />
          <View className={`w-full aspect-3/2 overflow-hidden`}>
            <KakaoMap
              webViewRef={webViewRef}
              mode={"navigation"}
              routeData={routeInfo}
              animatedPosition={animatedPosition}
              setIsLoading={setIsLoading}
            />
          </View>

          <View className="flex-1">
            <TimelineDayBadgeSection
              badgeOrder={badgeOrder}
              showEditButton={false}
              onPressDayBadge={moveToSection}
              onLayoutDayBadge={handleBadgeLayout}
              onBadgeContainerLayout={handleBadgeContainerLayout}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              badgeScrollRef={badgeScrollRef}
            />

            <ScrollView
              className="flex-1"
              ref={mainScrollRef}
              contentContainerStyle={{
                paddingHorizontal: 20,
              }}
              onScroll={handleScroll}
              scrollEventThrottle={32}
              showsVerticalScrollIndicator={false}
            >
              {temp.map((item, index) => (
                <TimelineDaySection
                  courseId={Number(courseId)}
                  key={item.day}
                  dayPlan={item}
                  // ★ 2. 해당 일차(day)에 해당하는 경로 통합 데이터(transformedSpots) 추가 전달
                  transformedSpots={transformedDays.find((td) => td.day === item.day)?.spots}
                  transportMode={courseResponse?.data.transportMode}
                  mode={courseStatus}
                  dayIndex={index}
                  setPlan={setTemp}
                  onLayout={getSectionLayoutHandler(index)}
                  onRouteSpotChange={(spotIndex) => {
                    setSelectedSpotIndexes((prev) => ({
                      ...prev,
                      [index]: spotIndex,
                    }));
                  }}
                />
              ))}
            </ScrollView>
          </View>
        </>
      )}
    </View>
  );
}
