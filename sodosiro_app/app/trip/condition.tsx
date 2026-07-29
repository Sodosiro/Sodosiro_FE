import { useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BusIcon, CarIcon } from "@/assets/svgs";
import BottomSheet from "@/components/common/BottomSheet";
import CategoryBadge from "@/components/common/CategoryBadge";
import Header from "@/components/common/Header";
import Subtitle from "@/components/common/Subtitle";
import PopularPlacesSection from "@/components/home/popularPlace/PoplularPlacesSection";
import TripConditionDatePickerButton from "@/components/tripCondition/TripConditionDatePickerButton";
import DatePickerSheet from "@/components/tripCondition/TripConditionDatePickerSheet";
import TripConditionFooter from "@/components/tripCondition/TripConditionFooter";
import LocationPickerButton from "@/components/tripCondition/TripConditionLocationButton";
import TransportCard from "@/components/tripCondition/TripConditionTransportCard";
import { Stack } from "expo-router";

type TransportType = "car" | "bus" | "";
type DateRange = {
  startDate: Date | null;
  endDate: Date | null;
};

// 카테고리 목록 배열
const CATEGORIES: CategoryType[] = [
  "restaurant",
  "cafe",
  "shopping",
  "attraction",
  "nature",
  "activity",
  "culture",
];

export default function TripScreen() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [transport, setTransport] = useState<TransportType>("");
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  const transportList = [
    {
      key: "car",
      icon: CarIcon,
      title: "자동차",
      description: "차량 이동 중심",
    },
    {
      key: "bus",
      icon: BusIcon,
      title: "대중교통",
      description: "버스 · 도보 중심",
    },
  ] as const;

  // 선택된 카테고리 목록 상태 (최대 2개)
  const [selectedCategories, setSelectedCategories] = useState<CategoryType[]>(
    [],
  );

  // 뱃지 토글 및 2개 제한 처리 함수
  const handleSelectCategory = (category: CategoryType) => {
    setSelectedCategories((prev) => {
      // 이미 선택되어 있다면 해제
      if (prev.includes(category)) {
        return prev.filter((item) => item !== category);
      }

      // 2개 미만일 때만 추가 (이미 2개가 선택되어 있으면 무시)
      if (prev.length < 2) {
        return [...prev, category];
      }

      return prev;
    });
  };

  // 리셋 처리
  const handleReset = () => {
    console.log("조건 초기화");
    // setTransport('car');
    // setSelectedCategories([]);
    // ... 상태 초기화 로직
  };

  // 일정 짜기 제출 처리
  const handleSubmit = () => {
    console.log("일정 짜기 생성 시작");
    // router.push('/trip/create/loading'); 또는 결과 페이지로 이동
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white" }}
      edges={["top", "bottom"]}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <Header title="여행 조건 설정" />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-5 pt-3 gap-8">
          <View className="gap-3">
            <Subtitle title="여행 일정" />
            <TripConditionDatePickerButton
              dateRange={dateRange}
              onPress={() => {
                setShowCalendar(true);
              }}
            />
            {showCalendar && (
              <BottomSheet
                visible={showCalendar}
                onClose={() => setShowCalendar(false)}
              >
                <DatePickerSheet
                  initialStartDate={dateRange.startDate ?? undefined}
                  initialEndDate={dateRange.endDate ?? undefined}
                  onConfirm={(start, end) => {
                    if (start) {
                      const resultDateRange: DateRange = {
                        startDate: parseDate(start),
                        endDate: start == end ? null : parseDate(end),
                      };
                      setDateRange(resultDateRange);
                    }
                    setShowCalendar(false);
                  }}
                />
              </BottomSheet>
            )}
          </View>
          <View className="gap-3">
            <Subtitle title="이동 수단 선택" />
            <View className="flex-row gap-3">
              {transportList.map((item) => (
                <TransportCard
                  key={item.key}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  selected={transport === item.key}
                  onPress={() => setTransport(item.key)}
                />
              ))}
            </View>
          </View>
          <View className="gap-3">
            <Subtitle title="여행 스타일" description="최대 2개 선택" />
            <View className="flex-row flex-wrap gap-2.5">
              {CATEGORIES.map((category) => {
                const isSelected = selectedCategories.includes(category);

                return (
                  <CategoryBadge
                    key={category}
                    category={category}
                    isSelected={isSelected}
                    disabled={selectedCategories.length >= 2 && !isSelected}
                    onPress={async () => handleSelectCategory(category)}
                  />
                );
              })}
            </View>
          </View>
          <View className="gap-3">
            <Subtitle
              title="꼭 가고 싶은 곳이 있으신가요?"
              description="선택사항"
            />
            <View className="flex-row gap-3">
              <LocationPickerButton
                locationName={"죽도해변"}
                onPress={() => setShowLocation(true)}
              />
              {showLocation && (
                <BottomSheet
                  visible={showLocation}
                  onClose={() => setShowLocation(false)}
                >
                  <PopularPlacesSection />
                  <View className="pt-5"></View>
                </BottomSheet>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
      <TripConditionFooter onReset={handleReset} onSubmit={handleSubmit} />
    </SafeAreaView>
  );
}

function parseDate(dateString: string): Date {
  const [year, month, day] = dateString.split("-").map(Number);

  return new Date(year, month - 1, day);
}
