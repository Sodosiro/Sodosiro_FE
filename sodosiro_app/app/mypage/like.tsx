import Header from "@/components/common/Header";
import Spinner from "@/components/common/Spinner";
import LikeFilter from "@/components/mypage/like/LikeFilter";
import LikeList from "@/components/mypage/like/LikeList";
import { useLikePlacesQuery } from "@/hooks/query/useLikePlacesQuery";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LikeListScreen() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");
  const [sortOption, setSortOption] = useState<SortType>("RECENT");

  const { data, isPending } = useLikePlacesQuery(
    selectedCategory,
    undefined,
    sortOption,
  );

  const places = data?.pages.flatMap((page) => page.data.content) ?? [];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Header title="저장한 장소" />
      <LikeFilter
        sortOption={sortOption}
        setSortOption={setSortOption}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      {isPending ? (
        <View className={`flex-1 justify-center items-center`}>
          <Spinner />
        </View>
      ) : (
        <LikeList places={places} />
      )}
    </SafeAreaView>
  );
}
