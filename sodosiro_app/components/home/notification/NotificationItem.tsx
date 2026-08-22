import { HeartNoticeIcon, PinIcon, ReviewNoticeIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import { formatTimeAgo } from "@/util/time/time";
import { Pressable, View } from "react-native";

export default function NotificationItem({
  notification,
  isFloating,
  onPress,
}: {
  notification: NotificationType;
  isFloating?: boolean;
  onPress?: () => void;
}) {
  const Icon =
    notification.type === "DIGGING_POST_LIKE" ? (
      <HeartNoticeIcon color={"#7E9432"} width={20} />
    ) : notification.type === "NEARBY_LIKED_SPOTS" ? (
      <PinIcon color={"#7E9432"} width={20} />
    ) : (
      <ReviewNoticeIcon color={"#7E9432"} width={20} />
    );

  return (
    <Pressable
      className={`${isFloating && `px-4`} py-4 flex-row gap-3 justify-between items-start`}
      onPress={onPress ? onPress : undefined}
    >
      <View
        className={`w-11 h-11 items-center justify-center bg-primary-light rounded-full`}
      >
        {Icon}
      </View>
      <View className={`flex-1 gap-1`}>
        <CustomText font="title">{notification.title}</CustomText>
        {notification.body && (
          <CustomText font="body3" className={`text-text-muted`}>
            {notification.body}
          </CustomText>
        )}
        {notification.createdAt && (
          <CustomText font="body3 review" className={`text-text-muted`}>
            {formatTimeAgo(new Date(notification.createdAt), true)}
          </CustomText>
        )}
      </View>
      {!notification.isRead && !isFloating && (
        <View className={`w-2.5 h-2.5 rounded-full bg-primary-dark`} />
      )}
    </Pressable>
  );
}
