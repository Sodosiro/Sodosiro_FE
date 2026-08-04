import AccommodationIcon from "@/components/icon/category/AccommodationIcon";
import ActivityIcon from "@/components/icon/category/ActivityIcon";
import AttractionIcon from "@/components/icon/category/AttractionIcon";
import CafeIcon from "@/components/icon/category/CafeIcon";
import NatureIcon from "@/components/icon/category/NatureIcon";
import RestaurantIcon from "@/components/icon/category/RestaurantIcon";
import ShoppingIcon from "@/components/icon/category/ShoppingIcon";

export const CategoryIconMap = {
  all: undefined,
  activity: ActivityIcon,
  attraction: AttractionIcon,
  cafe: CafeIcon,
  nature: NatureIcon,
  restaurant: RestaurantIcon,
  shopping: ShoppingIcon,
  accommodation: AccommodationIcon,
} satisfies Record<
  CategoryType,
  React.ComponentType<AnimatedIconProps> | undefined
>;

export const CategoryMap = {
  all: "전체",
  activity: "액티비티",
  attraction: "관광지",
  cafe: "카페",
  nature: "자연",
  restaurant: "식당",
  shopping: "쇼핑",
  accommodation: "숙박",
};
