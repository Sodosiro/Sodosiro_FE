import useSelectedAnimation from "@/hooks/useSelcetedAnimation";
import CustomText from "../common/CustomText";
import { AnimatedPressable } from "../common/animated/Animated";

type Props = {
  icon: React.ComponentType<AnimatedIconProps>;
  title: string;
  description: string;
  selected?: boolean;
  disabled?: boolean;
  onPress?: () => void;
};

export default function TransportCard({
  icon: Icon,
  title,
  description,
  selected = false,
  disabled = false,
  onPress,
}: Props) {
  const { borderStyle, textStyle, strokeStyle } = useSelectedAnimation(selected, {
    border: ["#d9d9d9", "#1a1a1a"],
    color: ["#888888", "#1a1a1a"],
    stroke: ["#888888", "#1a1a1a"],
  });

  return (
    <AnimatedPressable
      disabled={disabled}
      onPress={onPress}
      className={`
        flex-1
        items-center
        justify-center
        rounded-2xl
        border-2
        py-4
        px-4
        gap-1
        bg-white
        ${disabled ? "opacity-40" : ""}
      `}
      style={borderStyle}
    >
      <Icon animatedStroke={strokeStyle} />

      <CustomText font="title" animatedStyle={textStyle}>
        {title}
      </CustomText>

      <CustomText font="body3" animatedStyle={textStyle}>
        {description}
      </CustomText>
    </AnimatedPressable>
  );
}
