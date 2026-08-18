import AnimatedTabIcon from "./AnimatedTabIcon";
import AnimatedTabLabel from "./AnimatedTabLabel";

import ExploreIcon from "../icon/bottomBar/ExploreIcon";
import FeedIcon from "../icon/bottomBar/FeedIcon";
import HomeIcon from "../icon/bottomBar/HomeIcon";
import MyIcon from "../icon/bottomBar/MyIcon";
import TripIcon from "../icon/bottomBar/TripIcon";

import { BottomTabBarProps } from "expo-router/build/react-navigation/bottom-tabs";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ICONS = {
  index: HomeIcon,
  explore: ExploreIcon,
  trip: TripIcon,
  feed: FeedIcon,
  mypage: MyIcon,
} as const;

const TITLES = {
  index: "홈",
  explore: "탐색",
  trip: "내 여행",
  feed: "피드",
  mypage: "내 정보",
} as const;

export default function BottomBar({ state, navigation }: BottomTabBarProps) {
  return (
    <SafeAreaView edges={["bottom"]} style={{ backgroundColor: "white" }}>
      <View className="flex-row border-t border-border bg-bg py-4 px-2">
        {state.routes.map((route, index) => {
          const focused = state.index === index;

          const Icon = ICONS[route.name as keyof typeof ICONS];
          const title = TITLES[route.name as keyof typeof TITLES];

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              className="flex-1 items-center justify-center gap-2"
            >
              <AnimatedTabIcon focused={focused} Icon={Icon} />

              <AnimatedTabLabel focused={focused} title={title} />
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
