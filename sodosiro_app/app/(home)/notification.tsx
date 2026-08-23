import { patchAllNotificationsRead } from "@/api/notification";
import CustomText from "@/components/common/CustomText";
import Header from "@/components/common/Header";
import Spinner from "@/components/common/Spinner";
import NotificationDay from "@/components/home/notification/NotificationDay";
import NotificationItem from "@/components/home/notification/NotificationItem";
import { useNotificationsQuery } from "@/hooks/query/notification";
import { getNotificationPressHandler } from "@/util/notification/notification";
import { invalidateQueries } from "@/util/query/invalidateQueries";
import { FlatList, View } from "react-native";

export default function NotificationScreen() {
  const { data, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useNotificationsQuery();

  const notifications = data?.pages.flatMap((page) => page.data.items) ?? [];
  const unreadCount = data?.pages[0].data.unreadCount ?? 0;

  const handleAllRead = async () => {
    await patchAllNotificationsRead();
    invalidateQueries([["notifications"]]);
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Header
        title="알림"
        rightComponent={
          unreadCount > 0 ? (
            <CustomText
              font="body2"
              className="text-primary-dark"
              onPress={handleAllRead}
            >
              모두 읽음으로 표시
            </CustomText>
          ) : null
        }
      />

      {isPending ? (
        <View className={`flex-1 justify-center items-center`}>
          <Spinner />
        </View>
      ) : notifications.length > 0 ? (
        <FlatList
          data={notifications}
          keyExtractor={(item) => String(item.id)}
          contentContainerClassName="px-5"
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingNextPage ? (
              <View className="py-4 items-center">
                <Spinner />
              </View>
            ) : null
          }
          ListHeaderComponent={
            unreadCount > 0 ? (
              <CustomText font="body3" className="text-text-muted">
                읽지 않음 {unreadCount}
              </CustomText>
            ) : null
          }
          renderItem={({ item, index }) => {
            const previous = notifications[index - 1];

            const isDifferentDay =
              !previous ||
              new Date(item.createdAt).toDateString() !==
                new Date(previous.createdAt).toDateString();

            const handlePress = getNotificationPressHandler(
              item.id,
              item.type,
              item.payload,
            );

            return (
              <View>
                {isDifferentDay && (
                  <NotificationDay date={new Date(item.createdAt)} />
                )}

                {!isDifferentDay && <View className="w-full h-px bg-border" />}

                <NotificationItem notification={item} onPress={handlePress} />
              </View>
            );
          }}
        />
      ) : (
        <View className="flex-1 items-center justify-center pb-10">
          <CustomText font="body1" className="text-text-muted">
            알림이 없어요.
          </CustomText>
        </View>
      )}
    </View>
  );
}
