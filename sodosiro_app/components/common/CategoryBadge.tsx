import { ActivityIcon, AttractionIcon, CafeIcon, CultureIcon, NatureIcon, RestaurantIcon, ShoppingIcon } from "@/assets/svgs";
import { Pressable, Text } from "react-native";

type Props = {
  disabled?: boolean;
  selected?: boolean;
  category: CategoryType;
  onPress: () => {};
}

export default function CategoryBadge({
  disabled = false,
  selected = false,
  category,
  onPress,
}: Props) {

  const IconMap = {
    all: undefined,
    activity: ActivityIcon,
    attraction: AttractionIcon,
    cafe: CafeIcon,
    nature: NatureIcon,
    restaurant: RestaurantIcon,
    shopping: ShoppingIcon,
    culture: CultureIcon,
  } satisfies Record<CategoryType, React.ComponentType | undefined>;

  const CategoryTextMap = {
    all: "전체",
    activity: "액티비티",
    attraction: "관광지",
    cafe: "카페",
    nature: "자연",
    restaurant: "식당",
    shopping: "쇼핑",
    culture: "문화",
  }

  const Icon = IconMap[category]
  const text = CategoryTextMap[category]

  return (
    <Pressable
      className={`${selected ? `bg-[#1A1A1A]` : disabled ? `bg-btn-disabled` : `bg-white`} flex-row items-center self-start px-4 py-2.5 h-10 gap-1 rounded-full border border-border`} disabled={disabled}
      onPress={onPress}>
      {Icon && <Icon color={selected ? "white" : disabled ? "#888888" : "#1A1A1A"} />}

      <Text className={`${selected ? `text-white` : disabled ? `text-text-muted` : `text-[#1A1A1A]`} text-body3-tight`}>
        {text}
      </Text>
    </Pressable>
  )
}