import { patchNotificationRead } from "@/api/notification";
import { invalidateQueries } from "@/util/query/invalidateQueries";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import { useEffect } from "react";
import { useNotification } from "./NotificationProvider";

export default function NotificationListener() {
  const { showNotification } = useNotification();

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        // console.log("🔔 알림 받음:", JSON.stringify(notification, null, 2));

        const content = notification.request.content;
        const type = (content?.data?.type as NoticeType) ?? undefined;

        const onPress =
          type === "DIGGING_POST_LIKE"
            ? async () => {
                router.push({
                  pathname: "/feed/feedDetail",
                  params: { feedId: String(content?.data?.diggingId) },
                });

                await patchNotificationRead(
                  Number(content?.data?.notificationId),
                );
                invalidateQueries([["notifications"]]);
              }
            : type === "NEARBY_LIKED_SPOTS"
              ? () => {}
              : () => {};

        showNotification({
          title: content.title ?? undefined,
          body: content.body ?? undefined,
          type: type,
          onPress: onPress,
        });
        invalidateQueries([["notifications"]]);
      },
    );

    return () => {
      subscription.remove();
    };
  }, [showNotification]);

  return null;
}
