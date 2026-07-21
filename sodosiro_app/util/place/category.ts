import {
  ActivityIcon,
  AttractionIcon,
  CafeIcon,
  CultureIcon,
  NatureIcon,
  RestaurantIcon,
  ShoppingIcon,
} from "@/assets/svgs";

export const CategoryIconMap = {
  all: undefined,
  activity: ActivityIcon,
  attraction: AttractionIcon,
  cafe: CafeIcon,
  nature: NatureIcon,
  restaurant: RestaurantIcon,
  shopping: ShoppingIcon,
  culture: CultureIcon,
} satisfies Record<CategoryType, React.ComponentType | undefined>;

export const CategoryMap = {
  all: "전체",
  activity: "액티비티",
  attraction: "관광지",
  cafe: "카페",
  nature: "자연",
  restaurant: "식당",
  shopping: "쇼핑",
  culture: "문화",
};
