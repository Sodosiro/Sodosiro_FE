import { RightIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import { handleSearch } from "@/util/search/search";
import { Pressable, View } from "react-native";

export default function PopularSearch({
  popularSearch,
  index,
}: {
  popularSearch: string;
  index: number;
}) {
  return (
    <Pressable
      className={`flex-row items-center justify-between py-2`}
      onPress={() => handleSearch(popularSearch)}
    >
      <View className={`flex-row gap-2 flex-1`}>
        <CustomText font="body1" className={`w-4 text-text-muted`}>
          {index}
        </CustomText>
        <CustomText font="body1" className={`flex-1`} numberOfLines={1}>
          {popularSearch}
        </CustomText>
      </View>
      <RightIcon color={"#888888"} />
    </Pressable>
  );
}
