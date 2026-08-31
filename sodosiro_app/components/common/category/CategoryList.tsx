import { Categories } from "@/constants/Category";
import { ScrollView } from "react-native";
import CategoryBadge from "./CategoryBadge";

type Props = {
  selectedCategory: CategoryType;
  setSelectedCategory: (category: CategoryType) => void;
  paddingHorizontal?: number;
  paddingLeft?: number;
  paddingRight?: number;
  onCategoryPress?: () => void;
};

export default function CategoryList({
  selectedCategory,
  setSelectedCategory,
  paddingHorizontal = 0,
  paddingLeft,
  paddingRight,
  onCategoryPress,
}: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        gap: 4,
        paddingLeft: paddingLeft ?? paddingHorizontal,
        paddingRight: paddingRight ?? paddingHorizontal,
      }}
    >
      {Categories.map((category) => (
        <CategoryBadge
          key={category}
          category={category}
          isSelected={selectedCategory === category}
          onPress={async () => {
            setSelectedCategory(category);
            onCategoryPress?.();
          }}
        />
      ))}
    </ScrollView>
  );
}
