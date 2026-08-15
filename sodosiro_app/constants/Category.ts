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
  activity: require("@/assets/images/default/activity.png"),
  attraction: require("@/assets/images/default/attraction.png"),
  cafe: require("@/assets/images/default/cafe.png"),
  nature: require("@/assets/images/default/nature.png"),
  restaurant: require("@/assets/images/default/restaurant.png"),
  shopping: require("@/assets/images/default/shopping.png"),
  accommodation: require("@/assets/images/default/accommodation.png"),
};
