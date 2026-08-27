import CategoryBadge from "@/components/common/category/CategoryBadge";
import { Categories } from "@/constants/Category";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet"; // ★ BottomSheetScrollView로 변경

type Props = {
  selectedCategory: CategoryType;
  setSelectedCategory: (category: CategoryType) => void;
  paddingHorizontal?: number;
  onCategoryPress?: () => void;
};

export default function CategoryList({
  selectedCategory,
  setSelectedCategory,
  paddingHorizontal = 0,
  onCategoryPress,
}: Props) {
  return (
    <BottomSheetScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 4, paddingHorizontal: paddingHorizontal }}
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
    </BottomSheetScrollView>
  );
}
