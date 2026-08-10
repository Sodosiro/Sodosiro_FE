type CategoryType =
  | "activity"
  | "attraction"
  | "cafe"
  | "nature"
  | "restaurant"
  | "shopping"
  | "accommodation";

type PlaceType = {
  contentId: number;
  title: string;
  mapY: number;
  mapX: number;
  category: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  liked: boolean;
  isPopular: boolean;
};
