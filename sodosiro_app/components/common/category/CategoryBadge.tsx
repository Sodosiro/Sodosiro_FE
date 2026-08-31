import useSelectedAnimation from "@/hooks/useSelcetedAnimation";
import { badgeStyle } from "@/styles/Badge";
import { CategoryIconMap, CategoryMap } from "@/util/place/category";
import React from "react";
import CustomText from "../CustomText";
import { AnimatedPressable } from "../animated/Animated";

type Props = {
  disabled?: boolean;
  isSelected?: boolean;
  category: CategoryType;
  onPress: () => void;
};

export default React.memo(function CategoryBadge({
  disabled = false,
  isSelected = false,
  category,
  onPress,
}: Props) {
  const Icon = CategoryIconMap[category];
  const text = CategoryMap[category];

  const color: [string, string] = disabled
    ? ["#888888", "#888888"]
    : ["#1A1A1A", "#FFFFFF"];

  const borderColor: [string, string] = ["#d9d9d9", "#1a1a1a"];

  const { containerStyle, strokeStyle, textStyle, borderStyle } =
    useSelectedAnimation(isSelected, {
      background: ["#FFFFFF", "#1A1A1A"],
      color: color,
      stroke: color,
      border: borderColor,
    });

  return (
    <AnimatedPressable
      style={[containerStyle, borderStyle]}
      className={`px-3 py-2.5 ${badgeStyle}`}
      disabled={disabled}
      onPress={onPress}
    >
      {Icon && <Icon animatedStroke={strokeStyle} />}

      <CustomText
        font="body3 tight"
        animatedStyle={textStyle}
        className={`${Icon ? `pl-1` : `px-1`}`}
      >
        {text}
      </CustomText>
    </AnimatedPressable>
  );
});
