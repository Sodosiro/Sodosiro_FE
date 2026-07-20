import { Pressable, Text, View, ViewStyle } from "react-native";
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import Spinner from "./Spinner";
import { BigCheckIcon } from "@/assets/svgs";

type ButtonProps = {
  type: 'primary' | 'secondary' | 'tertiary';
  title: string;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  checked?: boolean;
  loading?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function CustomButton({
  type,
  title,
  size = 'large',
  checked = false,
  disabled = false,
  loading = false,
}: ButtonProps) {

  const pressed = useSharedValue(0);

  const PrimaryColor = ["#C4D96A", "#A9C92D"]
  const SecondaryColor = ["#1A1A1A", "#3D3D3D"]
  const TertiaryColor = ["#F5F5F5", "#E2E2E8"]

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: disabled ? "#F4F4F4"
      : interpolateColor(
        pressed.value,
        [0, 1],
        type === 'primary' ? PrimaryColor : type === 'secondary' ? SecondaryColor : TertiaryColor,
      ),
  }));

  const primaryButtonSize = size === 'large' ? 'h-13' : size === 'medium' ? 'w-[235px] h-13' : 'self-start px-4 h-11';
  const secondaryButtonSize = 'self-start px-4 h-11';
  const tertiaryButtonSize = 'self-start px-4 h-11'

  const textSize = type === 'primary' && size !== 'small' ? 'text-title-tight' : 'text-body3-tight'

  const textClass = disabled ? 'text-text-muted' : type === 'secondary' ? 'text-btn-secondary-text' : 'text-text-primary'
  const textColor = disabled ? '#888888' : type === 'secondary' ? "#FFFFFF" : "#1A1A1A"

  const borderClass = 'border border-border'

  return (
    <AnimatedPressable
      className={`
        flex justify-center items-center ${type === 'primary' ? primaryButtonSize : type === 'secondary' ? secondaryButtonSize : tertiaryButtonSize} text-title-tight rounded-full ${type === 'tertiary' ? borderClass : ``}`}
      disabled={disabled || loading}
      onPressIn={() => {
        pressed.value = withTiming(1, {
          duration: 100,
        });
      }}
      onPressOut={() => {
        pressed.value = withTiming(0, {
          duration: 100,
        });
      }}
      style={animatedStyle as ViewStyle}>
      {!loading ? (
        <View className={`flex flex-row justify-center items-center gap-1`}>
          {checked && <BigCheckIcon color={textColor} />}
          <Text className={`${textSize} ${textClass}`}>{title}</Text>
        </View>
      ) : (
        <Spinner color={type === 'secondary' ? "#FFFFFF" : "#1A1A1A"}/>
      )}

    </AnimatedPressable>
  )
}