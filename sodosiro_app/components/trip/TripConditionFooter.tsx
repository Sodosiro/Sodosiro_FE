import { RefreshIcon } from "@/assets/svgs"; // 재설정 아이콘 경로 확인 필요
import CustomButton from "@/components/common/CustomButton"; // 경로 확인 필요
import { Pressable, Text, View } from "react-native";

type Props = {
  onReset: () => void;
  onSubmit: () => void;
  disabled?: boolean;
};

export default function TripConditionFooter({ onReset, onSubmit, disabled = false }: Props) {
  return (
    <View className="flex-row items-center gap-3 border-t border-[#F0F0F0] bg-white px-5 py-3">
      <Pressable
        onPress={onReset}
        className="flex-row items-center justify-center gap-1.5 py-3 px-2"
      >
        <RefreshIcon color="#1A1A1A" />
        <Text className="text-body2 font-medium text-[#1A1A1A]">재설정</Text>
      </Pressable>

      <View className="flex-1">
        <CustomButton
          type="primary"
          title="일정 짜기"
          size="full"
          disabled={disabled}
          onPress={onSubmit}
        />
      </View>
    </View>
  );
}
