type NoticeType =
  | "NEARBY_LIKED_SPOTS"
  | "REVIEW_REQUEST"
  | "DIGGING_POST_LIKE"
  | "COURSE_CONFIRM_REMINDER";

type NotificationType =
  | {
      id: number;
      type: "DIGGING_POST_LIKE";
      title: string;
      body?: string;
      payload?: {
        diggingId: number;
        likerUserId: number;
      };
      isRead: boolean;
      createdAt?: Date;
    }
  | {
      id: number;
      type: "NEARBY_LIKED_SPOTS";
      title: string;
      body?: string;
      payload?: {
        nearestContentIds: number[];
        nearbyCount: number;
      };
      isRead: boolean;
      createdAt?: Date;
    }
  | {
      id: number;
      type: "REVIEW_REQUEST";
      title: string;
      body?: string;
      payload?: {
        courseId: number;
        pendingSpotCount: number;
      };
      isRead: boolean;
      createdAt?: Date;
    }
  | {
      id: number;
      type: "COURSE_CONFIRM_REMINDER";
      title: string;
      body?: string;
      payload?: {
        courseId: number;
        startDate: number;
      };
      isRead: boolean;
      createdAt?: Date;
    };
