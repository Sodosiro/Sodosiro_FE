import { Categories } from "@/constants/Category";
import { ScrollView } from "react-native";
import CategoryBadge from "./CategoryBadge";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  selectedCategory: CategoryType;
  setSelectedCategory: Dispatch<SetStateAction<CategoryType>>;
  paddingHorizontal?: number;
};

export default function CategoryList({
  selectedCategory,
  setSelectedCategory,
  paddingHorizontal = 0,
}: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 4, paddingHorizontal: paddingHorizontal }}
    >
      {Categories.map((category) => (
        <CategoryBadge
          key={category}
          category={category}
          selected={selectedCategory === category}
          onPress={async () => setSelectedCategory(category)}
        />
      ))}
    </ScrollView>
  );
}
