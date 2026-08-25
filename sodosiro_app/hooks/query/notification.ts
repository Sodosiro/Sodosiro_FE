import { getNotifications, getNotificationsSetting } from "@/api/notification";
import { useAuthStore } from "@/stores/useAuthStore";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export function useNotificationsQuery(size: number = 20) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return useInfiniteQuery({
    queryKey: ["notifications"],

    queryFn: ({ pageParam }) => getNotifications({ cursor: pageParam, size }),
    enabled: isAuthenticated,
    initialPageParam: undefined as number | undefined,

    getNextPageParam: (lastPage) => {
      return lastPage.data.nextCursor ?? undefined;
    },
  });
}

export function useNotificationsSettingQuery() {
  return useQuery({
    queryKey: ["notificationsSetting"],
    queryFn: () => getNotificationsSetting(),
  });
}
