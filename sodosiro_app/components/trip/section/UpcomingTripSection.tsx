import { CourseSummaryItem } from "@/api/course";
import TimelineDayBadgeSection from "@/components/timeline/section/TimelineDayBadgeSection";
import TimelineDaySection from "@/components/timeline/section/TimelineDaySection";
import { useTimelineScrollSpy } from "@/hooks/useTimelineScrollSpy";
import { INITIAL_PLAN } from "@/mocks/trip";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useMemo, useRef, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import EmptyState from "../EmptyState";
import UpcomingTripCard from "../upcoming/UpcomingTripCard";

type UpcomingTripSectionProps = {
  courses: CourseSummaryItem[] | undefined;
  isPending: boolean;
  isError: boolean;
};

export default function UpcomingTripSection({
  courses,
  isPending,
  isError,
}: UpcomingTripSectionProps) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [isContentReady, setIsContentReady] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseSummaryItem | null>(null);

  console.log("courses", courses);
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

  // TODO: 향후 selectedCourse.courseId 기반으로 상세 타임라인 조회 API(INITIAL_PLAN 대체) 연결 가능
  const [plan] = useState(INITIAL_PLAN);
  const badgeOrder = useMemo(() => plan.map(({ id }) => id), [plan]);

  // 다른 페이지 이동 시 바텀시트 모달 자동 닫기
  useFocusEffect(
    useCallback(() => {
      return () => {
        bottomSheetRef.current?.dismiss();
      };
    }, []),
  );

  const openBottomSheet = useCallback((course: CourseSummaryItem) => {
    setSelectedCourse(course);
    setIsContentReady(false);
    bottomSheetRef.current?.present();

    requestAnimationFrame(() => {
      setIsContentReady(true);
    });
  }, []);

  const handleSheetChange = useCallback((index: number) => {
    if (index === -1) {
      setIsContentReady(false);
      setSelectedCourse(null);
    }
  }, []);

  // 1. 로딩 상태 처리
  if (isPending) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#7E9432" />
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
        onPressAction={() => router.replace("/trip")}
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
          onPressAction={() => router.push("/trip/condition")}
        />
      ) : (
        <>
          <ScrollView className="flex-1">
            <View className="p-5">
              {courses?.map((course) => (
                <UpcomingTripCard
                  key={course.courseId}
                  course={course} // trip대신 course 데이터 전달
                  onPress={() => openBottomSheet(course)}
                />
              ))}
            </View>
          </ScrollView>

          <BottomSheetModal
            ref={bottomSheetRef}
            snapPoints={["70%"]}
            enableDynamicSizing={false}
            enablePanDownToClose
            onChange={handleSheetChange}
            backgroundStyle={{
              borderRadius: 24,
            }}
            backdropComponent={(props) => (
              <BottomSheetBackdrop
                {...props}
                appearsOnIndex={0}
                disappearsOnIndex={-1}
                opacity={0.5}
                pressBehavior="close"
              />
            )}
            handleIndicatorStyle={{
              backgroundColor: "#E6E6E6",
              width: 50,
              height: 5,
            }}
          >
            {isContentReady && (
              <>
                <View className="overflow-hidden px-5">
                  <TimelineDayBadgeSection
                    badgeOrder={badgeOrder}
                    showEditButton={false}
                    onPressDayBadge={moveToSection}
                    onLayoutDayBadge={handleBadgeLayout}
                    onBadgeContainerLayout={handleBadgeContainerLayout}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                    paddingHorizontal={0}
                    badgeScrollRef={badgeScrollRef}
                  />
                </View>

                <BottomSheetScrollView
                  ref={mainScrollRef as any}
                  contentContainerStyle={{
                    paddingHorizontal: 20,
                  }}
                  onScroll={handleScroll}
                  showsVerticalScrollIndicator={false}
                >
                  {plan.map((dayPlan, index) => (
                    <TimelineDaySection
                      key={dayPlan.id}
                      dayPlan={dayPlan}
                      mode="isUpcoming"
                      onLayout={getSectionLayoutHandler(index)}
                      dayIndex={index}
                    />
                  ))}
                </BottomSheetScrollView>
              </>
            )}
          </BottomSheetModal>
        </>
      )}
    </View>
  );
}
