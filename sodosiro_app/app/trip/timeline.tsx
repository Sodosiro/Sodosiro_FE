import ConfirmDialog from "@/components/common/ConfirmDialog";
import Header from "@/components/common/Header";
import TimelineExportFooter from "@/components/common/trip/TimelineExportFooter";
import TimelineDayBadgeSection from "@/components/timeline/section/TimelineDayBadgeSection";
import TimelineDaySection from "@/components/timeline/section/TimelineDaySection";
import TimelineSwiperList from "@/components/timeline/TimelineSwiperList";
import TripPlanConfirmModal from "@/components/timeline/TripPlanConfirmModal";

import { useExpandedItems } from "@/hooks/useExpandedItems";
import { useTimelineScrollSpy } from "@/hooks/useTimelineScrollSpy";
import { useTripPlanEditor } from "@/hooks/useTripPlanEditor";
import { INITIAL_PLAN } from "@/mocks/trip";
import { Stack } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TimelineScreen() {
  const [tripTitle, setTripTitle] = useState("강릉 여행");
  const [modalVisible, setModalVisible] = useState(false);

  const {
    activeIndex,
    setActiveIndex,
    mainScrollRef,
    handlePressDayBadge,
    handleMainScroll,
    handleSectionLayout,
    handleBadgeLayout,
  } = useTimelineScrollSpy();

  const {
    visiblePlan,
    badgeOrder,
    getDisplayPlaces,
    isEditing,
    isConfirmOpen,
    requestDeleteDay,
    handleReorderDays,
    handleReorderPlaces,
    pressEditButton,
    confirmSave,
    cancelEdit,
  } = useTripPlanEditor({
    initialPlan: INITIAL_PLAN,
    activeIndex,
    onActiveIndexChange: setActiveIndex,
    onSave: (payload) => {
      console.log("order:", payload.order);
      console.log("deletedIndices:", payload.deletedIndices);
      console.log("didReorderPlaces:", payload.didReorderPlaces);
    },
  });

  const initialExpanded = [`${INITIAL_PLAN[0].id}-${INITIAL_PLAN[0].places[0].id}`];
  const { expandedIds, toggleExpand } = useExpandedItems(initialExpanded);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }} edges={["top", "bottom"]}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header title={tripTitle} showPencil onTitleChange={(newTitle) => setTripTitle(newTitle)} />

      <View className="flex-1">
        <TimelineDayBadgeSection
          dayIndices={visiblePlan.map(({ index }) => index)}
          badgeOrder={badgeOrder}
          activeIndex={activeIndex}
          isEditing={isEditing}
          showEditButton={true}
          onPressDayBadge={handlePressDayBadge}
          onLayoutDayBadge={handleBadgeLayout}
          onRequestDeleteDay={requestDeleteDay}
          onPressEditButton={pressEditButton}
          onReorderDays={handleReorderDays}
        />

        {isEditing ? (
          <TimelineSwiperList
            days={visiblePlan}
            getDisplayPlaces={getDisplayPlaces}
            onReorderPlaces={handleReorderPlaces}
            activeIndex={activeIndex}
            onActiveIndexChange={setActiveIndex}
          />
        ) : (
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
                isOngoing={false}
                isUpcoming={false}
                onLayout={(e) => handleSectionLayout(index, e)}
              />
            ))}
          </ScrollView>
        )}
        {isEditing ? null : (
          <TimelineExportFooter
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
        onClose={cancelEdit}
        onConfirm={confirmSave}
      />
      <TripPlanConfirmModal
        visiblePlan={visiblePlan}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={(selectedDay) => {
          console.log("선택된 일차:", selectedDay);
          setModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
}
