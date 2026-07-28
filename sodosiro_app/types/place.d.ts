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

type ReviewType = {
  id: number;
  nickname: string;
  imageSources: string[];
  rate: number;
  comment: string;
  createdAt: Date;
};
