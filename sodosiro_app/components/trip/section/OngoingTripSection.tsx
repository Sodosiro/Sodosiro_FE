import { CourseSummaryItem } from "@/api/course";
import Spinner from "@/components/common/Spinner";
import { useTimelineScrollSpy } from "@/hooks/useTimelineScrollSpy";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import EmptyState from "../EmptyState";

type OngoingTripSectionProps = {
  courses: CourseSummaryItem[] | undefined;
  isPending: boolean;
  isError: boolean;
};

export default function OngoingTripSection({
  courses,
  isPending,
  isError,
}: OngoingTripSectionProps) {
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

  // const badgeOrder = useMemo(() => plan.map((item, index) => index +1), [plan]);

  // 1. 로딩 상태 처리
  if (isPending) {
    return (
      <View className={`flex-1 justify-center items-center`}>
        <Spinner />
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
          onPressAction={() => router.push("/roulette")}
        />
      ) : (
        <></>
      )}
      {/* nodata */}
      {/* {plan.length === 0 ? (
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
          /> */}

      {/* 일정 리스트 */}
      {/* <ScrollView
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
      )} */}
    </View>
  );
}
