import { SearchIcon } from "@/assets/svgs";
import Header from "@/components/common/Header";
import FavoriteList from "@/components/mypage/favorite/FavoriteList";
import SortBadgeList from "@/components/mypage/favorite/SortBadgeList";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FavoriteListScreen() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");
  const [sortOption, setSortOption] = useState("최신순");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Header
        title="좋아요한 장소"
        rightComponent={<SearchIcon color="#1a1a1a" />}
      />
      <SortBadgeList
        sortOption={sortOption}
        setSortOption={setSortOption}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <FavoriteList />
    </SafeAreaView>
  );
}
