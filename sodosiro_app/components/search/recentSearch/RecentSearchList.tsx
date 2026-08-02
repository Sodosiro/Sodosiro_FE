import CustomText from "@/components/common/CustomText";
import { ScrollView, View } from "react-native";
import RecentSearch from "./RecentSearch";

export default function RecentSearchList({
  recentSearchList,
  handleRemove,
}: {
  recentSearchList: string[];
  handleRemove: (keyword: string) => void;
}) {
  return recentSearchList.length > 0 ? (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 4 }}
      keyboardShouldPersistTaps="handled"
      className={`min-h-10`}
    >
      {recentSearchList.map((recentSearch: string) => (
        <RecentSearch
          key={recentSearch}
          recentSearch={recentSearch}
          onRemove={handleRemove}
        />
      ))}
    </ScrollView>
  ) : (
    <View className={`h-10 flex justify-center items-center py-2`}>
      <CustomText font="body2" className={`text-text-muted flex-1`}>
        최근 검색어가 없습니다
      </CustomText>
    </View>
  );
}
