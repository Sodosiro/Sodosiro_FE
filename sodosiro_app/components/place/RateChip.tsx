import { StarIcon } from "@/assets/svgs";
import { View } from "react-native";
import CustomText from "../common/CustomText";

export default function RateChip({
  rate,
  reviewCount,
}: {
  rate: number | undefined;
  reviewCount: number | undefined;
}) {
  return (
    <View className={`flex-row items-center gap-0.5`}>
      <StarIcon />
      <CustomText font="body2">{rate}</CustomText>
      <CustomText font="body3" className={`text-[#666666]`}>
        {"("}
        {reviewCount}
        {")"}
      </CustomText>
    </View>
  );
}
