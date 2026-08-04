import TimelineDayBadgeSection from "@/components/timeline/section/TimelineDayBadgeSection";
import TimelineDaySection from "@/components/timeline/section/TimelineDaySection";
import { useTimelineScrollSpy } from "@/hooks/useTimelineScrollSpy";
import { INITIAL_PLAN, UPCOMING_TRIPS } from "@/mocks/trip";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import EmptyState from "../EmptyState";
import UpcomingTripCard from "../upcoming/UpcomingTripCard";

type UpcomingTripSectionProps = {};

export default function UpcomingTripSection({}: UpcomingTripSectionProps) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const {
    activeIndex,
    setActiveIndex,
    mainScrollRef,
    moveToSection,
    handleScroll,
    handleSectionLayout,
    handleBadgeLayout,
  } = useTimelineScrollSpy();

  const [plan] = useState(INITIAL_PLAN);

  const openBottomSheet = () => {
    bottomSheetRef.current?.present();
  };

  return (
    <ScrollView>
      <View className="flex-1 p-5">
        {UPCOMING_TRIPS.length === 0 ? (
          <EmptyState
            title="아직 여행 일정이 없어요."
            description="새로운 여행 일정을 만들까요?"
            actionLabel="새 일정 만들기"
            onPressAction={() => router.push("/trip/condition")}
          />
        ) : (
          <>
            {UPCOMING_TRIPS.map((trip) => (
              <UpcomingTripCard
                key={trip.id}
                trip={trip}
                onPress={() => {
                  openBottomSheet();
                }}
              />
            ))}

            <BottomSheetModal
              ref={bottomSheetRef}
              snapPoints={["70%"]}
              enableDynamicSizing={false}
              enablePanDownToClose
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
              <View className={`overflow-hidden px-5`}>
                <TimelineDayBadgeSection
                  badgeOrder={plan.map(({ id }) => id)}
                  showEditButton={false}
                  onPressDayBadge={moveToSection}
                  onLayoutDayBadge={handleBadgeLayout}
                  activeIndex={activeIndex}
                  setActiveIndex={setActiveIndex}
                  paddingHorizontal={0}
                />
              </View>

              <BottomSheetScrollView
                ref={mainScrollRef}
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
                    onLayout={(e) => handleSectionLayout(index, e)}
                    dayIndex={index}
                  />
                ))}
              </BottomSheetScrollView>
            </BottomSheetModal>
          </>
        )}
      </View>
    </ScrollView>
  );
}
