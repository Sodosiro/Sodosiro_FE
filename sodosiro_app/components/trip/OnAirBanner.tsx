import { OnAirIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

type OnAirBannerProps = {
  tripTitle: string;
};

export default function OnAirBanner({ tripTitle }: OnAirBannerProps) {
  // 1. 투명도 조절을 위한 Shared Value 생성
  const opacity = useSharedValue(1);

  useEffect(() => {
    // 2. 1.2초 동안 opacity를 0.3으로 줄였다가 늘리는 애니메이션 무한 반복
    opacity.value = withRepeat(
      withTiming(0.3, { duration: 1200 }),
      -1, // 무한 반복
      true, // reverse: 0.3으로 줄어든 뒤 다시 1로 복구됨
    );
  }, [opacity]);

  // 3. Animated Style 생성
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View
      className="flex-row items-center py-4 pl-5 gap-1.5"
      style={{ backgroundColor: "#C4D96A" }}
    >
      <Animated.View style={animatedStyle}>
        <OnAirIcon width={6} />
      </Animated.View>
      <CustomText font="body2" style={{ fontWeight: "700" }}>
        진행 중
      </CustomText>
      <View className={`w-0.5 h-0.5 bg-text-primary rounded-full`} />
      <CustomText font="body2">{tripTitle}</CustomText>
    </View>
  );
}
