import { patchNotificationRead } from "@/api/notification";
import { COURSE_STATE } from "@/constants/Trip";
import { router } from "expo-router";
import { invalidateQueries } from "../query/invalidateQueries";

export function getNotificationPressHandler(
  id: number | null,
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

        if (id) {
          await patchNotificationRead(id);
          invalidateQueries([["notifications"]]);
        }
      };

    case "NEARBY_LIKED_SPOTS":
      return async () => {
        router.push({
          pathname: "/explore/nearbyLiked",
          params: {
            placeIds: payload.nearbyContentIds.map(String),
          },
        });

        if (id) {
          await patchNotificationRead(id);
          invalidateQueries([["notifications"]]);
        }
      };

    case "REVIEW_REQUEST":
      return async () => {
        router.push({
          pathname: "/trip/timeline",
          params: {
            courseId: String(payload.courseId),
            courseStatus: COURSE_STATE.FINISHED,
          },
        });

        if (id) {
          await patchNotificationRead(id);
          invalidateQueries([["notifications"]]);
        }
      };

    case "COURSE_CONFIRM_REMINDER":
      return async () => {
        router.push({
          pathname: "/trip/timeline",
          params: {
            courseId: String(payload.courseId),
            courseStatus: COURSE_STATE.TEMP,
          },
        });

        if (id) {
          await patchNotificationRead(id);
          invalidateQueries([["notifications"]]);
        }
      };
  }
}
