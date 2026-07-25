import { StarIcon } from "@/assets/svgs";
import { View } from "react-native";
import CustomText from "../CustomText";

export default function Rate({
  rate,
  reviewCount,
}: {
  rate: number | undefined;
  reviewCount: number | undefined;
}) {
  return (
    <View className={`flex-row items-center gap-0.5`}>
      {reviewCount && (
        <>
          <StarIcon />
          <CustomText font="body2">{rate}</CustomText>
          <CustomText font="body3" className={`text-[#666666]`}>
            {"("}
            {reviewCount}
            {")"}
          </CustomText>
        </>
      )}
    </View>
  );
}
