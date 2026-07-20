import { Categories } from "@/constants/Category";
import { ScrollView } from "react-native";
import CategoryBadge from "../../common/CategoryBadge";
import { Dispatch, SetStateAction } from "react";

type Props = {
  selectedCategory: CategoryType;
  setSelectedCategory: Dispatch<SetStateAction<CategoryType>>;
}

export default function CategoryList({
  selectedCategory,
  setSelectedCategory,
}: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 4 }}>
      {Categories.map((category) => (
        <CategoryBadge key={category} category={category} selected={selectedCategory === category} onPress={async () => setSelectedCategory(category)} />
      ))}
    </ScrollView>
  )
}