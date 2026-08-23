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
        // TODO
      };

    case "REVIEW_REQUEST":
      return async () => {
        // TODO
      };
  }
}
