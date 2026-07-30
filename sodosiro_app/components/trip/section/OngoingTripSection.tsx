import TimelineDayBadgeSection from "@/components/timeline/section/TimelineDayBadgeSection";

import TimelineDaySection from "@/components/timeline/section/TimelineDaySection";
import { useExpandedItems } from "@/hooks/useExpandedItems";
import { useTimelineScrollSpy } from "@/hooks/useTimelineScrollSpy";
import { useTripPlanEditor } from "@/hooks/useTripPlanEditor";
import { INITIAL_PLAN } from "@/mocks/trip";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { Image, LayoutChangeEvent, ScrollView, View } from "react-native";
import EmptyState from "../EmptyState";
import OnAirBanner from "../OnAirBanner";

const DEFAULT_BUTTON_WIDTH = 96;
type OngoingTripSectionProps = {};

export default function OngoingTripSection({}: OngoingTripSectionProps) {
  const [tripTitle, setTripTitle] = useState("강릉 여행");
  const [editButtonWidth, setEditButtonWidth] = useState(DEFAULT_BUTTON_WIDTH);

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

  // const initialExpanded = [`${INITIAL_PLAN[0].id}-${INITIAL_PLAN[0].places[0].id}`];
  const { expandedIds, toggleExpand } = useExpandedItems([""]);

  const handleEditButtonLayout = useCallback((e: LayoutChangeEvent) => {
    const measuredWidth = e.nativeEvent.layout.width + 20;
    setEditButtonWidth((prev) => (Math.abs(prev - measuredWidth) > 1 ? measuredWidth : prev));
  }, []);

  return (
    <View className="flex-1">
      {/* nodata */}
      {visiblePlan.length === 0 ? (
        <EmptyState
          title="아직 여행 일정이 없어요."
          description="새로운 여행 일정을 만들까요?"
          actionLabel="새 일정 만들기"
          onPressAction={() => router.push("/trip/condition")}
        />
      ) : (
        <>
          <OnAirBanner tripTitle={tripTitle} />
          <Image
            source={require("@/assets/images/map.png")}
            resizeMode="cover"
            style={{ width: `100%` }}
          />
          <TimelineDayBadgeSection
            dayIndices={visiblePlan.map(({ index }) => index)}
            activeIndex={activeIndex}
            isEditing={isEditing}
            // editButtonWidth={editButtonWidth}
            // badgeScrollRef={badgeScrollRef}
            showEditButton={false}
            onPressDayBadge={handlePressDayBadge}
            onLayoutDayBadge={handleBadgeLayout}
            onRequestDeleteDay={requestDeleteDay}
            onPressEditButton={pressEditButton}
            // onLayoutEditButton={handleEditButtonLayout}
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
                isOngoing={true}
                isUpcoming={false}
                dayOrder={index + 1}
                expandedIds={expandedIds}
                onToggleItem={toggleExpand}
                onLayout={(e) => handleSectionLayout(index, e)}
              />
            ))}
          </ScrollView>
        </>
      )}
    </View>
  );
}
