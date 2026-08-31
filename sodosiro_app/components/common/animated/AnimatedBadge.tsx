import useSelectedAnimation from "@/hooks/useSelcetedAnimation";
import { badgeStyle } from "@/styles/Badge";
import type { PressableProps } from "react-native";
import CustomText from "../CustomText";
import { AnimatedPressable } from "./Animated";

interface Props extends PressableProps {
  title: string;
  isSelected: boolean;
  backgroundColor?: [string, string];
  color?: [string, string];
  border?: [string, string];
}

export default function AnimatedBadge({
  className,
  title,
  disabled,
  isSelected,
  backgroundColor = ["#FFFFFF", "#1A1A1A"],
  color = ["#1A1A1A", "#FFFFFF"],
  border = ["#d9d9d9", "#1a1a1a"],
  ...props
}: Props) {
  const { containerStyle, textStyle, borderStyle } = useSelectedAnimation(
    isSelected,
    {
      background: backgroundColor,
      color: color,
      border: border,
    },
  );

  return (
    <AnimatedPressable
      style={[containerStyle, borderStyle]}
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
