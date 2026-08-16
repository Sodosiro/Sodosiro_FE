type FeedType = {
  feedId: number;
  author: {
    userId: number;
    displayName: string;
    profileImageUrl: string | null;
  };
  spot: {
    contentId: number;
    title: string;
  };
  images: {
    imageUrl: string;
    displayOrder: number;
  }[];
  body: string;
  likeCount: number;
  bookmarkCount: number;
  createdAt: Date;
};

type TripHistoryType = {
  historyId: number;
  title: string;
  startDate: Date;
  endDate: Date;
};

type TripHistoryPlaceType = {
  contentId: number;
  title: string;
  category: CategoryNumber;
  firstImage: string | null;
};
