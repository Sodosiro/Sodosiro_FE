import { AnimatedPressable } from "@/components/common/animated/Animated";
import CustomText from "@/components/common/CustomText";
import CameraIcon from "@/components/icon/CameraIcon";
import useSelectedAnimation from "@/hooks/useSelcetedAnimation";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useSharedValue, withTiming } from "react-native-reanimated";

export default function PhotoReviewBadge({
  isSelected,
  setIsSelected,
}: {
  isSelected: boolean;
  setIsSelected: Dispatch<SetStateAction<boolean>>;
}) {
  const progress = useSharedValue(isSelected ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(isSelected ? 1 : 0, {
      duration: 150,
    });
  }, [isSelected, progress]);

  const { containerStyle, strokeStyle, textStyle } = useSelectedAnimation(
    isSelected,
    {
      background: ["#FFFFFF", "#1A1A1A"],
      color: ["#1A1A1A", "#FFFFFF"],
      stroke: ["#1A1A1A", "#FFFFFF"],
    },
  );

  return (
    <AnimatedPressable
      style={containerStyle}
      className="px-4 py-2.5 rounded-full self-start flex-row items-center gap-1 border border-border"
      onPress={() => setIsSelected((prev) => !prev)}
    >
      <CameraIcon animatedStroke={strokeStyle} />
      <CustomText font="body3 tight" animatedStyle={textStyle}>
        포토 리뷰
      </CustomText>
    </AnimatedPressable>
  );
}
