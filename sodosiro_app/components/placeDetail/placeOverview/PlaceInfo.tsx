import CustomText from "@/components/common/CustomText";
import RateChip from "@/components/place/RateChip";
import Tag from "@/components/place/Tag";
import { View } from "react-native";

export default function PlaceInfo({
  category,
  title,
  rankTag,
  overview,
  avgRating,
  reviewCount,
}: {
  category: CategoryType;
  title: string;
  rankTag: string;
  overview: string;
  avgRating: number;
  reviewCount: number;
}) {
  return (
    <View className="px-5 py-4 gap-1">
      <View className={`flex-row gap-1`}>
        <Tag category={category} />
        {rankTag && <Tag rankTag={rankTag} />}
      </View>
      <CustomText font="heading1">{title}</CustomText>
      <View className="flex-row gap-1 items-start">
        <CustomText font="body3" className="text-text-muted flex-1">
          {overview}
        </CustomText>
        <RateChip rate={avgRating} reviewCount={reviewCount} />
      </View>
    </View>
  );
}
