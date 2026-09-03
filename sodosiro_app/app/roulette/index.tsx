import { RightIcon } from "@/assets/svgs";
import { AnimatedPressable } from "@/components/common/animated/Animated";
import CustomText from "@/components/common/CustomText";
import Header from "@/components/common/Header";
import RoulleteContent from "@/components/roulette/RouletteContent";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RouletteScreen() {
  const [isRolling, setIsRolling] = useState(false);

  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    opacity.value = withTiming(isRolling ? 0.5 : 1, {
      duration: 200,
    });
  }, [isRolling]);

  return (
    <LinearGradient
      colors={["#77B4DD", "rgba(255,255,255,0)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <View className={`flex-1`}>
        <SafeAreaView>
          <Header
            title={""}
            isBgWhite={false}
            rightComponent={
              <AnimatedPressable
                className={`flex-row justify-center items-center p-1.5 pl-3.5 rounded-full bg-[rgba(255,255,255,0.6)]`}
                style={animatedStyle}
                onPress={() => router.push("/roulette/selectRegion")}
                disabled={isRolling}
              >
                <CustomText font="body3">지역 직접 선택하기</CustomText>
                <RightIcon width={16} color={"#1a1a1a"} />
              </AnimatedPressable>
            }
          />
        </SafeAreaView>
        <RoulleteContent isRolling={isRolling} setIsRolling={setIsRolling} />
      </View>
    </LinearGradient>
  );
}
