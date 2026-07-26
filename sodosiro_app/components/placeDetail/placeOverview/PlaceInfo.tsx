import CustomText from "@/components/common/CustomText";
import CategoryTag from "@/components/common/place/CategoryTag";
import Rate from "@/components/common/place/Rate";
import { View } from "react-native";

export default function PlaceInfo({
  category,
  title,
  desc,
  rate,
  reviewCount,
}: {
  category: CategoryType;
  title: string;
  desc: string;
  rate: number;
  reviewCount: number;
}) {
  return (
    <View className="px-5 py-4 gap-1">
      <CategoryTag category={category} />
      <CustomText font="heading2">{title}</CustomText>
      <View className="flex-row">
        <CustomText
          font="body3"
          className="text-text-muted flex-1"
          numberOfLines={1}
        >
          {desc}
        </CustomText>
        <Rate rate={rate} reviewCount={reviewCount} />
      </View>
    </View>
  );
}
