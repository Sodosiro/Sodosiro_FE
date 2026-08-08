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
  images: { imageUrl: string; displayOrder: number }[] | null;
  rate: number;
  comment: string;
  createdAt: Date;
  gpsVerified: boolean;
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

type PlaceDetailType = {
  contentId: number;
  title: string;
  category: CategoryType;
  addr1: string;
  lat: number;
  lng: number;
  overview: string;
  heart: boolean;
  images: string[];
  reason: string;
  rate: number;
  reviewCount: number;
  info: {
    opening: string;
    phoneNumber: string;
    parking: boolean;
    pet: boolean;
  };
  reviews: {
    id: number;
    nickname: string;
    images: { imageUrl: string; displayOrder: number }[] | null;
    rate: number;
    comment: string;
    createdAt: Date;
    gpsVerified: boolean;
  }[];
  recommendPlaces: {
    id: number;
    imageSource: any;
    title: string;
    desc: string;
  }[];
};
