type CategoryType =
  | "all"
  | "activity"
  | "attraction"
  | "cafe"
  | "nature"
  | "restaurant"
  | "shopping"
  | "culture";

type PlaceType = {
  id: number;
  title?: string;
  imageSource?: any;
  desc?: string;
  rate?: number;
  reviewCount?: number;
  category: CategoryType;
  lat?: number;
  lng?: number;
  favorite?: boolean;
  popular?: boolean;
};
