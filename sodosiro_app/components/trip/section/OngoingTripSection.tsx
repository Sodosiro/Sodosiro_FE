import TimelineDayBadgeSection from "@/components/timeline/section/TimelineDayBadgeSection";

import TimelineDaySection from "@/components/timeline/section/TimelineDaySection";
import { useTimelineScrollSpy } from "@/hooks/useTimelineScrollSpy";
import { INITIAL_PLAN } from "@/mocks/trip";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Image, ScrollView, View } from "react-native";
import EmptyState from "../EmptyState";
import OnAirBanner from "../OnAirBanner";

type OngoingTripSectionProps = {};

export default function OngoingTripSection({}: OngoingTripSectionProps) {
  const [tripTitle, setTripTitle] = useState("강릉 여행");

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

  return (
    <View className="flex-1">
      {/* nodata */}
      {plan.length === 0 ? (
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
            badgeOrder={badgeOrder}
            showEditButton={false}
            onPressDayBadge={moveToSection}
            onLayoutDayBadge={handleBadgeLayout}
            onBadgeContainerLayout={handleBadgeContainerLayout}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            badgeScrollRef={badgeScrollRef}
          />

          {/* 일정 리스트 */}
          <ScrollView
            ref={mainScrollRef}
            className="flex-1"
            contentContainerStyle={{ paddingHorizontal: 20 }}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
          >
            {plan.map((dayPlan, index) => (
              <TimelineDaySection
                key={dayPlan.id}
                dayPlan={dayPlan}
                mode="isOngoing"
                onLayout={getSectionLayoutHandler(index)}
                dayIndex={index}
              />
            ))}
          </ScrollView>
        </>
      )}
    </View>
  );
}

