import BottomSheet from "@/components/common/BottomSheet";
import TimelineDayBadgeSection from "@/components/timeline/section/TimelineDayBadgeSection";
import TimelineDaySection from "@/components/timeline/section/TimelineDaySection";
import { useExpandedItems } from "@/hooks/useExpandedItems";
import { useTimelineScrollSpy } from "@/hooks/useTimelineScrollSpy";
import { useTripPlanEditor } from "@/hooks/useTripPlanEditor";
import { INITIAL_PLAN, UPCOMING_TRIPS } from "@/mocks/trip";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import EmptyState from "../EmptyState";
import UpcomingTripCard from "../upcoming/UpcomingTripCard";

type UpcomingTripSectionProps = {};

export default function UpcomingTripSection({}: UpcomingTripSectionProps) {
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const {
    activeIndex,
    setActiveIndex,
    mainScrollRef,
    badgeScrollRef,
    handlePressDayBadge,
    handleMainScroll,
    handleSectionLayout,
    handleBadgeLayout,
  } = useTimelineScrollSpy();

  const { visiblePlan, isEditing, requestDeleteDay, pressEditButton } = useTripPlanEditor({
    initialPlan: INITIAL_PLAN,
    activeIndex,
    onActiveIndexChange: setActiveIndex,
  });

  const { expandedIds, toggleExpand } = useExpandedItems([""]);

  return (
    <ScrollView>
      <View className="flex-1 p-5">
        {/* nodata */}
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
                onPress={(id) => {
                  console.log("상세 이동", id);
                  setShowBottomSheet(true);
                }}
              />
            ))}
            {showBottomSheet && (
              <BottomSheet visible={showBottomSheet} onClose={() => setShowBottomSheet(false)}>
                <>
                  <TimelineDayBadgeSection
                    dayIndices={visiblePlan.map(({ index }) => index)}
                    activeIndex={activeIndex}
                    isEditing={isEditing}
                    showEditButton={false}
                    onPressDayBadge={handlePressDayBadge}
                    onLayoutDayBadge={handleBadgeLayout}
                    onRequestDeleteDay={requestDeleteDay}
                    onPressEditButton={pressEditButton}
                  />

                  {/* 일정 리스트 */}
                  <ScrollView
                    ref={mainScrollRef}
                    className="flex-1"
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                    onScroll={handleMainScroll}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                  >
                    {visiblePlan.map(({ dayPlan, index }) => (
                      <TimelineDaySection
                        key={index}
                        dayPlan={dayPlan}
                        isOngoing={false}
                        isUpcoming={true}
                        dayOrder={index + 1}
                        expandedIds={expandedIds}
                        onToggleItem={toggleExpand}
                        onLayout={(e) => handleSectionLayout(index, e)}
                      />
                    ))}
                  </ScrollView>
                </>
              </BottomSheet>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
}
