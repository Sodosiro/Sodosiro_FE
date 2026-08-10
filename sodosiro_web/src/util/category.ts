export const CategoryToNumber = {
  restaurant: 1,
  cafe: 2,
  shopping: 3,
  attraction: 4,
  nature: 5,
  activity: 6,
  accommodation: 7,
} satisfies Record<CategoryType, number>;

export const NumberToCategory = {
  1: "restaurant",
  2: "cafe",
  3: "shopping",
  4: "attraction",
  5: "nature",
  6: "activity",
  7: "accommodation",
} satisfies Record<number, CategoryType>;
