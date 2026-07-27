import { PinMiniIcon } from "@/assets/svgs";
import { Pressable, Text, View } from "react-native";

type Props = {
  /** 선택된 위치 이름 (없을 경우 null 또는 undefined) */
  locationName?: string | null;
  /** 위치가 선택되지 않았을 때 표시할 문구 */
  placeholder?: string;
  /** 오른쪽에 표시될 액션 텍스트 (기본값: '변경하기') */
  actionText?: string;
  disabled?: boolean;
  onPress?: () => void;
};

export default function LocationPickerButton({
  locationName,
  placeholder = "장소를 선택해주세요.",
  actionText = "변경하기",
  disabled = false,
  onPress,
}: Props) {
  const hasValue = Boolean(locationName);

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      className={`
        flex-row
        items-center
        justify-between
        rounded-full
        border
        border-border
        bg-[#F5F5F5]
        px-5
        py-4
        flex-1
        ${disabled ? "opacity-40" : ""}
      `}
    >
      {/* 좌측: 아이콘 + 장소 텍스트 */}
      <View className="flex-row items-center space-x-2">
        <PinMiniIcon color={hasValue ? "#1A1A1A" : "#888888"} />
        <Text
          className={`text-base ${hasValue ? "font-medium text-[#1A1A1A]" : "text-text-muted"}`}
        >
          {hasValue ? locationName : placeholder}
        </Text>
      </View>

      {/* 우측: 값이 있을 때만 '변경하기' 텍스트 표시 */}
      {hasValue && <Text className="text-sm text-[#888888] font-regular">{actionText}</Text>}
    </Pressable>
  );
}
