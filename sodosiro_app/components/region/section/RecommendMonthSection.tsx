import CustomText from "@/components/common/CustomText";
import { View } from "react-native";
import RegionSectionContainer from "./RegionSectionContainer";

export default function RecommendMonthSection({
  recommendMonth,
}: {
  recommendMonth: {
    startMonth: number;
    endMonth: number;
    reason: string;
  };
}) {
  return (
    <RegionSectionContainer title="여행 가기 좋은 시기">
      <View className={`bg-primary-light rounded-xl px-4 py-3 gap-0.5`}>
        <CustomText font="title" className={`text-primary-dark`}>
          {recommendMonth.startMonth}월 ~ {recommendMonth.endMonth}월
        </CustomText>
        <CustomText font="body3" className={`text-text-secondary`}>
          {recommendMonth.reason}
        </CustomText>
      </View>
    </RegionSectionContainer>
  );
}
