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
        // console.log("🔔 알림 받음:", JSON.stringify(notification, null, 2));

        const content = notification.request.content;
        const id = content?.data?.id;
        const type = (content?.data?.type as NoticeType) ?? undefined;
        const payload = content?.data?.payload ?? undefined;

        // 추후 타입 비교하면서 수정 필요
        const onPress = getNotificationPressHandler(
          id as number,
          type,
          payload,
        );

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
