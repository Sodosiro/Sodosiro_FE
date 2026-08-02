import useSelectedAnimation from "@/hooks/useSelcetedAnimation";
import { badgeStyle } from "@/styles/Badge";
import type { PressableProps } from "react-native";
import { AnimatedPressable } from "./Animated";
import CustomText from "./CustomText";

interface Props extends PressableProps {
  title: string;
  isSelected: boolean;
}

export default function AnimatedBadge({
  className,
  title,
  disabled,
  isSelected,
  ...props
}: Props) {
  const { containerStyle, textStyle } = useSelectedAnimation(isSelected, {
    background: ["#FFFFFF", "#1A1A1A"],
    color: ["#1A1A1A", "#FFFFFF"],
  });

  return (
    <AnimatedPressable
      style={containerStyle}
      className={`${className} px-4 py-2.5 ${badgeStyle}`}
      disabled={disabled}
      {...props}
    >
      <CustomText font="body3 tight" animatedStyle={textStyle}>
        {title}
      </CustomText>
    </AnimatedPressable>
  );
}
