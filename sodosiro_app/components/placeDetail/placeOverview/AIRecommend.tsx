import { postAiRecommendationApi } from "@/api/place";
import { LogoIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import ExpandableText from "@/components/common/ExpandableText";
import { SkeletonLine } from "@/components/common/skeleton/SkeletonLine";
import { useQuery } from "@tanstack/react-query";
import { View } from "react-native";

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
      <LogoIcon width={20} height={20} />
      <View className="gap-1 flex-1">
        <CustomText font="body1" className="text-primary-dark">
          AI 한 줄 요약
        </CustomText>
        {isFetching && !aiRecommendation?.available ? (
          <View className={`gap-1.5`}>
            <SkeletonLine
              font="body2"
              backgroundColors={["#EAF2C8", "#DCE9A5"]}
            />
            <SkeletonLine
              font="body2"
              backgroundColors={["#EAF2C8", "#DCE9A5"]}
            />
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
