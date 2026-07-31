import { CategoryMap } from "@/util/place/category";
import { View } from "react-native";
import CustomText from "../common/CustomText";

export default function CategoryTag({ category }: { category: CategoryType }) {
  return (
    <View className={`self-start px-1.5 py-0.5 bg-bg-subtle rounded-sm`}>
      <CustomText font="body3 tight">{CategoryMap[category]}</CustomText>
    </View>
  );
}
