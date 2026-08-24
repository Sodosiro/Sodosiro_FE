import CustomText from "@/components/common/CustomText";
import { View } from "react-native";
import RegionSectionContainer from "./RegionSectionContainer";

export default function RecommendMonthSection({
  bestSeason,
}: {
  bestSeason: {
    startMonth: number;
    endMonth: number;
    description: string;
  };
}) {
  return (
    <RegionSectionContainer title="여행 가기 좋은 시기">
      <View className={`bg-primary-light rounded-xl px-4 py-3 gap-0.5`}>
        <CustomText font="title" className={`text-primary-dark`}>
          {bestSeason?.startMonth}월 ~ {bestSeason?.endMonth}월
        </CustomText>
        <CustomText font="body3" className={`text-text-secondary`}>
          {bestSeason?.description}
        </CustomText>
      </View>
    </RegionSectionContainer>
  );
}
