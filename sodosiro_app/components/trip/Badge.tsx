import { LayoutChangeEvent, Pressable } from "react-native";
import CustomText from "../common/CustomText";

type Props = {
  disabled?: boolean;
  selected?: boolean;
  update?: boolean;
  text: string;
  onPress: () => void;
  onLayout: (e: LayoutChangeEvent) => void;
};

export default function Badge({
  disabled = false,
  selected = false,
  update = false,
  text,
  onPress,
  onLayout,
}: Props) {
  return (
    <Pressable
      className={`${selected ? `bg-[#1A1A1A]` : disabled ? `bg-btn-disabled` : update ? `bg-white` : `bg-bg-muted`} flex-row items-center self-start px-4 py-2.5 h-9 gap-1 rounded-full border border-border`}
      disabled={disabled}
      onPress={onPress}
      onLayout={onLayout}
    >
      <CustomText
        font="body3 tight"
        className={`${selected ? `text-white` : disabled ? `text-text-muted` : `text-text-primary`}`}
      >
        {text}
      </CustomText>
    </Pressable>
  );
}
