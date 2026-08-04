import TimelineDayBadgeSection from "@/components/timeline/section/TimelineDayBadgeSection";
import TimelineDaySection from "@/components/timeline/section/TimelineDaySection";
import { useTimelineScrollSpy } from "@/hooks/useTimelineScrollSpy";
import { INITIAL_PLAN, UPCOMING_TRIPS } from "@/mocks/trip";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useMemo, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import EmptyState from "../EmptyState";
import UpcomingTripCard from "../upcoming/UpcomingTripCard";

type UpcomingTripSectionProps = {};

export default function UpcomingTripSection({}: UpcomingTripSectionProps) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [isContentReady, setIsContentReady] = useState(false);

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

  const [plan] = useState(INITIAL_PLAN);
  const badgeOrder = useMemo(() => plan.map(({ id }) => id), [plan]);

  // 다른 페이지로 이동 시(화면 포커스 해제 시) 바텀시트 모달 자동 닫기
  useFocusEffect(
    useCallback(() => {
      return () => {
        bottomSheetRef.current?.dismiss();
      };
    }, []),
  );

  const openBottomSheet = useCallback(() => {
    setIsContentReady(false);
    bottomSheetRef.current?.present();
    // 모달 슬라이드 애니메이션이 시작된 직후 내부에 무거운 타임라인 리스트를 렌더링 (지연 렌더링으로 프레임 드랍 방지)
    requestAnimationFrame(() => {
      setIsContentReady(true);
    });
  }, []);

  const handleSheetChange = useCallback((index: number) => {
    if (index === -1) {
      setIsContentReady(false);
    }
  }, []);

  return (
    <View className="flex-1">
      {UPCOMING_TRIPS.length === 0 ? (
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
              {UPCOMING_TRIPS.map((trip) => (
                <UpcomingTripCard
                  key={trip.id}
                  trip={trip}
                  onPress={openBottomSheet}
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
