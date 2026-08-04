import { Categories } from "@/constants/Category";
import { ScrollView } from "react-native";
import CategoryBadge from "./CategoryBadge";

type Props = {
  selectedCategory: CategoryType;
  setSelectedCategory: (category: CategoryType) => void;
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
          isSelected={selectedCategory === category}
          onPress={async () => setSelectedCategory(category)}
        />
      ))}
    </ScrollView>
  );
}
