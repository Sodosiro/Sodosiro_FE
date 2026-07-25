type CategoryType =
  | "activity"
  | "attraction"
  | "cafe"
  | "nature"
  | "restaurant"
  | "shopping"
  | "culture";

type PlaceType = {
  title: string;
  lat: number;
  lng: number;
  category: CategoryType;
  favorite: boolean;
  popular: boolean;
};
