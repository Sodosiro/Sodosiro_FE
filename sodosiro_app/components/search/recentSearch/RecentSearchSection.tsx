import CustomText from "@/components/common/CustomText";
import RecentSearchList from "./RecentSearchList";
import {
  clearSearchHistory,
  getSearchHistory,
  removeSearchHistory,
} from "@/util/search/searchHistory";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { View } from "react-native";

export default function RecentSearchSection() {
  const [recentSearchList, setRecentSearchList] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      async function loadHistory() {
        const history = await getSearchHistory();
        setRecentSearchList(history);
      }

      loadHistory();
    }, []),
  );

  const handleRemove = async (keyword: string) => {
    await removeSearchHistory(keyword);

    setRecentSearchList((prev) => prev.filter((item) => item !== keyword));
  };

  const handleClear = async () => {
    await clearSearchHistory();

    setRecentSearchList([]);
  };

  return (
    <View className={`gap-3`}>
      <View className={`flex-row justify-between items-center`}>
        <CustomText className={`text-heading2`}>최근 검색어</CustomText>
        <CustomText
          className={`text-body1 text-text-muted`}
          onPress={handleClear}
        >
          모두 지우기
        </CustomText>
      </View>
      <RecentSearchList
        recentSearchList={recentSearchList}
        handleRemove={handleRemove}
      />
    </View>
  );
}
