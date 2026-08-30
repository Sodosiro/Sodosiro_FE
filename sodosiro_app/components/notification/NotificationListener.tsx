import { getNotificationPressHandler } from "@/util/notification/notification";
import { invalidateQueries } from "@/util/query/invalidateQueries";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { useNotification } from "./NotificationProvider";

export default function NotificationListener() {
  const { showNotification } = useNotification();

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        const content = notification.request.content;
        const type = (content?.data?.type as NoticeType) ?? undefined;
        const payload = content?.data ?? undefined;

        const onPress = getNotificationPressHandler(null, type, payload);

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
