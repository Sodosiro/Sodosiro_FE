import CustomText from "@/components/common/CustomText";
import { PopularSearchList } from "@/mocks/search";
import { View } from "react-native";
import PopularSearch from "./PopularSearch";

export default function PopularSearchSection() {
  return (
    <View className={`gap-4 pb-2`}>
      <CustomText className={`text-heading2`}>지금 많이 찾는 검색어</CustomText>
      <View className={`gap-1`}>
        {PopularSearchList.map((item, index) => (
          <PopularSearch key={index} popularSearch={item} index={index + 1} />
        ))}
      </View>
    </View>
  );
}
