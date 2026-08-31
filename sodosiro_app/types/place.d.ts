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

type CategoryNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7;

type PlaceType = {
  contentId: number;
  title: string;
  category: CategoryNumber;
  addr1: string;
  region: string;
  smallTown: boolean;
  overview: string;
  restdate: string;
  firstImage: string;
  mapX: number;
  mapY: number;
  likeCount: number;
  avgRating: number;
  reviewCount: number;
  liked: boolean;
  isPopular: boolean;
  popularity: {
    score: number;
    categoryRank: number;
    rankTag: string;
    calculatedAt: Date;
  } | null;
  tags: string[] | null;
};

type PlacePrev = {
  contentId: number;
  title: string;
  category: CategoryNumber;
  addr1: string;
  firstImage: string;
  likeCount: number;
  likedAt: Date;
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
  mapY: number;
  mapX: number;
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

type TimelinePlaceType = {
  desc: string;
  rate: number;
  completed: boolean;
} & PlaceType;
