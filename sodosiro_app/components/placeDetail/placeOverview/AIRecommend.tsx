import { postAiRecommendationApi } from "@/api/place";
import CustomText from "@/components/common/CustomText";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Image, View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

type aiRecommendation = {
  available: boolean;
  reason: string;
};

export default function AIRecommend({
  contentId,
  aiRecommendation,
}: {
  contentId: number;
  aiRecommendation: aiRecommendation;
}) {
  const { data, isPending } = useQuery({
    queryKey: ["aiRecommendation", contentId],
    queryFn: () => postAiRecommendationApi(contentId),
    enabled: !aiRecommendation?.available,
  });

  const reason = aiRecommendation?.available
    ? aiRecommendation.reason
    : data?.data?.reason;

  return (
    <View className="flex-row px-4 py-3 gap-2 bg-primary-light">
      <Image className="size-6" source={require("@/assets/images/ai.png")} />
      <View className="gap-1 flex-1">
        <CustomText font="body1" className="text-primary-dark">
          AI 추천 이유
        </CustomText>
        {isPending ? (
          <SkeletonLine />
        ) : (
          <CustomText font="body2" className="text-text-secondary">
            {reason}
          </CustomText>
        )}
      </View>
    </View>
  );
}

function SkeletonLine({ width = "100%" }: { width?: `${number}%` }) {
  const progress = useSharedValue(-1);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {
        duration: 1000,
      }),
      -1,
      true,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      ["#EAF2C8", "#DCE9A5"],
    ),
  }));

  return (
    <View className="h-4 overflow-hidden rounded bg-gray-200" style={{ width }}>
      <Animated.View
        className="h-full w-full bg-gray-100"
        style={animatedStyle}
      />
    </View>
  );
}
