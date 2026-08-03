import { BigXIcon } from "@/assets/svgs";
import { useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import CustomText from "../common/CustomText";
import DayBadge from "../trip/badge/DayBadge";

// visiblePlan 아이템 내 Place 타입
export type Place = {
  id: number;
  title: string;
  category: string;
  desc?: string;
  lat?: number;
  reviewCount?: number;
};

// visiblePlan 아이템 내 DayPlan 타입
export type DayPlan = {
  id: string;
  dateLabel: string;
  places: Place[];
};

// visiblePlan 단일 항목 타입
export type VisiblePlanItem = {
  dayPlan: DayPlan;
  index: number;
};

type TripPlanConfirmModalProps = {
  visible: boolean;
  title?: string;
  dateRange?: string;
  visiblePlan: VisiblePlanItem[];
  onClose: () => void;
  onConfirm: (selectedDayIndex: number) => void;
};

export default function TripPlanConfirmModal({
  visible,
  title = "강릉 여행",
  dateRange = "10/5 (토) ~ 10/11 (금)",
  visiblePlan = [],
  onClose,
  onConfirm,
}: TripPlanConfirmModalProps) {
  // 현재 선택된 일차 index (기본값: 첫 번째 일정의 index)
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(visiblePlan[0]?.index ?? 0);

  // 선택된 인덱스에 해당하는 일차 Plan 찾기 (없을 경우 첫 번째 항목을 fallback)
  const currentPlanItem =
    visiblePlan.find((item) => item.index === selectedDayIndex) || visiblePlan[0];
  const currentPlaces = currentPlanItem?.dayPlan?.places || [];

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      {/* 1. 배경 오버레이 (반투명 검은색) */}
      <Pressable className="flex-1 bg-black/50 justify-center items-center px-5" onPress={onClose}>
        {/* 2. 모달 컨테이너 (클릭 이벤트 전파 방지) */}
        <Pressable
          className="w-full bg-white rounded-3xl p-5 shadow-xl"
          onPress={(e) => e.stopPropagation()}
        >
          {/* 여행 제목 및 날짜 */}
          <View className="flex-row items-start justify-between">
            <View>
              <CustomText font="heading2" className="text-text-primary">
                {title}
              </CustomText>
              <CustomText font="body2" className="text-text-muted">
                {dateRange}
              </CustomText>
            </View>
            {/* 닫기 (X) 버튼 */}
            <Pressable
              onPress={onClose}
              className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center mb-4 active:bg-gray-200"
              hitSlop={8}
            >
              <BigXIcon />
            </Pressable>
          </View>

          {/* 일차 선택 칩 탭 (가로 스크롤 가능) */}
          <View className="my-4">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                gap: 8,
              }}
            >
              {(visiblePlan.map(({ index }) => index) ?? []).map((index) => (
                <DayBadge
                  key={index}
                  text={`${index + 1}일차`}
                  selected={index === selectedDayIndex}
                  onPress={() => setSelectedDayIndex(index)}
                  onLayout={() => {}}
                />
              ))}
            </ScrollView>
          </View>

          {/* 장소 리스트 박스 */}
          <View className="bg-[#F5F5F5] rounded-2xl p-3 mb-4 min-h-[202px]">
            <CustomText font="body2" className={`text-body2 text-text-secondary`}>
              장소 {currentPlaces.length}곳
            </CustomText>

            <ScrollView showsVerticalScrollIndicator={false} className="max-h-[180px]">
              {currentPlaces.map((place) => (
                <View key={place.id} className="flex-row items-center my-1.5">
                  {/* 불릿 포인트 (dot) */}
                  <View className="w-1.5 h-1.5 rounded-full bg-gray-800 mr-2.5" />
                  <CustomText font="body1" numberOfLines={1}>
                    {place.title}
                  </CustomText>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* 하단 확정 버튼 */}
          <Pressable
            onPress={() => onConfirm(selectedDayIndex)}
            className="w-full bg-[#C5E17A] py-4 rounded-full items-center justify-center active:opacity-90"
          >
            <Text className="text-base font-bold text-gray-900">이 일정으로 확정하기</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
