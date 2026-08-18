import { postAiRecommendationApi } from "@/api/place";
import CustomText from "@/components/common/CustomText";
import ExpandableText from "@/components/common/ExpandableText";
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
  const { data, isFetching } = useQuery({
    queryKey: ["aiRecommendation", contentId],
    queryFn: () => postAiRecommendationApi(contentId),
    enabled: !aiRecommendation?.available,
  });

  const reason = (
    aiRecommendation?.available ? aiRecommendation.reason : data?.data?.reason
  )?.replace(/\n/g, "");

  return (
    <View className="flex-row px-4 pt-3 pb-4 gap-2 bg-primary-light">
      <Image className="size-6" source={require("@/assets/images/ai.png")} />
      <View className="gap-1 flex-1">
        <CustomText font="body1" className="text-primary-dark">
          AI 추천 이유
        </CustomText>
        {isFetching && !aiRecommendation?.available ? (
          <View className={`gap-1.5`}>
            <SkeletonLine />
            <SkeletonLine />
          </View>
        ) : (
          <ExpandableText font="body2" textClass={`text-text-secondary pr-6`}>
            {reason}
          </ExpandableText>
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
