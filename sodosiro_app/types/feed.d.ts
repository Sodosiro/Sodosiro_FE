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
  };
  body: string;
  images: {
    imageUrl: string;
    order: number;
  }[];
  likeCount: number;
  bookmarkCount: number;
  isLikedByMe: boolean;
  isBookmarkedByMe: boolean;
  createdAt: Date;
};

type CourseType = {
  courseId: number;
  displayName: string;
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
