import { CategoryIconMap, CategoryMap } from "@/util/place/category";
import { Pressable } from "react-native";
import CustomText from "./CustomText";

type Props = {
  disabled?: boolean;
  selected?: boolean;
  category: CategoryType;
  onPress: () => {};
};

export default function CategoryBadge({
  disabled = false,
  selected = false,
  category,
  onPress,
}: Props) {
  const Icon = CategoryIconMap[category];
  const text = CategoryMap[category];

  return (
    <Pressable
      className={`${selected ? `bg-[#1A1A1A]` : disabled ? `bg-btn-disabled` : `bg-white`} flex-row items-center self-start px-4 py-2.5 h-10 gap-1 rounded-full border border-border`}
      disabled={disabled}
      onPress={onPress}
    >
      {Icon && <Icon color={selected ? "white" : disabled ? "#888888" : "#1A1A1A"} />}

      <CustomText
        font="body3 tight"
        className={`${selected ? `text-white` : disabled ? `text-text-muted` : `text-[#1A1A1A]`}`}
      >
        {text}
      </CustomText>
    </Pressable>
  );
}
