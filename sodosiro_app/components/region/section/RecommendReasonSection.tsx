import { CheckIcon } from "@/assets/svgs";
import { View } from "react-native";
import CustomText from "../../common/CustomText";
import RegionSectionContainer from "./RegionSectionContainer";

export default function RecommendReasonSection({
  reasons,
}: {
  reasons: string[];
}) {
  return (
    <RegionSectionContainer title="이 지역을 추천하는 이유">
      <View className={`gap-3`}>
        {reasons.map((reason, index) => (
          <View key={index} className={`flex-row gap-1`}>
            <CheckIcon />
            <CustomText font="body3" className={`pt-1 text-text-secondary`}>
              {reason}
            </CustomText>
          </View>
        ))}
      </View>
    </RegionSectionContainer>
  );
}
