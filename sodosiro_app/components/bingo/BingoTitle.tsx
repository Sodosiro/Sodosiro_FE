import { InfoMiniIcon } from "@/assets/svgs";
import { useRef, useState } from "react";
import { View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import CustomText from "../common/CustomText";

export default function BingoTitle({
  selectedRegion,
}: {
  selectedRegion: string;
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleTooltip = () => {
    setShowTooltip(true);

    if (tooltipTimer.current) {
      clearTimeout(tooltipTimer.current);
    }

    tooltipTimer.current = setTimeout(() => {
      setShowTooltip(false);
    }, 3000);
  };

  return (
    <View className={`flex-row items-center gap-1`}>
      <CustomText font="heading2">{selectedRegion} 빙고</CustomText>
      <View className="relative w-full">
        <InfoMiniIcon onPress={handleTooltip} />

        {showTooltip && (
          <Animated.View
            entering={FadeIn.duration(150)}
            exiting={FadeOut.duration(150)}
            className="absolute top-0 left-8 px-4 py-3 bg-bg shadow-sm self-start rounded-md"
          >
            <CustomText font="body3" className={`text-text-secondary`}>
              빙고 칸을 눌러 방문을 인증해보세요!
            </CustomText>
          </Animated.View>
        )}
      </View>
    </View>
  );
}
