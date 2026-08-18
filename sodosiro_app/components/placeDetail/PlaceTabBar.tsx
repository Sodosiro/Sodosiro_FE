import { useState } from "react";
import type { LayoutChangeEvent } from "react-native";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import CustomText from "../common/CustomText";

type TabType = "이용 정보" | "리뷰" | "함께 추천";

export default function PlaceTabBar({
  currentTab,
  moveToSection,
}: {
  currentTab: TabType;
  moveToSection: (tab: TabType) => void;
}) {
  const tabs: TabType[] = ["이용 정보", "리뷰", "함께 추천"];
  const [tabWidth, setTabWidth] = useState(0);
  const currentIndex = tabs.indexOf(currentTab);
  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(currentIndex * tabWidth, {
          duration: 200,
        }),
      },
    ],
  }));

  const handleTabLayout = (event: LayoutChangeEvent) => {
    setTabWidth(event.nativeEvent.layout.width / tabs.length);
  };

  return (
    <View
      className="flex-row w-full border-b border-border bg-bg"
      onLayout={handleTabLayout}
    >
      {tabs.map((tab) => (
        <CustomText
          key={tab}
          className={`flex-1 text-center py-4 ${
            currentTab === tab ? "" : "text-text-muted"
          }`}
          font={currentTab === tab ? "body2 tight" : "body3 tight"}
          onPress={() => {}}
          onPressOut={() => {
            moveToSection(tab);
          }}
        >
          {tab}
        </CustomText>
      ))}

      <Animated.View
        className="absolute bottom-0 left-0 h-0.75 bg-text-primary"
        style={[
          {
            width: tabWidth,
          },
          indicatorStyle,
        ]}
      />
    </View>
  );
}
