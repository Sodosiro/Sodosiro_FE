import { useState } from "react";
import type { LayoutChangeEvent } from "react-native";
import { View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import CustomText from "../common/CustomText";

type TabType = "예정" | "진행중" | "완료";

type TripTabBarProps = {
  currentTab: TabType;
  moveToSection: (tab: TabType) => void;
  counts?: {
    upcoming: number;
    completed: number;
  };
};

export default function TripTabBar({
  currentTab,
  moveToSection,
  counts = {
    upcoming: 0,
    completed: 0,
  },
}: TripTabBarProps) {
  const tabs: TabType[] = ["예정", "진행중", "완료"];

  const [tabWidth, setTabWidth] = useState(0);
  const currentIndex = tabs.indexOf(currentTab);

  // 애니메이션을 부드럽게 제어하기 위해 SharedValue 활용 및 초기화 플래그 관리
  const isInitialized = useSharedValue(false);

  const indicatorStyle = useAnimatedStyle(() => {
    const targetX = currentIndex * tabWidth;

    // 초기 레이아웃 측정 전이거나 첫 위치 설정일 때는 애니메이션 없이 즉시 이동
    if (!isInitialized.value || tabWidth === 0) {
      if (tabWidth > 0) isInitialized.value = true;
      return {
        transform: [{ translateX: targetX }],
      };
    }

    // 이후 탭 변경 시에만 애니메이션 적용
    return {
      transform: [
        {
          translateX: withTiming(targetX, {
            duration: 200,
          }),
        },
      ],
    };
  });

  const handleTabLayout = (event: LayoutChangeEvent) => {
    const width = event.nativeEvent.layout.width / tabs.length;
    setTabWidth(width);
  };

  const getTabLabel = (tab: TabType) => {
    if (tab === "예정") {
      return `${tab} ${counts.upcoming}`;
    }

    if (tab === "완료") {
      return `${tab} ${counts.completed}`;
    }

    return tab;
  };

  return (
    <View className="flex-row w-full border-b border-border bg-bg" onLayout={handleTabLayout}>
      {tabs.map((tab) => (
        <CustomText
          key={tab}
          className={`flex-1 text-center py-4 ${currentTab === tab ? "" : "text-text-muted"}`}
          font={currentTab === tab ? "body2 tight" : "body3 tight"}
          onPress={() => moveToSection(tab)}
        >
          {getTabLabel(tab)}
        </CustomText>
      ))}

      {/* 레이아웃 잡히기 전(tabWidth가 0일 때) flickering 방지를 위해 opacity 추가 */}
      <Animated.View
        className="absolute bottom-0 left-0 h-0.75 bg-text-primary"
        style={[
          {
            width: tabWidth,
            opacity: tabWidth === 0 ? 0 : 1,
          },
          indicatorStyle,
        ]}
      />
    </View>
  );
}
