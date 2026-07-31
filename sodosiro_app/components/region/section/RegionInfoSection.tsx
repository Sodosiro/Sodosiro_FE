import KeywordBadgeList from "@/components/common/keywordBadge/KeywordBadgeList";
import { View } from "react-native";
import CustomText from "../../common/CustomText";

export default function RegionInfoSection({
  title,
  desc,
  keywords,
}: {
  title: string;
  desc: string;
  keywords: string[];
}) {
  return (
    <View className={`gap-2 pt-5`}>
      <CustomText font="display">{title}</CustomText>
      <CustomText font="body3" className={`text-text-muted`}>
        {desc}
      </CustomText>
      <KeywordBadgeList keywords={keywords} />
    </View>
  );
}
