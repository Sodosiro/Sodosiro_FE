import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BottomSheet from "@/components/common/BottomSheet";
import CategoryBadge from "@/components/common/category/CategoryBadge";
import CustomText from "@/components/common/CustomText";
import Header from "@/components/common/Header";
import CreatingModal from "@/components/common/modal/CreatingModal";
import Subtitle from "@/components/common/Subtitle";
import BigBusIcon from "@/components/icon/transport/BusIcon";
import CarIcon from "@/components/icon/transport/CarIcon";
import DatePickerBottomSheet from "@/components/tripCondition/bottomSheet/DatePickerBottomSheet";
import PlaceListBottomSheet from "@/components/tripCondition/bottomSheet/PlaceListBottomSheet";
import TripConditionDatePickerButton from "@/components/tripCondition/TripConditionDatePickerButton";
import TripConditionFooter from "@/components/tripCondition/TripConditionFooter";
import LocationPickerButton from "@/components/tripCondition/TripConditionLocationButton";
import TripConditionPlacesSection from "@/components/tripCondition/TripConditionPlacesSection";
import TransportCard from "@/components/tripCondition/TripConditionTransportCard";
import { SODOSI_LIST } from "@/constants/Sodosi";
import { COURSE_STATE } from "@/constants/Trip";
import { useToast } from "@/contexts/ToastProvider";
import { useCourseRecommendationsMutation } from "@/hooks/mutation/course";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import axios from "axios";
import { router, Stack, useLocalSearchParams } from "expo-router";

type TransportType = "CAR" | "PUBLIC_TRANSPORT" | "";
type DateRange = {
  startDate: Date | null;
  endDate: Date | null;
};

const CATEGORIES: CategoryType[] = [
  "restaurant",
  "cafe",
  "shopping",
  "attraction",
  "nature",
  "activity",
  "accommodation",
];

const TRANSPORT_LIST = [
  {
    key: "CAR",
    icon: CarIcon,
    title: "자동차",
    description: "차량 이동 중심",
  },
  {
    key: "PUBLIC_TRANSPORT",
    icon: BigBusIcon,
    title: "대중교통",
    description: "버스 · 도보 중심",
  },
] as const;

const CATEGORY_TO_TRAVEL_STYLE: Record<CategoryType, string> = {
  all: "",
  restaurant: "RESTAURANT",
  cafe: "CAFE",
  shopping: "SHOPPING",
  attraction: "TOURIST_SPOT",
  nature: "NATURE",
  activity: "ACTIVITY",
  accommodation: "ACCOMMODATION",
};

export default function TripScreen() {
  const { sigunguId } = useLocalSearchParams<{
    sigunguId: string;
  }>();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const datePickerRef = useRef<BottomSheetModal>(null);

  const SODOSI = SODOSI_LIST.find(
    (sodosi) => String(sodosi.sigunguId) == sigunguId,
  );

  const [tripTitle, setTripTitle] = useState(`${SODOSI?.name} 여행`);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [transport, setTransport] = useState<TransportType>("");
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });
  const [selectedPlace, setSelectedPlace] = useState<PlaceType | null>(null);
  const [aiMessage, setAiMessage] = useState("");
  const [showErrorText, setShowErrorText] = useState(false);

  // useMutation hook
  const { mutateAsync: postCourseRecommendations, isPending } =
    useCourseRecommendationsMutation();

  const [selectedCategory, setSelectedCategory] = useState<CategoryType[]>([]);

  const { showToast } = useToast();

  const handleSelectCategory = (category: CategoryType) => {
    setSelectedCategory((prev) => {
      if (prev.includes(category)) {
        return prev.filter((item) => item !== category);
      }
      if (prev.length < 2) {
        return [...prev, category];
      }
      return prev;
    });
  };

  const handleLocationPicker = () => {
    if (selectedPlace) {
      setSelectedPlace(null);
    } else {
      // setShowLocation(true);
      bottomSheetRef.current?.present();
    }
  };

  const handleConfirmDate = (start: string, end: string) => {
    if (start) {
      const resultDateRange: DateRange = {
        startDate: parseDate(start),
        endDate: start == end ? null : parseDate(end),
      };
      setDateRange(resultDateRange);
    }
  };

  const handleReset = () => {
    setTripTitle(`${SODOSI?.name} 여행`);
    setShowCalendar(false);
    setShowLocation(false);
    setSelectedCategory([]);
    setTransport("");
    setDateRange({
      startDate: null,
      endDate: null,
    });
    setSelectedPlace(null);
    setAiMessage("");
    setShowErrorText(false);
  };

  const handleSubmit = async () => {
    if (!SODOSI?.sigunguCode || !dateRange.startDate) return;

    const requestBody = {
      title: tripTitle,
      sigunguCode: SODOSI?.sigunguCode,
      transportMode: transport,
      startDate: formatDate(dateRange.startDate),
      endDate: formatDate(dateRange.endDate ?? dateRange.startDate),
      travelStyles: selectedCategory.map(
        (category) => CATEGORY_TO_TRAVEL_STYLE[category],
      ),
      ...(selectedPlace?.contentId && {
        mustVisitContentId: selectedPlace.contentId,
      }),
      ...(aiMessage && { aiMessage }),
    };

    try {
      const response = await postCourseRecommendations(requestBody);

      if (router.canDismiss()) {
        router.dismissAll();
      }

      router.push({
        pathname: "/trip/timeline",
        params: {
          courseId: response.data.courseId,
          courseStatus: COURSE_STATE.TEMP,
        },
      });
    } catch (error) {
      console.error("추천 코스 생성 실패:", error);
      if (axios.isAxiosError(error)) {
        const errorCode = error.response?.data?.code || "";
        if (errorCode === "COURSE400-TRAVEL_DATE_OVERLAP") {
          showToast(error.response?.data?.message || "");
        }
      }
    }
  };

  const handleDisabled = () => {
    if (!dateRange.startDate || !transport) {
      return true;
    }
    if (checkIsRestDayConflict()) {
      return true;
    }
    return false;
  };

  const handleSelectPlace = (place: PlaceType) => {
    setSelectedPlace(place);
    setShowLocation(false);
  };

  function formatDate(date: Date | null): string {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function getDayName(date: Date | null): string {
    if (!date) return "";
    const days = [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ];
    return days[date.getDay()];
  }

  const checkIsRestDayConflict = () => {
    if (!dateRange.startDate || dateRange.endDate || !selectedPlace?.restdate) {
      return false;
    }
    const restdate = selectedPlace.restdate;
    if (restdate === "데이터 미제공" || restdate === "연중무휴") {
      return false;
    }
    const selectedDayName = getDayName(dateRange.startDate);
    return restdate.includes(selectedDayName);
  };

  useEffect(() => {
    const isConflict = checkIsRestDayConflict();
    setShowErrorText(isConflict);
  }, [dateRange, selectedPlace]);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white" }}
      edges={["top", "bottom"]}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <Header
        title={tripTitle}
        showPencil
        onTitleChange={(newTitle) => setTripTitle(newTitle)}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="px-5 pt-3 gap-8">
            <View className="gap-3">
              <View className="flex-row gap-1">
                <View className="pt-1">
                  <CustomText font="body3" style={{ color: "#F04452" }}>
                    *
                  </CustomText>
                </View>
                <Subtitle title="여행 날짜를 선택해주세요" />
              </View>
              <TripConditionDatePickerButton
                dateRange={dateRange}
                onPress={() => {
                  datePickerRef.current?.present();
                }}
              />
            </View>

            <View className="gap-3">
              <View className="flex-row gap-1">
                <View className="pt-1">
                  <CustomText font="body3" style={{ color: "#F04452" }}>
                    *
                  </CustomText>
                </View>
                <Subtitle title="어떻게 이동하세요?" />
              </View>
              <View className="flex-row gap-3">
                {TRANSPORT_LIST.map((item) => (
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
              <View className="flex-row gap-1">
                <Subtitle
                  title="선호하는 관광지가 있나요?"
                  description="최대 2개 선택"
                />
              </View>
              <View className="flex-row flex-wrap gap-2.5">
                {CATEGORIES.filter(
                  (category) =>
                    !(category == "accommodation" || category == "restaurant"),
                ).map((category) => {
                  const isSelected = selectedCategory.includes(category);
                  return (
                    <CategoryBadge
                      key={category}
                      category={category}
                      isSelected={isSelected}
                      disabled={selectedCategory.length >= 2 && !isSelected}
                      onPress={async () => handleSelectCategory(category)}
                    />
                  );
                })}
              </View>
            </View>

            <View className="gap-3">
              <Subtitle title="꼭 가고 싶은 곳이 있으신가요?" />
              <View className="flex-row gap-3">
                <LocationPickerButton
                  locationName={selectedPlace?.title}
                  onPress={handleLocationPicker}
                  actionText={(selectedPlace && "삭제하기") || undefined}
                />

                {showLocation && (
                  <BottomSheet
                    visible={showLocation}
                    onClose={() => setShowLocation(false)}
                    minHeight={520}
                  >
                    <TripConditionPlacesSection
                      onSelectPlace={handleSelectPlace}
                      sigunguCode={SODOSI?.sigunguCode || ""}
                      sigunguName={SODOSI?.name || ""}
                    />
                    <View className="pt-5" />
                  </BottomSheet>
                )}
              </View>

              {showErrorText && (
                <CustomText font="body3" style={{ color: "#F04452" }}>
                  여행 일정과 해당 장소의 휴무일이 겹쳐요.
                </CustomText>
              )}
            </View>

            <View className="gap-3">
              <Subtitle title="AI가 참고할 내용을 입력해주세요" />
              <View className="flex-row gap-3">
                <TextInput
                  multiline
                  value={aiMessage}
                  onChangeText={setAiMessage}
                  placeholder="내용을 입력하세요."
                  placeholderTextColor="#999999"
                  textAlignVertical="top"
                  className="min-h-[94px] flex-1 rounded-[12px] border border-[#D9D9D9] bg-white p-3 text-base text-[#1A1A1A]"
                  maxLength={20}
                />
              </View>
              <CustomText font="body3" className="text-text-muted text-right">
                {aiMessage.length}/20
              </CustomText>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <PlaceListBottomSheet
        bottomSheetRef={bottomSheetRef}
        sigunguCode={SODOSI?.sigunguCode || ""}
        sigunguName={SODOSI?.name || ""}
        onSelectPlace={(place) => setSelectedPlace(place)}
      />

      {/* 날짜 선택 바텀시트 모달 */}
      <DatePickerBottomSheet
        bottomSheetRef={datePickerRef}
        onConfirm={handleConfirmDate}
        initialDateRange={
          dateRange ?? { startDate: undefined, endDate: undefined }
        }
      />

      <TripConditionFooter
        onReset={handleReset}
        onSubmit={handleSubmit}
        disabled={handleDisabled}
      />

      <CreatingModal
        isVisible={isPending}
        title="여행 일정을 준비하고 있어요!"
        description="잠시만 기다려주세요!"
      />
    </SafeAreaView>
  );
}

function parseDate(dateString: string): Date {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}
