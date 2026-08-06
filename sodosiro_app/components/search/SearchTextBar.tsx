import { SearchIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import { useExploreStore } from "@/stores/useExploreStore";
import { TitleTightClass } from "@/styles/Typography";
import { handleSearch } from "@/util/search/search";
import { router } from "expo-router";
import { TextInput, View } from "react-native";

export default function SearchTextBar() {
  const keyword = useExploreStore((state) => state.keyword);
  const setKeyword = useExploreStore((state) => state.setKeyword);

  return (
    <View className={`flex-row items-center gap-2`}>
      <View
        className={`flex-row justify-between items-center border border-bg-subtle bg-bg-subtle flex-1 px-6 h-15 rounded-full`}
      >
        <TextInput
          autoFocus
          value={keyword}
          onChangeText={setKeyword}
          onSubmitEditing={() => handleSearch(keyword)}
          returnKeyType="search"
          placeholder="가고 싶은 여행지를 검색해보세요"
          placeholderTextColor={"#888888"}
          className={`${TitleTightClass} text-text-primary flex-1 w-full h-15 p-0`}
        />
        <SearchIcon color={"#888888"} />
      </View>
      <CustomText
        font="body1"
        onPress={() => router.back()}
        className={`text-text-muted p-2.5`}
      >
        닫기
      </CustomText>
    </View>
  );
}
