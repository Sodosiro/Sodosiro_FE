import useSelectedAnimation from "@/hooks/useSelcetedAnimation";
import { CategoryIconMap, CategoryMap } from "@/util/place/category";
import { Pressable } from "react-native";
import Animated from "react-native-reanimated";
import CustomText from "./CustomText";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
  disabled?: boolean;
  isSelected?: boolean;
  category: CategoryType;
  onPress: () => void;
};

export default function CategoryBadge({
  disabled = false,
  isSelected = false,
  category,
  onPress,
}: Props) {
  const Icon = CategoryIconMap[category];
  const text = CategoryMap[category];

  const { containerStyle, animatedProps, textStyle } = useSelectedAnimation(
    isSelected,
    {
      background: ["#FFFFFF", "#1A1A1A"],
      color: ["#1A1A1A", "#FFFFFF"],
    },
  );

  return (
    <AnimatedPressable
      style={containerStyle}
      className="flex-row items-center self-start px-4 py-2.5 h-10 gap-1 rounded-full border border-border"
      disabled={disabled}
      onPress={onPress}
    >
      {Icon && <Icon animatedProps={animatedProps} />}
      <Animated.View>
        <CustomText font="body3 tight" animatedStyle={textStyle}>
          {text}
        </CustomText>
      </Animated.View>
    </AnimatedPressable>
  );
}
