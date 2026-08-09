type CategoryType =
  | "all"
  | "activity"
  | "attraction"
  | "cafe"
  | "nature"
  | "restaurant"
  | "shopping"
  | "accommodation";

type CategoryTypeWithoutAll = Exclude<CategoryType, "all">;

type PlaceType = {
  id: number;
  desc?: string;
  rate?: number;
  reviewCount?: number;
  favorite?: boolean;
  popular?: boolean;
  position: number;
  title: string;
  category: CategoryTypeWithoutAll;
  completed: boolean;
  latlng: {
    lat: number;
    lng: number;
  };
  imageSource?: string;
};

type ReviewType = {
  id: number;
  nickname: string;
  imageSource: string | null;
  rate: number;
  comment: string;
  createdAt: Date;
};

type PopularPlaceType = {
  id: number;
  imageSource: any;
  title: string;
  region: string;
  rate: number;
  reviewCount: number;
  desc: string;
  keywords: string[];
};
