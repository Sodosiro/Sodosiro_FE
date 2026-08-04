import CategoryList from "@/components/common/category/CategoryList";
import SortBadge from "@/components/common/sort/SortBadge";
import { Dispatch, SetStateAction } from "react";
import { View } from "react-native";

export default function FavoriteFilter({
  sortOption,
  setSortOption,
  selectedCategory,
  setSelectedCategory,
}: {
  sortOption: string;
  setSortOption: Dispatch<SetStateAction<string>>;
  selectedCategory: CategoryType;
  setSelectedCategory: Dispatch<SetStateAction<CategoryType>>;
}) {
  return (
    <View className="flex-row pl-5">
      <SortBadge sortOption={sortOption} setSortOption={setSortOption} />

      <View className="ml-2 w-px bg-border" />

      <CategoryList
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        paddingHorizontal={8}
      />
    </View>
  );
}
