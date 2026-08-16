import BottomBar from "@/components/bottombar/BottomBar";
import { Tabs } from "expo-router";
import { StatusBar } from "react-native";

export default function TabLayout() {
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
