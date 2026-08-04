type CategoryType =
  | "activity"
  | "attraction"
  | "cafe"
  | "nature"
  | "restaurant"
  | "shopping"
  | "accommodation";

type PlaceType = {
  id: number;
  title: string;
  lat: number;
  lng: number;
  category: CategoryType;
  favorite: boolean;
  popular: boolean;
};
