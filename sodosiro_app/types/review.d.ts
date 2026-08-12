type ReviewType = {
  reviewId: number;
  author: {
    userId: number;
    displayName: string;
    profileImageUrl: string;
  };
  rating: number;
  body: string;
  images: { imageUrl: string; displayOrder: number }[] | null;
  createdAt: Date;
  gpsVerified: boolean;
  isMyReview: boolean;
};

interface MyReviewType extends ReviewType {
  spot: {
    contentId: number;
    title: string;
    firstImage: string;
  };
}
