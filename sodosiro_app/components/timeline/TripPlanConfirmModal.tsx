import { BigXIcon } from "@/assets/svgs";
import { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import CustomText from "../common/CustomText";
import DayBadge from "../trip/badge/DayBadge";

type TripPlanConfirmModalProps = {
  visible: boolean;
  title?: string;
  dateRange?: string;
  plan: DayPlan[];
  onClose: () => void;
  onConfirm: (selectedDayIndex: number) => void;
};

export default function TripPlanConfirmModal({
  visible,
  title = "강릉 여행",
  dateRange = "10/5 (토) ~ 10/11 (금)",
  plan = [],
  onClose,
  onConfirm,
}: TripPlanConfirmModalProps) {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  // plan 변경 시 첫 번째 일차 선택
  useEffect(() => {
    setSelectedDayIndex(0);
  }, [plan]);

  const currentPlanItem = plan[selectedDayIndex];
  const currentPlaces = currentPlanItem?.places ?? [];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 bg-[rgba(0,0,0,0.5)] justify-center items-center"
        onPress={onClose}
      >
        <Pressable
          className="w-[80%] bg-white rounded-3xl p-5 gap-4"
          onPress={(e) => e.stopPropagation()}
        >
          <View className="flex-row items-start justify-between">
            <View className={`gap-1`}>
              <CustomText font="heading2">{title}</CustomText>
              <CustomText font="body2" className="text-text-muted">
                {dateRange}
              </CustomText>
            </View>

            <Pressable
              onPress={onClose}
              className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center"
              hitSlop={8}
            >
              <BigXIcon />
            </Pressable>
          </View>

          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                gap: 8,
              }}
            >
              {plan.map((day, index) => (
                <DayBadge
                  key={day.id}
                  text={`${index + 1}일차`}
                  selected={index === selectedDayIndex}
                  onPress={() => setSelectedDayIndex(index)}
                  onLayout={() => {}}
                />
              ))}
            </ScrollView>
          </View>

          <View className="bg-[#F5F5F5] rounded-2xl p-3 pb-4 h-54 gap-2">
            <CustomText font="body1" className="text-text-secondary">
              장소 {currentPlaces.length}곳
            </CustomText>

            <ScrollView
              showsVerticalScrollIndicator={false}
              className="max-h-45"
              contentContainerClassName="gap-2"
            >
              {currentPlaces.map((place) => (
                <View key={place.contentId} className="flex-row gap-2">
                  <View className="w-1 h-1 rounded-full bg-gray-800 mt-1.5" />
                  <CustomText font="body2" className={`flex-1`}>
                    {place.title}
                  </CustomText>
                </View>
              ))}
            </ScrollView>
          </View>

          <Pressable
            onPress={() => onConfirm(selectedDayIndex)}
            className="w-full bg-[#C5E17A] py-4 rounded-full items-center justify-center"
          >
            <Text className="text-base font-bold text-gray-900">
              이 일정으로 확정하기
            </Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
