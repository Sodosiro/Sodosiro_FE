type FeedType = {
  diggingId: number;
  courseId: number;
  author: {
    userId: number;
    displayName: string;
    profileImageUrl: string | null;
  };
  spot: {
    contentId: number;
    title: string;
    firstImage: string;
    likeCount: number;
  };
  body: string;
  images: {
    imageUrl: string;
    order: number;
  }[];
  likeCount: number;
  isLikedByMe: boolean;
  isSpotLikedByMe: boolean;
  isGpsVerified: boolean;
  createdAt: Date;
};

type CourseType = {
  courseId: number;
  displayName: string;
  title: string;
  startDate: Date;
  endDate: Date;
  status: TripStatus;
};

type TripSpotType = {
  contentId: number;
  title: string;
  category: CategoryNumber;
  firstImage: string | null;
  alreadyPosted: boolean;
};
