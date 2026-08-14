import CategoryList from "@/components/common/category/CategoryList";
import SortBadge from "@/components/common/sort/SortBadge";
import { SORT_OPTIONS } from "@/constants/Sort";
import { Dispatch, SetStateAction } from "react";
import { View } from "react-native";

export default function LikeFilter({
  sortOption,
  setSortOption,
  selectedCategory,
  setSelectedCategory,
}: {
  sortOption: SortType;
  setSortOption: Dispatch<SetStateAction<SortType>>;
  selectedCategory: CategoryType;
  setSelectedCategory: Dispatch<SetStateAction<CategoryType>>;
}) {
  return (
    <View className="flex-row pl-5">
      <SortBadge
        sortOption={sortOption}
        setSortOption={setSortOption}
        sortOptions={SORT_OPTIONS}
      />

      <View className="ml-2 w-px bg-border" />

      <CategoryList
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        paddingHorizontal={8}
      />
    </View>
  );
}
