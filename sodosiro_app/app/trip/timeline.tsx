import ConfirmDialog from "@/components/common/ConfirmDialog";
import Header from "@/components/common/Header";
import TimelineExportFooter from "@/components/common/trip/TimelineExportFooter";
import TimelineDayBadgeSection from "@/components/timeline/section/TimelineDayBadgeSection";
import TimelineDaySection from "@/components/timeline/section/TimelineDaySection";
import TripPlanConfirmModal from "@/components/timeline/TripPlanConfirmModal";

import { useTimelineScrollSpy } from "@/hooks/useTimelineScrollSpy";
import { INITIAL_PLAN } from "@/mocks/trip";
import { Stack } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TimelineScreen() {
  const [tripTitle, setTripTitle] = useState("강릉 여행");
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
  const [onDrag, setOnDrag] = useState(false);

  const [plan, setPlan] = useState(INITIAL_PLAN);
  const [temp, setTemp] = useState(INITIAL_PLAN);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleConfirmOpen = useCallback(() => {
    if (plan === temp) setIsEditing(false);
    else setIsConfirmOpen(true);
  }, [plan, temp]);

  const badgeOrder = useMemo(() => temp.map(({ id }) => id), [temp]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }} edges={["top", "bottom"]}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header title={tripTitle} showPencil onTitleChange={(newTitle) => setTripTitle(newTitle)} />

      <View className="flex-1">
        <TimelineDayBadgeSection
          badgeOrder={badgeOrder}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          showEditButton={true}
          setPlan={setTemp}
          onPressDayBadge={moveToSection}
          handleConfirmOpen={handleConfirmOpen}
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
            paddingTop: 8,
          }}
          scrollEnabled={!onDrag}
          onScroll={handleScroll}
          scrollEventThrottle={32} // 부하 감소
          showsVerticalScrollIndicator={false}
        >
          {temp.map((item, index) => (
            <TimelineDaySection
              key={item.id}
              setOnDrag={setOnDrag}
              dayPlan={item}
              mode={"isUpcoming"}
              isEditing={isEditing}
              dayIndex={index}
              setPlan={setTemp}
              onLayout={getSectionLayoutHandler(index)}
            />
          ))}
        </ScrollView>

        <TimelineExportFooter
          onConfirm={() => {
            setModalVisible(true);
          }}
        />
      </View>

      <ConfirmDialog
        visible={isConfirmOpen}
        title="이 일정을 저장할까요?"
        cancelText="취소"
        confirmText="저장하기"
        onClose={() => {
          setTemp(plan);
          setIsEditing(false);
          setIsConfirmOpen(false);
        }}
        onConfirm={() => {
          setPlan(temp);
          setIsEditing(false);
          setIsConfirmOpen(false);
        }}
      />
      <TripPlanConfirmModal
        plan={plan}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={(selectedDay) => {
          setModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
}
