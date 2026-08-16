export const Categories: CategoryType[] = [
  "all",
  "activity",
  "attraction",
  "cafe",
  "nature",
  "restaurant",
  "shopping",
  "accommodation",
];

export const DEFAULT_IMAGES: Record<CategoryTypeWithoutAll, number> = {
  activity: require("@/assets/images/category/activity.png"),
  attraction: require("@/assets/images/category/attraction.png"),
  cafe: require("@/assets/images/category/cafe.png"),
  nature: require("@/assets/images/category/nature.png"),
  restaurant: require("@/assets/images/category/restaurant.png"),
  shopping: require("@/assets/images/category/shopping.png"),
  accommodation: require("@/assets/images/category/accommodation.png"),
};
