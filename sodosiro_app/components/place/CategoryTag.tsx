import { CategoryMap } from "@/util/place/category";
import { View } from "react-native";
import CustomText from "../common/CustomText";

export default function CategoryTag({ category }: { category: CategoryType }) {
  return (
    <View className={`flex-row`}>
      <View className={`px-1.5 py-1 bg-bg-subtle rounded-sm self-start`}>
        <CustomText font="body3 tight">{CategoryMap[category]}</CustomText>
      </View>
    </View>
  );
}
