import {
  CourseDayItem,
  CourseDetailResponse,
  CourseStatus,
  SpotItem,
  updateCourseDaysApi,
} from "@/api/course";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import CustomText from "@/components/common/CustomText";
import DimmedLoading from "@/components/common/DimmedLoading";
import Header from "@/components/common/Header";
import Spinner from "@/components/common/Spinner";
import TimelineExportFooter from "@/components/common/trip/TimelineExportFooter";
import KakaoMap from "@/components/explore/KakaoMap";
import TimelineDayBadgeSection from "@/components/timeline/section/TimelineDayBadgeSection";
import TimelineDaySection from "@/components/timeline/section/TimelineDaySection";
import TripPlanConfirmModal from "@/components/timeline/TripPlanConfirmModal";
import { COURSE_STATE } from "@/constants/Trip";
import { useToast } from "@/contexts/ToastProvider";
import { useConfirmCourseMutation } from "@/hooks/mutation/course";
import { useCourseDetailQuery } from "@/hooks/query/course";
import { useTimelineScrollSpy } from "@/hooks/useTimelineScrollSpy";
import { formatCoursePeriod } from "@/util/date/date";
import {
  createRouteInfo,
  RenderCourseDayItem,
  transformCourseDetail,
} from "@/util/route/route";
import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import WebView from "react-native-webview";

export default function TimelineScreen() {
  const { courseId, courseStatus } = useLocalSearchParams<{
    courseId: string;
    courseStatus: CourseStatus | "TEMP";
  }>();

  const { data: courseResponse, isPending } = useCourseDetailQuery(courseId);
  const { mutate: confirmCourse, isPending: isConfirmPending } =
    useConfirmCourseMutation();
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const { showToast } = useToast();

  const [tripTitle, setTripTitle] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

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
  } = useTimelineScrollSpy();

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [onDrag, setOnDrag] = useState(false);
  const insets = useSafeAreaInsets();

  const [plan, setPlan] = useState<CourseDayItem[]>([]);
  const [temp, setTemp] = useState<CourseDayItem[]>([]);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isPatchPending, setIsPatchPending] = useState(false);
  const [selectedSpotIndexes, setSelectedSpotIndexes] = useState<
    Record<number, number>
  >({});
  const selectedSpotIndex = selectedSpotIndexes[activeIndex] ?? 0;

  const webViewRef = useRef<React.ComponentRef<typeof WebView>>(null);
  const isInitialRender = useRef(true);

  // API 데이터 수신 시 title 및 일정 상태 세팅
  useEffect(() => {
    if (courseResponse?.data) {
      const courseDetail: CourseDetailResponse = courseResponse.data;
      if (courseDetail.title) setTripTitle(courseDetail.title);
      if (courseDetail.days) {
        setPlan(courseDetail.days);
        setTemp(courseDetail.days);
      }
    }
  }, [courseResponse]);

  useEffect(() => {
    // 최초 렌더링 시점이거나 아직 데이터 로딩 전이라면 실행하지 않음
    if (isInitialRender.current) {
      if (
        courseResponse?.data?.title &&
        tripTitle === courseResponse.data.title
      ) {
        isInitialRender.current = false;
      }
      return;
    }

    // 사용자가 직접 제목을 수정했을 때만 실행
    handleSaveCourseDays();
  }, [tripTitle]);

  // ★ 1. 경로 데이터가 매핑된 렌더링용 Day 데이터 생성
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

  const handleSaveCourseDays = async (daysOverride?: CourseDayItem[]) => {
    const daysToSave = daysOverride ?? temp;

    setIsPatchPending(true);
    setIsEditing(false);
    setIsConfirmOpen(false);
    try {
      const requestBody = {
        title: tripTitle,
        days: daysToSave.map((item) => ({
          day: item.day,
          contentIds: item.spots
            ? item.spots.map((spot) => spot.contentId)
            : [],
        })),
      };

      await updateCourseDaysApi(courseId, requestBody);

      await queryClient.invalidateQueries({
        queryKey: ["courseDetail", courseId],
      });
    } catch (error: any) {
    } finally {
      setIsPatchPending(false);
    }
  };

  const handlePlaceChanged = useCallback(
    ({
      dayDate,
      changeTargetId,
      changedPlace,
    }: {
      dayDate: string;
      changeTargetId: number;
      changedPlace: SpotItem;
    }) => {
      const updatedTemp = temp.map((day) =>
        day.date === dayDate
          ? {
              ...day,
              spots: day.spots.map((place) =>
                place.contentId === changeTargetId
                  ? { ...place, ...changedPlace }
                  : place,
              ),
            }
          : day,
      );

      setTemp(updatedTemp);
      handleSaveCourseDays(updatedTemp);
    },
    [temp],
  );

  const handleConfirmOpen = useCallback(() => {
    if (plan === temp) setIsEditing(false);
    else setIsConfirmOpen(true);
  }, [plan, temp]);

  const badgeOrder = useMemo(() => temp.map((_, index) => index + 1), [temp]);

  const handleConfirmCourse = () => {
    confirmCourse(
      { courseId: Number(courseId) },
      {
        onSuccess: () => {
          showToast("코스가 확정되었습니다.");
          if (navigation.canGoBack()) {
            navigation.goBack();
          }
        },
        onError: (error: any) => {
          console.error("코스 확정 에러:", error);
        },
      },
    );
  };

  const screenWidth = Dimensions.get("window").width;
  const animatedPosition = useSharedValue((screenWidth * 2) / 3);

  useEffect(() => {
    return () => {
      if (courseStatus === COURSE_STATE.TEMP)
        showToast("일정이 임시저장되었어요.");
    };
  }, []);

  if (isPending || !courseResponse?.data) {
    return (
      <View className={`flex-1 justify-center items-center bg-bg`}>
        <Spinner />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <Header
        title={tripTitle}
        showPencil={courseStatus === COURSE_STATE.TEMP}
        onTitleChange={(newTitle) => setTripTitle(newTitle)}
      />

      {courseStatus !== COURSE_STATE.TEMP && (
        <View className={`w-full aspect-3/2 overflow-hidden`}>
          <KakaoMap
            webViewRef={webViewRef}
            mode={"navigation"}
            routeData={routeInfo}
            animatedPosition={animatedPosition}
            setIsLoading={setIsLoading}
          />
        </View>
      )}

      <View className="flex-1">
        <TimelineDayBadgeSection
          badgeOrder={badgeOrder}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          showEditButton={courseStatus === COURSE_STATE.TEMP}
          setPlan={setTemp}
          onPressDayBadge={moveToSection}
          handleConfirmOpen={handleConfirmOpen}
          onLayoutDayBadge={handleBadgeLayout}
          onBadgeContainerLayout={handleBadgeContainerLayout}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          badgeScrollRef={badgeScrollRef}
        />

        {isEditing && (
          <View className="pl-7 pb-1">
            <CustomText font="body3" className="min-w-5 text-text-muted">
              끌어서 장소의 순서를 변경해보세요.
            </CustomText>
          </View>
        )}

        <ScrollView
          className="flex-1"
          ref={mainScrollRef}
          contentContainerStyle={{
            paddingHorizontal: 20,
          }}
          scrollEnabled={!onDrag}
          onScroll={handleScroll}
          scrollEventThrottle={32}
          showsVerticalScrollIndicator={false}
        >
          {temp.map((item, index) => (
            <TimelineDaySection
              courseId={Number(courseId)}
              key={item.day}
              setOnDrag={setOnDrag}
              dayPlan={item}
              // ★ 2. 해당 일차(day)에 해당하는 경로 통합 데이터(transformedSpots) 추가 전달
              transformedSpots={
                transformedDays.find((td) => td.day === item.day)?.spots
              }
              transportMode={courseResponse.data.transportMode}
              mode={courseStatus}
              isEditing={isEditing}
              dayIndex={index}
              setPlan={setTemp}
              onLayout={getSectionLayoutHandler(index)}
              onPlaceChanged={handlePlaceChanged}
              onRouteSpotChange={(spotIndex) => {
                setSelectedSpotIndexes((prev) => ({
                  ...prev,
                  [index]: spotIndex,
                }));
              }}
            />
          ))}
        </ScrollView>

        {courseStatus === COURSE_STATE.TEMP && (
          <TimelineExportFooter
            isEditing={isEditing}
            onConfirm={() => {
              setModalVisible(true);
            }}
          />
        )}
      </View>

      <ConfirmDialog
        visible={isConfirmOpen}
        title="이 일정을 저장할까요?"
        cancelText="취소"
        confirmText="저장하기"
        onConfirm={() => handleSaveCourseDays()}
        onClose={() => {
          setTemp(plan);
          setIsEditing(false);
          setIsConfirmOpen(false);
        }}
      />
      <TripPlanConfirmModal
        title={tripTitle}
        dateRange={formatCoursePeriod(temp)}
        plan={plan}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={(selectedDay) => {
          setModalVisible(false);
          handleConfirmCourse();
        }}
      />
      <DimmedLoading visible={isPatchPending || isConfirmPending} />
    </View>
  );
}
