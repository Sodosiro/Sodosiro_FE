import {
  ActivityIcon,
  AttractionIcon,
  CafeIcon,
  CultureIcon,
  NatureIcon,
  RestaurantIcon,
  ShoppingIcon,
} from "@/assets/svgs";
import Animated from "react-native-reanimated";

export const CategoryIconMap = {
  all: undefined,
  activity: Animated.createAnimatedComponent(ActivityIcon),
  attraction: Animated.createAnimatedComponent(AttractionIcon),
  cafe: Animated.createAnimatedComponent(CafeIcon),
  nature: Animated.createAnimatedComponent(NatureIcon),
  restaurant: Animated.createAnimatedComponent(RestaurantIcon),
  shopping: Animated.createAnimatedComponent(ShoppingIcon),
  culture: Animated.createAnimatedComponent(CultureIcon),
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
