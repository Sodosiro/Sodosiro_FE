import { ScrollView, View } from "react-native";
import CustomText from "../../common/CustomText";
import RegionTag from "../RegionTag";

export default function RegionInfoSection({
  title,
  desc,
  tags,
}: {
  title: string;
  desc: string;
  tags: string[];
}) {
  return (
    <View className={`gap-2 pt-5`}>
      <CustomText font="display">{title}</CustomText>
      <CustomText font="body3" className={`text-text-muted`}>
        {desc}
      </CustomText>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 4 }}
      >
        {tags.map((tag, index) => (
          <RegionTag key={index} title={tag} />
        ))}
      </ScrollView>
    </View>
  );
}
