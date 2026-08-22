type NoticeType = "NEARBY_LIKED_SPOTS" | "REVIEW_REQUEST" | "DIGGING_POST_LIKE";

type NotificationType = {
  id: number;
  type: NoticeType;
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
  createdAt?: Date;
};
