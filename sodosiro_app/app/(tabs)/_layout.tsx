import BottomBar from "@/components/bottombar/BottomBar";
import { useNotificationsQuery } from "@/hooks/query/notification";
import { usePlacesQuery } from "@/hooks/query/place";
import { useLocationTracking } from "@/hooks/useLocationTracking";
import { useExploreStore } from "@/stores/useExploreStore";
import { useNotificationStore } from "@/stores/useNotificationStore";
import { Tabs } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from "react-native";

export default function TabLayout() {
  const setAllPlaces = useExploreStore((state) => state.setAllPlaces);
  const setIsPlacesPending = useExploreStore(
    (state) => state.setIsPlacesPending,
  );
  const { setHasUnreadNotification } = useNotificationStore();

  const { data: notificationData } = useNotificationsQuery();
  const { data: allPlaceData } = usePlacesQuery("all", undefined, 10000);

  useLocationTracking();

  useEffect(() => {
    const places = allPlaceData?.data.items;

    if (places) {
      setAllPlaces(places);
    }
    setIsPlacesPending(false);
  }, [allPlaceData]);

  useEffect(() => {
    const hasUnread = (notificationData?.pages[0].data.unreadCount ?? 0) > 0;
    setHasUnreadNotification(hasUnread);
  }, [notificationData]);

  return (
    <>
      <StatusBar barStyle={"dark-content"} />
      <Tabs
        tabBar={(props) => <BottomBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="explore" />
        <Tabs.Screen name="trip" />
        <Tabs.Screen name="feed" />
        <Tabs.Screen name="mypage" />
      </Tabs>
    </>
  );
}
