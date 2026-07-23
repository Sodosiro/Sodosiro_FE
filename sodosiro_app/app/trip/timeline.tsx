import { DownIcon, KakaomapIcon, StarIcon } from "@/assets/svgs";
import AnimatedButton from "@/components/common/AnimatedButton";
import BottomActionFooter from "@/components/common/BottomActionFooter";
import CustomButton from "@/components/common/CustomButton";
import CustomText from "@/components/common/CustomText";
import Header from "@/components/common/Header";
import Badge from "@/components/trip/Badge";
import { Stack } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// ----------------------------
// Mock Types & Data
// ----------------------------
type PlaceType = "식당" | "관광지" | "카페";

type PlaceItem = {
  id: string;
  order: number;
  name: string;
  type: PlaceType;
  description?: string;
  rating?: number;
  reviewCount?: number;
};

type DayPlan = {
  day: number;
  dateLabel: string;
  places: PlaceItem[];
};

const MOCK_PLAN: DayPlan[] = [
  {
    day: 1,
    dateLabel: "10/5 (토)",
    places: [
      {
        id: "1-1",
        order: 1,
        name: "낙산사",
        type: "관광지",
        description: "동해가 보이는 천년 고찰",
        rating: 4.9,
        reviewCount: 214,
      },
      { id: "1-2", order: 2, name: "초당순두부마을", type: "식당" },
      { id: "1-3", order: 3, name: "안목해변 커피거리", type: "카페" },
      { id: "1-4", order: 4, name: "오죽헌", type: "관광지" },
      { id: "1-5", order: 5, name: "초당순두부마을초당순두부순두부순두부순두부", type: "식당" },
    ],
  },
  {
    day: 2,
    dateLabel: "10/6 (일)",
    places: [
      {
        id: "2-1",
        order: 1,
        name: "낙산사",
        type: "관광지",
        description: "동해가 보이는 천년 고찰",
        rating: 4.9,
        reviewCount: 214,
      },
      { id: "2-2", order: 2, name: "초당순두부마을", type: "식당" },
      { id: "2-3", order: 3, name: "안목해변 커피거리", type: "카페" },
      { id: "2-4", order: 4, name: "오죽헌", type: "관광지" },
      { id: "2-5", order: 5, name: "초당순두부마을초당순두...", type: "식당" },
    ],
  },
  {
    day: 3,
    dateLabel: "10/7 (월)",
    places: [
      { id: "3-1", order: 1, name: "경포호", type: "관광지" },
      { id: "3-2", order: 2, name: "강릉 중앙시장", type: "식당" },
    ],
  },
  {
    day: 4,
    dateLabel: "10/8 (화)",
    places: [{ id: "4-1", order: 1, name: "정동진", type: "관광지" }],
  },
];

const DEFAULT_BUTTON_WIDTH = 96;
const FADE_WIDTH = 32;
const FADE_STEPS = 6;
const SCROLL_SPY_OFFSET = 80;
const PROGRAMMATIC_SCROLL_LOCK_MS = 400;

// ----------------------------
// 180도 회전 아이콘 컴포넌트
// ----------------------------
function RotatingArrowIcon({ isExpanded }: { isExpanded: boolean }) {
  const rotateAnim = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [isExpanded, rotateAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <Animated.View style={{ transform: [{ rotate: spin }] }}>
      <DownIcon />
    </Animated.View>
  );
}

// ----------------------------
// 자연스러운 드롭다운 개별 아이템 컴포넌트
// ----------------------------
type TimelineItemProps = {
  place: PlaceItem;
  isLast: boolean;
  isExpanded: boolean;
  onToggle: (id: string) => void;
};

function TimelineItem({ place, isLast, isExpanded, onToggle }: TimelineItemProps) {
  const [contentHeight, setContentHeight] = useState(0);
  const animatedController = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedController, {
      toValue: isExpanded ? 1 : 0,
      duration: 250,
      useNativeDriver: false, // height 애니메이션을 위해 false 설정
    }).start();
  }, [isExpanded, animatedController]);

  // 측정된 높이를 바탕으로 0 ~ 실제높이 범위 보간
  const bodyHeight = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight],
  });

  const bodyOpacity = animatedController.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1],
  });

  const handleLayout = (e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;
    if (height > 0 && contentHeight === 0) {
      setContentHeight(height);
    }
  };

  return (
    <View className={`px-4 py-3 ${isLast ? "" : "border-b border-[#EDEDED]"}`}>
      {/* 헤더 부분 (클릭 영역) */}
      <Pressable onPress={() => onToggle(place.id)} className="flex-row items-center">
        <View className="w-6 h-6 rounded-xl bg-[#1A1A1A] items-center justify-center mr-2.5">
          <CustomText font="body3" className="text-white">
            {place.order}
          </CustomText>
        </View>

        <CustomText font="body1" numberOfLines={1} className="flex-shrink">
          {place.name}
        </CustomText>

        <View className="ml-1.5 px-1.5 py-0.5 rounded-md bg-bg-subtle">
          <CustomText font="body2 tight">{place.type}</CustomText>
        </View>

        <View className="flex-1" />

        <RotatingArrowIcon isExpanded={isExpanded} />
      </Pressable>

      {/* 부드럽게 스르륵 펼쳐지는 드롭다운 영역 */}
      <Animated.View style={{ height: bodyHeight, overflow: "hidden" }}>
        <Animated.View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            opacity: bodyOpacity,
          }}
          onLayout={handleLayout}
        >
          <View className="pt-2.5 pl-8 pb-1">
            {place.description && (
              <CustomText font="body2" className="text-text-muted mb-1.5">
                {place.description}
              </CustomText>
            )}

            {place.rating !== undefined && (
              <View className="flex-row items-center mb-3">
                <StarIcon />
                <CustomText font="body2" className="ml-1">
                  {place.rating.toFixed(1)}
                </CustomText>
                {place.reviewCount !== undefined && (
                  <CustomText font="body2" className="text-text-muted ml-1">
                    ({place.reviewCount})
                  </CustomText>
                )}
              </View>
            )}

            <View className="flex-row gap-2">
              <Badge
                onLayout={() => {}}
                onPress={() => {
                  // TODO: 장소 상세보기
                }}
                text="장소 상세보기"
                selected={false}
                update={true}
              />
              <Badge
                onLayout={() => {}}
                onPress={() => {
                  // TODO: 다른 곳으로 변경하기
                }}
                text="다른 곳으로 변경하기"
                selected={true}
                update={true}
              />
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

// ----------------------------
// 메인 스크린
// ----------------------------
export default function TimelineScreen() {
  const [activeDay, setActiveDay] = useState(MOCK_PLAN[0].day);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    new Set([MOCK_PLAN[0].places[0]?.id].filter(Boolean)),
  );
  const [tripTitle, setTripTitle] = useState("강릉 여행");
  const [editButtonWidth, setEditButtonWidth] = useState(DEFAULT_BUTTON_WIDTH);

  const mainScrollRef = useRef<ScrollView>(null);
  const badgeScrollRef = useRef<ScrollView>(null);

  const sectionOffsets = useRef<Record<number, number>>({});
  const badgeLayouts = useRef<Record<number, { x: number; width: number }>>({});

  const isProgrammaticScroll = useRef(false);
  const programmaticScrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollBadgeIntoView = useCallback((day: number) => {
    const layout = badgeLayouts.current[day];
    if (!layout) return;
    const targetX = Math.max(layout.x - 20, 0);
    badgeScrollRef.current?.scrollTo({ x: targetX, animated: true });
  }, []);

  const handlePressDayBadge = useCallback(
    (day: number) => {
      const offsetY = sectionOffsets.current[day];
      if (offsetY === undefined) return;

      isProgrammaticScroll.current = true;
      if (programmaticScrollTimer.current) clearTimeout(programmaticScrollTimer.current);

      setActiveDay(day);
      scrollBadgeIntoView(day);
      mainScrollRef.current?.scrollTo({ y: Math.max(offsetY - 12, 0), animated: true });

      programmaticScrollTimer.current = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, PROGRAMMATIC_SCROLL_LOCK_MS);
    },
    [scrollBadgeIntoView],
  );

  const handleMainScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (isProgrammaticScroll.current) return;

      const y = e.nativeEvent.contentOffset.y;
      const entries = Object.entries(sectionOffsets.current) as unknown as [string, number][];
      if (entries.length === 0) return;

      let current = entries[0][0];
      let currentOffset = -Infinity;
      for (const [dayKey, offsetY] of entries) {
        if (offsetY - SCROLL_SPY_OFFSET <= y && offsetY > currentOffset) {
          current = dayKey;
          currentOffset = offsetY;
        }
      }

      const currentDay = Number(current);
      setActiveDay((prev) => {
        if (prev !== currentDay) {
          scrollBadgeIntoView(currentDay);
          return currentDay;
        }
        return prev;
      });
    },
    [scrollBadgeIntoView],
  );

  const handleSectionLayout = useCallback((day: number, e: LayoutChangeEvent) => {
    sectionOffsets.current[day] = e.nativeEvent.layout.y;
  }, []);

  const handleBadgeLayout = useCallback((day: number, e: LayoutChangeEvent) => {
    const { x, width } = e.nativeEvent.layout;
    badgeLayouts.current[day] = { x, width };
  }, []);

  const toggleExpand = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header title={tripTitle} showPencil onTitleChange={(newTitle) => setTripTitle(newTitle)} />

      <View className="flex-1">
        {/* 일차 뱃지 바 */}
        <View className="relative py-2">
          <ScrollView
            ref={badgeScrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingLeft: 20,
              paddingRight: editButtonWidth + 12,
              gap: 8,
            }}
          >
            {MOCK_PLAN.map(({ day }) => {
              const isActive = day === activeDay;
              return (
                <Badge
                  key={day}
                  onLayout={(e) => handleBadgeLayout(day, e)}
                  onPress={() => handlePressDayBadge(day)}
                  text={`${day}일차`}
                  selected={isActive}
                />
              );
            })}
          </ScrollView>

          {/* 스크롤 페이드 뷰 */}
          <View
            pointerEvents="none"
            className="absolute top-0 bottom-0 flex-row"
            style={{
              right: editButtonWidth,
              width: FADE_WIDTH,
            }}
          >
            {Array.from({ length: FADE_STEPS }).map((_, i) => (
              <View key={i} className="flex-1 bg-white" style={{ opacity: (i + 1) / FADE_STEPS }} />
            ))}
          </View>

          {/* 수정하기 버튼 */}
          <View className="absolute top-0 bottom-0 right-0 justify-center items-end bg-white pr-5">
            <Badge
              onLayout={(e) => {
                const measuredWidth = e.nativeEvent.layout.width + 20;
                setEditButtonWidth((prev) =>
                  Math.abs(prev - measuredWidth) > 1 ? measuredWidth : prev,
                );
              }}
              onPress={() => {}}
              text="수정하기"
              selected={false}
              update={true}
            />
          </View>
        </View>

        {/* 일정 리스트 */}
        <ScrollView
          ref={mainScrollRef}
          className="flex-1"
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 8, paddingBottom: 24 }}
          onScroll={handleMainScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          {MOCK_PLAN.map((dayPlan) => (
            <View
              key={dayPlan.day}
              onLayout={(e) => handleSectionLayout(dayPlan.day, e)}
              className="mb-6 rounded-2xl border border-[#EDEDED] bg-white py-1"
            >
              <CustomText font="title" className="text-primary-dark px-3 pt-3">
                {dayPlan.dateLabel}
              </CustomText>

              {dayPlan.places.map((place, index) => (
                <TimelineItem
                  key={place.id}
                  place={place}
                  isLast={index === dayPlan.places.length - 1}
                  isExpanded={expandedIds.has(place.id)}
                  onToggle={toggleExpand}
                />
              ))}
            </View>
          ))}
        </ScrollView>

        {/* 하단 푸터 */}
        <BottomActionFooter>
          <AnimatedButton
            className="flex-row items-center justify-center px-4 gap-1 rounded-full"
            backgroundColor={["#FFFFFF", "#F5F5F5"]}
          >
            <KakaomapIcon />
            {/* <StarIcon /> */}
            <CustomText font="body1">내보내기</CustomText>
          </AnimatedButton>

          <CustomButton type="primary" title="이 일정대로 여행하기" stretch size="medium" />
        </BottomActionFooter>
      </View>
    </SafeAreaView>
  );
}
