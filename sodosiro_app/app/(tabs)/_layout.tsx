import {
  BingoIcon,
  ExploreIcon,
  HomeIcon,
  MyIcon,
  TripIcon,
} from "@/assets/bottombar";
import AnimatedTabIcon from "@/components/bottombar/AnimatedTabIcon";
import AnimatedTabLabel from "@/components/bottombar/AnimatedTabLabel";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelPosition: "below-icon",
        tabBarStyle: {
          height: 88,
        },
        tabBarLabelStyle: {
          fontFamily: "Pretendard",
          fontSize: 11,
          fontWeight: "700",
        },
        tabBarIconStyle: {
          marginBottom: 8,
          marginTop: 10,
        },
        tabBarActiveTintColor: "#1A1A1A",
        tabBarInactiveTintColor: "#888888",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: ({ focused }: { focused: boolean }) => (
            <AnimatedTabLabel focused={focused} title="홈" />
          ),
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <AnimatedTabIcon focused={focused} Icon={HomeIcon} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarLabel: ({ focused }: { focused: boolean }) => (
            <AnimatedTabLabel focused={focused} title="탐색" />
          ),
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <AnimatedTabIcon focused={focused} Icon={ExploreIcon} />
          ),
        }}
      />
      <Tabs.Screen
        name="trip"
        options={{
          tabBarLabel: ({ focused }: { focused: boolean }) => (
            <AnimatedTabLabel focused={focused} title="내 여행" />
          ),
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <AnimatedTabIcon focused={focused} Icon={TripIcon} />
          ),
        }}
      />
      <Tabs.Screen
        name="bingo"
        options={{
          tabBarLabel: ({ focused }: { focused: boolean }) => (
            <AnimatedTabLabel focused={focused} title="빙고" />
          ),
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <AnimatedTabIcon focused={focused} Icon={BingoIcon} />
          ),
        }}
      />
      <Tabs.Screen
        name="mypage"
        options={{
          tabBarLabel: ({ focused }: { focused: boolean }) => (
            <AnimatedTabLabel focused={focused} title="내 정보" />
          ),
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <AnimatedTabIcon focused={focused} Icon={MyIcon} />
          ),
        }}
      />
    </Tabs>
  );
}
