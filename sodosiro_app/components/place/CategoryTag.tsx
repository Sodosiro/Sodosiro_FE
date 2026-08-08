import { tagStyle } from "@/styles/Tag";
import { CategoryMap } from "@/util/place/category";
import { View } from "react-native";
import CustomText from "../common/CustomText";

export default function CategoryTag({ category }: { category: CategoryType }) {
  return (
    <View className={`flex-row`}>
      <View className={`${tagStyle} bg-bg-subtle`}>
        <CustomText font="body3 tight">{CategoryMap[category]}</CustomText>
      </View>
    </View>
  );
}
