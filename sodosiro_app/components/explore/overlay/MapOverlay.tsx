import { BottomSheetSnapPoints } from "@/constants/BottomSheet";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Dimensions, View } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import CategoryList from "../../common/CategoryList";
import ClearSearchButton from "./ClearSearchButton";
import PlaceLegend from "./PlaceLegend";
import SearchBar from "./SearchBar";

export default function MapOverlay({
  animatedPosition,
}: {
  animatedPosition: SharedValue<number>;
}) {
  const { keyword: param } = useLocalSearchParams<{
    keyword?: string;
  }>();

  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");

  const screenHeight = Dimensions.get("window").height;

  const animatedStyle = useAnimatedStyle(() => {
    const sheetHeight = screenHeight - animatedPosition.value;

    return {
      bottom: Math.min(sheetHeight - 40, BottomSheetSnapPoints[1] as number),
    };
  });

  return (
    <View className={`flex-1`}>
      <View>
        <View className={`px-5 py-3`}>
          <SearchBar keyword={param} />
        </View>
        <CategoryList
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          paddingHorizontal={20}
        />
      </View>

      <Animated.View
        className={`w-screen flex-row absolute`}
        style={animatedStyle}
      >
        <PlaceLegend className={`left-5`} />
        {param && (
          <ClearSearchButton
            className={`absolute self-center left-1/2 -translate-x-1/2 top-6`}
            onPress={() => router.push("/(tabs)/explore")}
          />
        )}
      </Animated.View>
    </View>
  );
}
