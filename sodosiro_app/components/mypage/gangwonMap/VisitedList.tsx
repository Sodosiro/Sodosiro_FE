import { PinMiniIcon } from "@/assets/svgs";
import { AnimatedDownIcon } from "@/components/common/animated/Animated";
import CustomText from "@/components/common/CustomText";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function VisitedList({
  visitedRegions,
}: {
  visitedRegions: string[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  const height = useSharedValue(0);
  const rotation = useSharedValue(0);

  const animatedHeight = useAnimatedStyle(() => ({
    height: height.value,
  }));

  const animatedRotate = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const handleToggle = () => {
    const next = !isOpen;

    setIsOpen(next);
    height.value = withTiming(next ? 52 : 0, {
      duration: 300,
    });
    rotation.value = withTiming(isOpen ? 0 : -180, {
      duration: 300,
    });
  };

  return (
    <View className="p-2.5">
      <View className="overflow-hidden rounded-xl border border-border">
        <Pressable
          className="flex-row bg-primary-light p-4"
          onPress={handleToggle}
        >
          <View className="flex-1 flex-row items-center gap-1">
            <PinMiniIcon color="#444444" />

            <CustomText font="body3" className="flex-1">
              방문한 지역{" "}
              <Text className="text-primary-dark">{visitedRegions.length}</Text>
              곳
            </CustomText>

            <AnimatedDownIcon height={16} style={animatedRotate} />
          </View>
        </Pressable>

        <Animated.View style={animatedHeight}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 16,
              alignItems: "center",
              gap: 4,
            }}
          >
            {visitedRegions.map((region) => (
              <View
                key={region}
                className="rounded-full border border-primary bg-bg px-3 py-1.5"
              >
                <CustomText font="body3" className="text-primary-dark">
                  {region}
                </CustomText>
              </View>
            ))}
          </ScrollView>
        </Animated.View>
      </View>
    </View>
  );
}
