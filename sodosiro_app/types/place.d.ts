type CategoryType =
  | "all"
  | "activity"
  | "attraction"
  | "cafe"
  | "nature"
  | "restaurant"
  | "shopping"
  | "culture";

type CategoryTypeWithoutAll = Exclude<CategoryType, "all">;

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
  imageSource: string | null;
  rate: number;
  comment: string;
  createdAt: Date;
};
