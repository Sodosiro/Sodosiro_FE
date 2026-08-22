type NotificationType = {
  id: number;
  type: "NEARBY_LIKED_SPOTS" | "REVIEW_REQUEST" | "DIGGING_POST_LIKE";
  title: string;
  body?: string;
  payload?:
    | {
        diggingId: number;
        likerUserId: number;
      }
    | {
        nearestContentId: number;
        nearbyCount: number;
      };
  isRead: boolean;
  createdAt: Date;
};
