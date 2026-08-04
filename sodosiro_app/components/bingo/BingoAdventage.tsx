import CustomText from "@/components/common/CustomText";
import { ADVANTAGES } from "@/constants/Bingo";
import { useState } from "react";
import { Pressable, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SvgProps } from "react-native-svg";
import { AnimatedDownIcon } from "../common/animated/Animated";

export default function BingoAdvantage() {
  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);

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

    height.value = withTiming(next ? contentHeight : 0, {
      duration: 300,
    });

    rotation.value = withTiming(next ? -180 : 0, {
      duration: 300,
    });
  };

  return (
    <View>
      <View className="overflow-hidden rounded-xl border border-border">
        <Pressable className="flex-row bg-bg-subtle p-4" onPress={handleToggle}>
          <View className="flex-1 flex-row items-center gap-1">
            <CustomText font="body3" className="flex-1 text-text-secondary">
              빙고를 완성하면 어떤 혜택이 있나요?
            </CustomText>

            <AnimatedDownIcon height={16} style={animatedRotate} />
          </View>
        </Pressable>

        {/* 실제 표시 영역 */}
        <Animated.View style={animatedHeight} className="overflow-hidden">
          <View className="px-4">
            {ADVANTAGES.map((advantage, index) => (
              <View key={index}>
                <Advantage advantage={advantage} />

                {ADVANTAGES.length - 1 > index && (
                  <View className="h-px w-full bg-border" />
                )}
              </View>
            ))}
          </View>
        </Animated.View>

        {/* 높이 측정용 */}
        {contentHeight === 0 && (
          <View
            className="absolute px-4 pb-1 opacity-0"
            onLayout={(e) => {
              setContentHeight(e.nativeEvent.layout.height);
            }}
          >
            {ADVANTAGES.map((advantage, index) => (
              <View key={index}>
                <Advantage advantage={advantage} />

                {ADVANTAGES.length - 1 > index && (
                  <View className="h-px w-full bg-border" />
                )}
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

const Advantage = ({
  advantage,
}: {
  advantage: {
    Icon: React.ComponentType<SvgProps>;
    condition: string;
    reward: string;
  };
}) => {
  const Icon = advantage.Icon;

  return (
    <View className="flex-row items-center gap-2 py-3">
      <Icon width={20} height={20} />

      <View className="gap-0.5">
        <CustomText font="body2" className="text-text-secondary">
          {advantage.condition}
        </CustomText>

        <CustomText font="body3" className="text-text-muted">
          {advantage.reward}
        </CustomText>
      </View>
    </View>
  );
};
