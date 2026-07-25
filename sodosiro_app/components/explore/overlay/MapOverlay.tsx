import { BottomSheetSnapPoints } from "@/constants/BottomSheet";
import type BottomSheet from "@gorhom/bottom-sheet";
import { router, useLocalSearchParams } from "expo-router";
import type { RefObject } from "react";
import { useState } from "react";
import { Dimensions, View } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import CategoryList from "../../common/CategoryList";
import ClearSearchButton from "./ClearSearchButton";
import PlaceLegend from "./PlaceLegend";
import SearchBar from "./SearchBar";

const BOTTOM_OFFSET = 3.5;

export default function MapOverlay({
  animatedPosition,
  bottomSheetRef,
  animatedIndex,
}: {
  animatedPosition: SharedValue<number>;
  bottomSheetRef: RefObject<BottomSheet | null>;
  animatedIndex: SharedValue<number>;
}) {
  const { keyword: param } = useLocalSearchParams<{
    keyword?: string;
  }>();

  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");

  const screenHeight = Dimensions.get("window").height;

  const animatedStyle = useAnimatedStyle(() => {
    if (animatedIndex.value === -1) {
      return {
        bottom: -BOTTOM_OFFSET,
      };
    }

    const sheetHeight = screenHeight - animatedPosition.value - 40;

    return {
      bottom: Math.min(
        sheetHeight,
        (BottomSheetSnapPoints[1] as number) - BOTTOM_OFFSET,
      ),
    };
  });

  return (
    <View className={`flex-1`}>
      <View>
        <View className={`px-5 py-3`}>
          <SearchBar keyword={param} bottomSheetRef={bottomSheetRef} />
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
            onPress={() => {
              bottomSheetRef.current?.forceClose();
              router.setParams({ keyword: undefined });
            }}
          />
        )}
      </Animated.View>
    </View>
  );
}
