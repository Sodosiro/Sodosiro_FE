import { patchNotificationRead } from "@/api/notification";
import { router } from "expo-router";
import { invalidateQueries } from "../query/invalidateQueries";

export function getNotificationPressHandler(
  id: number,
  type: NoticeType,
  payload: any,
): () => Promise<void> {
  switch (type) {
    case "DIGGING_POST_LIKE":
      return async () => {
        router.push({
          pathname: "/feed/feedDetail",
          params: {
            feedId: String(payload.diggingId),
          },
        });

        await patchNotificationRead(id);
        invalidateQueries([["notifications"]]);
      };

    case "NEARBY_LIKED_SPOTS":
      return async () => {
        router.push({
          pathname: "/explore/nearbyLiked",
          params: {
            placeIds: payload.nearbyContentIds.map(String),
          },
        });

        await patchNotificationRead(id);
        invalidateQueries([["notifications"]]);
      };

    case "REVIEW_REQUEST":
      return async () => {
        router.push({
          pathname: "/trip/timeline",
          params: {
            courseId: String(payload.courseId),
          },
        });

        await patchNotificationRead(id);
        invalidateQueries([["notifications"]]);
      };

    case "ALL":
      return async () => {};
  }
}
