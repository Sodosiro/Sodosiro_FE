import CustomText from "@/components/common/CustomText";
import ExpandableText, {
  ExpandableTextRef,
} from "@/components/common/ExpandableText";
import StarIcon from "@/components/icon/like/StarIcon";
import RateChip from "@/components/place/RateChip";
import Tag from "@/components/place/Tag";
import useSelectedAnimation from "@/hooks/useSelcetedAnimation";
import { RefObject, useEffect, useState } from "react";
import { Pressable, View } from "react-native";

export default function PlaceInfo({
  contentId,
  category,
  title,
  rankTag,
  overview,
  avgRating,
  reviewCount,
  liked,
  handleLike,
  isLikePending,
  expandableTextRef,
}: {
  contentId: number;
  category: CategoryType;
  title: string;
  rankTag: string;
  overview: string;
  avgRating: number;
  reviewCount: number;
  liked: boolean;
  handleLike?: (contentId: number) => Promise<void>;
  isLikePending?: boolean;
  expandableTextRef?: RefObject<ExpandableTextRef | null>;
}) {
  const [isLiked, setIsLiked] = useState(liked);

  const handleLikeToggle = async () => {
    if (isLikePending) return;
    setIsLiked((prev) => !prev);
    await handleLike?.(contentId);
  };

  const { fillStyle } = useSelectedAnimation(isLiked, {
    fill: ["transparent", "#F8CF43"],
  });

  useEffect(() => {
    setIsLiked(liked);
  }, [liked]);

  return (
    <View className="px-5 pb-4 py-2 gap-2">
      <View className={`flex-row gap-2 items-start`}>
        <View className="gap-2 flex-1">
          <CustomText font="heading1">{title}</CustomText>
          <View className="flex-row gap-1">
            <Tag category={category} />
            {rankTag && <Tag rankTag={rankTag} />}
          </View>
        </View>
        {handleLike && (
          <Pressable onPress={handleLikeToggle} className={`p-2`}>
            <StarIcon animatedFill={fillStyle} width={20} height={20} />
          </Pressable>
        )}
      </View>
      <View className="gap-2 items-start">
        <View className="w-full">
          <ExpandableText
            font="body3"
            textClass="text-text-muted pr-6"
            ref={expandableTextRef}
          >
            {overview}
          </ExpandableText>
        </View>
        <RateChip rate={avgRating} reviewCount={reviewCount} />
      </View>
    </View>
  );
}
