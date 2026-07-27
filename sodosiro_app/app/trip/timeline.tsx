import Header from "@/components/common/Header";
import TimelineExportFooter from "@/components/common/trip/TimelineExportFooter";
import DayBadgeBar from "@/components/timeline/section/TimelineDayBadgeSection";

import TimelineDaySection from "@/components/timeline/section/TimelineDaySection";
import { useExpandedItems } from "@/hooks/useExpandedItems";
import { useTimelineScrollSpy } from "@/hooks/useTimelineScrollSpy";
import { useTripPlanEditor } from "@/hooks/useTripPlanEditor";
import { INITIAL_PLAN } from "@/mocks/trip";
import { Stack } from "expo-router";
import { useCallback, useState } from "react";
import { LayoutChangeEvent, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DEFAULT_BUTTON_WIDTH = 96;

export default function TimelineScreen() {
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

  const initialExpanded = [`${INITIAL_PLAN[0].id}-${INITIAL_PLAN[0].places[0].id}`];
  const { expandedIds, toggleExpand } = useExpandedItems(initialExpanded);

  const handleEditButtonLayout = useCallback((e: LayoutChangeEvent) => {
    const measuredWidth = e.nativeEvent.layout.width + 20;
    setEditButtonWidth((prev) => (Math.abs(prev - measuredWidth) > 1 ? measuredWidth : prev));
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header title={tripTitle} showPencil onTitleChange={(newTitle) => setTripTitle(newTitle)} />

      <View className="flex-1">
        <DayBadgeBar
          dayIndices={visiblePlan.map(({ index }) => index)}
          activeIndex={activeIndex}
          isEditing={isEditing}
          editButtonWidth={editButtonWidth}
          badgeScrollRef={badgeScrollRef}
          showEditButton={true}
          onPressDayBadge={handlePressDayBadge}
          onLayoutDayBadge={handleBadgeLayout}
          onRequestDeleteDay={requestDeleteDay}
          onPressEditButton={pressEditButton}
          onLayoutEditButton={handleEditButtonLayout}
        />

        {/* 일정 리스트 */}
        <ScrollView
          ref={mainScrollRef}
          className="flex-1"
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 8, paddingBottom: 24 }}
          onScroll={handleMainScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          {visiblePlan.map(({ dayPlan, index }) => (
            <TimelineDaySection
              key={index}
              dayPlan={dayPlan}
              dayOrder={index + 1}
              expandedIds={expandedIds}
              onToggleItem={toggleExpand}
              onLayout={(e) => handleSectionLayout(index, e)}
            />
          ))}
        </ScrollView>

        <TimelineExportFooter />
      </View>
    </SafeAreaView>
  );
}
