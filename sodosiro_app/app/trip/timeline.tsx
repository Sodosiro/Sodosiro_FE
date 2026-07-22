import { NavigationMiniIcon } from "@/assets/svgs";
import AnimatedButton from "@/components/common/AnimatedButton";
import BottomActionFooter from "@/components/common/BottomActionFooter";
import CustomButton from "@/components/common/CustomButton";
import CustomText from "@/components/common/CustomText";
import Header from "@/components/common/Header";
import { Stack } from "expo-router";
import { useCallback, useRef, useState } from "react";
import {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// ----------------------------
// Mock Types & Data (추후 실제 API 응답 타입으로 교체)
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
  dateLabel: string; // "10/5 (토)"
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
        type: "식당",
        description: "동해가 보이는 천년 고찰",
        rating: 4.9,
        reviewCount: 214,
      },
      { id: "1-2", order: 2, name: "초당순두부마을", type: "식당" },
      { id: "1-3", order: 3, name: "안목해변 커피거리", type: "식당" },
      { id: "1-4", order: 4, name: "오죽헌", type: "관광지" },
      { id: "1-5", order: 5, name: "초당순두부마을초당순두...", type: "식당" },
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
        type: "식당",
        description: "동해가 보이는 천년 고찰",
        rating: 4.9,
        reviewCount: 214,
      },
      { id: "2-2", order: 2, name: "초당순두부마을", type: "식당" },
      { id: "2-3", order: 3, name: "안목해변 커피거리", type: "식당" },
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

const COLORS = {
  black: "#1A1A1A",
  gray: "#8C8C8C",
  border: "#EDEDED",
  green: "#8DC63F",
  greenLight: "#EDF1D9",
  star: "#F5A623",
};

// 스크롤 스파이 시 "이 y좌표를 지나면 해당 day를 active로 본다" 판단할 때 쓰는 여유값
const SCROLL_SPY_OFFSET = 80;
// 뱃지 탭 시 프로그래매틱 스크롤 중에는 onScroll 기반 active 갱신을 잠깐 무시하기 위한 시간
const PROGRAMMATIC_SCROLL_LOCK_MS = 400;

export default function TimelineScreen() {
  const [activeDay, setActiveDay] = useState(MOCK_PLAN[0].day);
  const [expandedId, setExpandedId] = useState<string | null>(MOCK_PLAN[0].places[0]?.id ?? null);

  const mainScrollRef = useRef<ScrollView>(null);
  const badgeScrollRef = useRef<ScrollView>(null);

  // day별 섹션의 y offset (main ScrollView 컨텐츠 기준)
  const sectionOffsets = useRef<Record<number, number>>({});
  // day 뱃지의 x offset / width (badge ScrollView 기준)
  const badgeLayouts = useRef<Record<number, { x: number; width: number }>>({});

  // 탭으로 인한 프로그래매틱 스크롤 중엔 onScroll 스파이를 무시
  const isProgrammaticScroll = useRef(false);
  const programmaticScrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollBadgeIntoView = useCallback((day: number) => {
    const layout = badgeLayouts.current[day];
    if (!layout) return;
    // 살짝 여백을 두고 왼쪽에 보이도록 스크롤
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

      // y를 넘긴(지나온) 마지막 섹션을 active로 판단
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
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <SafeAreaView className="flex-1" edges={["top", "bottom"]}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header title="강릉 여행" />
      <View className="flex-1">
        {/* 일차 뱃지 - 가로 스크롤 */}
        <ScrollView
          ref={badgeScrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}
          className="py-2"
          style={{
            flexGrow: 0,
          }}
        >
          {MOCK_PLAN.map(({ day }) => {
            const isActive = day === activeDay;
            return (
              <Pressable
                key={day}
                onLayout={(e) => handleBadgeLayout(day, e)}
                onPress={() => handlePressDayBadge(day)}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 20,
                  backgroundColor: isActive ? COLORS.black : "#FFFFFF",
                  borderWidth: isActive ? 0 : 1,
                  borderColor: COLORS.border,
                }}
              >
                <CustomText
                  font="body3"
                  style={{
                    fontWeight: "500",
                    color: isActive ? "#FFFFFF" : COLORS.black,
                  }}
                >
                  {day}일차
                </CustomText>
              </Pressable>
            );
          })}

          <Pressable
            onPress={() => {
              // TODO: 수정 모드 진입 핸들러 연결
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 20,
              backgroundColor: COLORS.black,
            }}
          >
            {/* <Pencil size={14} color="#FFFFFF" /> */}
            <CustomText
              font="body3"
              className={`text-body3-tight`}
              style={{ fontWeight: "500", color: "#FFFFFF" }}
            >
              수정하기
            </CustomText>
          </Pressable>
        </ScrollView>

        {/* 일정 카드 - 세로 스크롤 */}
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
              className="mb-6"
            >
              <View
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: COLORS.border,
                  paddingVertical: 4,
                }}
              >
                <CustomText font="title" className={`text-primary-dark px-3 pt-3`}>
                  {dayPlan.dateLabel}
                </CustomText>
                {dayPlan.places.map((place, index) => {
                  const isExpanded = expandedId === place.id;
                  const isLast = index === dayPlan.places.length - 1;

                  return (
                    <View
                      key={place.id}
                      style={{
                        borderBottomWidth: isLast ? 0 : 1,
                        borderBottomColor: COLORS.border,
                        paddingHorizontal: 16,
                        paddingVertical: 12,
                      }}
                    >
                      <Pressable
                        onPress={() => toggleExpand(place.id)}
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <View
                          style={{
                            width: 22,
                            height: 22,
                            borderRadius: 11,
                            backgroundColor: "#F3F3F3",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: 10,
                          }}
                        >
                          <CustomText
                            font="body3"
                            style={{ fontWeight: "600", color: COLORS.black }}
                          >
                            {place.order}
                          </CustomText>
                        </View>

                        <CustomText
                          font="body2"
                          style={{ fontWeight: "500", color: COLORS.black, flexShrink: 1 }}
                          numberOfLines={1}
                        >
                          {place.name}
                        </CustomText>

                        <View
                          style={{
                            marginLeft: 6,
                            paddingHorizontal: 6,
                            paddingVertical: 2,
                            borderRadius: 6,
                            backgroundColor: "#F3F3F3",
                          }}
                        >
                          <CustomText font="body2" style={{ color: COLORS.gray }}>
                            {place.type}
                          </CustomText>
                        </View>

                        <View style={{ flex: 1 }} />

                        {/* {isExpanded ? (
                        <ChevronUp size={18} color={COLORS.gray} />
                      ) : (
                        <ChevronDown size={18} color={COLORS.gray} />
                      )} */}
                      </Pressable>

                      {isExpanded && (
                        <View style={{ marginTop: 10, paddingLeft: 32 }}>
                          {place.description && (
                            <CustomText
                              font="body3 tight"
                              style={{ color: COLORS.gray, marginBottom: 6 }}
                            >
                              {place.description}
                            </CustomText>
                          )}

                          {place.rating !== undefined && (
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginBottom: 12,
                              }}
                            >
                              {/* <Star size={14} color={COLORS.star} fill={COLORS.star} /> */}
                              <CustomText
                                font="body3"
                                style={{ fontWeight: "600", color: COLORS.black, marginLeft: 4 }}
                              >
                                {place.rating.toFixed(1)}
                              </CustomText>
                              {place.reviewCount !== undefined && (
                                <CustomText
                                  font="body3"
                                  style={{ color: COLORS.gray, marginLeft: 4 }}
                                >
                                  ({place.reviewCount})
                                </CustomText>
                              )}
                            </View>
                          )}

                          <View style={{ flexDirection: "row", gap: 8 }}>
                            <Pressable
                              style={{
                                paddingHorizontal: 14,
                                paddingVertical: 8,
                                borderRadius: 18,
                                backgroundColor: "#F3F3F3",
                              }}
                            >
                              <CustomText
                                font="body3"
                                style={{ fontWeight: "500", color: COLORS.black }}
                              >
                                장소 상세보기
                              </CustomText>
                            </Pressable>

                            <Pressable
                              style={{
                                paddingHorizontal: 14,
                                paddingVertical: 8,
                                borderRadius: 18,
                                backgroundColor: COLORS.black,
                              }}
                            >
                              <CustomText
                                font="body3"
                                style={{ fontWeight: "500", color: "#FFFFFF" }}
                              >
                                다른 곳으로 변경하기
                              </CustomText>
                            </Pressable>
                          </View>
                        </View>
                      )}
                    </View>
                  );
                })}
              </View>
            </View>
          ))}
        </ScrollView>

        {/* 하단 액션 */}
        <BottomActionFooter>
          <AnimatedButton
            className={`flex-row items-center justify-center px-4 gap-1 rounded-full`}
            backgroundColor={["#FFFFFF", "#F5F5F5"]}
          >
            <NavigationMiniIcon width={16} />
            <CustomText font="body1">내보내기</CustomText>
          </AnimatedButton>
          <CustomButton
            type="primary"
            title="이 일정대로 여행하기"
            stretch
            size="medium"
            // disabled={disabled}
            // onPress={onSubmit}
          />
        </BottomActionFooter>
      </View>
    </SafeAreaView>
  );
}
