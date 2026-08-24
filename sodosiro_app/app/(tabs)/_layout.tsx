import BottomBar from "@/components/bottombar/BottomBar";
import { usePlacesQuery } from "@/hooks/query/usePlacesQuery";
import { useExploreStore } from "@/stores/useExploreStore";
import { Tabs } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from "react-native";

export default function TabLayout() {
  const setAllPlaces = useExploreStore((state) => state.setAllPlaces);
  const setIsPlacesPending = useExploreStore(
    (state) => state.setIsPlacesPending,
  );

  const { data } = usePlacesQuery("all", undefined, 10000);

  useEffect(() => {
    const places = data?.data.items;

    if (places) {
      setAllPlaces(places);
    }
    setIsPlacesPending(false);
  }, [data]);

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
