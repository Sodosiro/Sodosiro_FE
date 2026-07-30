import useSelectedAnimation from "@/hooks/useSelcetedAnimation";
import { CategoryIconMap, CategoryMap } from "@/util/place/category";
import React from "react";
import { AnimatedPressable } from "./Animated";
import CustomText from "./CustomText";

type Props = {
  disabled?: boolean;
  isSelected?: boolean;
  category: CategoryType;
  onPress: () => void;
};

const BACKGROUND: [string, string] = ["#FFFFFF", "#1A1A1A"];
const COLOR: [string, string] = ["#1A1A1A", "#FFFFFF"];

export default React.memo(function CategoryBadge({
  disabled = false,
  isSelected = false,
  category,
  onPress,
}: Props) {
  const Icon = CategoryIconMap[category];
  const text = CategoryMap[category];

  const { containerStyle, strokeStyle, textStyle } = useSelectedAnimation(
    isSelected,
    {
      background: BACKGROUND,
      color: COLOR,
    },
  );

  return (
    <AnimatedPressable
      style={containerStyle}
      className={`${Icon ? `px-4` : `px-3`} flex-row items-center self-start py-2.5 rounded-full border border-border`}
      disabled={disabled}
      onPress={onPress}
    >
      {Icon && <Icon animatedProps={strokeStyle} />}

      <CustomText
        font="body3 tight"
        animatedStyle={textStyle}
        // 텍스트 짤림 방지
        className={`${Icon ? `pl-1` : `px-1`}`}
      >
        {text}
      </CustomText>
    </AnimatedPressable>
  );
});
