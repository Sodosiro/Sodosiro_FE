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
    <RegionSectionContainer title="이런 여행을 좋아한다면 추천해요">
      <View className={`gap-3`}>
        {reasons?.map((reason, index) => (
          <View key={index} className={`flex-row gap-1`}>
            <CheckIcon />
            <CustomText
              font="body3"
              className={`pt-1 text-text-secondary shrink`}
            >
              {reason}
            </CustomText>
          </View>
        ))}
      </View>
    </RegionSectionContainer>
  );
}
