import { useEffect, useRef, useState } from "react";
import { Dimensions, Pressable, View } from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import CustomText from "../common/CustomText";
import DayTimelineList from "./DayTimelineList";

type TimelineSwiperListProps = {
  days: { dayPlan: any; index: number }[];
  getDisplayPlaces: (dayIndex: number) => any[];
  onReorderPlaces: (dayIndex: number, newPlaces: any[]) => void;
  activeIndex?: number;
  onActiveIndexChange?: (index: number) => void;
};

export default function TimelineSwiperList({
  days,
  getDisplayPlaces,
  onReorderPlaces,
  activeIndex = 0,
  onActiveIndexChange,
}: TimelineSwiperListProps) {
  const windowWidth = Dimensions.get("window").width;

  // 1. 양옆에 이전/다음 카드가 보일 수 있도록 너비 계산
  const SIDE_PREVIEW_WIDTH = 32; // 양옆에 노출될 프리뷰 카드 너비
  const CARD_GAP = 12; // 카드 간 간격
  const CARD_WIDTH = windowWidth - (SIDE_PREVIEW_WIDTH + CARD_GAP) * 2;

  const [containerHeight, setContainerHeight] = useState<number>(0);
  const carouselRef = useRef<ICarouselInstance>(null);

  const currentIndex = Math.max(
    0,
    days.findIndex((d) => d.index === activeIndex),
  );

  useEffect(() => {
    if (carouselRef.current && activeIndex !== undefined) {
      if (currentIndex !== -1) {
        carouselRef.current.scrollTo({ index: currentIndex, animated: true });
      }
    }
  }, [activeIndex, days, currentIndex]);

  return (
    <View
      className="flex-1"
      onLayout={(e) => {
        const { height } = e.nativeEvent.layout;
        if (height > 0) setContainerHeight(height);
      }}
    >
      {containerHeight > 0 && (
        <Carousel
          ref={carouselRef}
          // [핵심] 중앙 정렬을 위해 carousel의 width를 카드 너비 + 간격으로 지정
          width={CARD_WIDTH + CARD_GAP}
          height={containerHeight}
          style={{
            width: windowWidth,
            height: containerHeight,
            justifyContent: "center",
            alignItems: "center",
          }}
          data={days}
          defaultIndex={currentIndex}
          loop={false}
          enabled={false} // 터치 스와이프 차단
          // [핵심 2] Parallax 모드로 변경하여 이전/다음 카드를 대칭으로 중앙 배치
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.95, // 옆 카드가 약간 축소되어 느껴지는 스케일
            parallaxScrollingOffset: SIDE_PREVIEW_WIDTH + CARD_GAP, // 양옆으로 들어오는 여백 오프셋
          }}
          onSnapToItem={(index) => {
            const selectedDay = days[index];
            if (selectedDay && onActiveIndexChange) {
              onActiveIndexChange(selectedDay.index);
            }
          }}
          renderItem={({ item, index }) => {
            const dayPlaces = getDisplayPlaces(item.index);
            const isCurrent = index === currentIndex;
            const isPrev = index < currentIndex;
            const isNext = index > currentIndex;

            return (
              <View
                style={{
                  width: CARD_WIDTH,
                  height: containerHeight,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Pressable
                  onPress={() => {
                    if (!isCurrent) {
                      carouselRef.current?.scrollTo({ index, animated: true });
                    }
                  }}
                  pointerEvents={isCurrent ? "auto" : "box-only"}
                  style={{
                    width: CARD_WIDTH,
                    height: containerHeight - 16,
                  }}
                  className={`bg-white rounded-2xl border overflow-hidden transition-all ${
                    isCurrent
                      ? "border-gray-300 shadow-md opacity-100"
                      : "border-gray-200 shadow-sm opacity-80"
                  }`}
                >
                  {/* 일차 타이틀 헤더 */}

                  <View className="px-5 pt-4 pb-2 border-b border-gray-100 bg-gray-50/50">
                    <CustomText font="title" className="text-primary-dark">
                      {item.dayPlan.dateLabel}
                    </CustomText>
                  </View>

                  {/* 해당 일차의 드래그 앤 드롭 리스트 */}
                  <View className="flex-1">
                    <DayTimelineList
                      dayIndex={item.index}
                      places={dayPlaces}
                      onReorderPlaces={onReorderPlaces}
                    />
                  </View>
                </Pressable>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}
