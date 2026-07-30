import { CameraMiniIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import useSelectedAnimation from "@/hooks/useSelcetedAnimation";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Pressable } from "react-native";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedCameraIcon = Animated.createAnimatedComponent(CameraMiniIcon);

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
      <AnimatedCameraIcon animatedProps={strokeStyle} />

      <CustomText font="body3 tight" animatedStyle={textStyle}>
        포토 리뷰
      </CustomText>
    </AnimatedPressable>
  );
}
