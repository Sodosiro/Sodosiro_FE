import { BottomSheetSnapPoints } from "@/constants/BottomSheet";
import { useLocationStore } from "@/stores/useLocationStore";
import { useSearchStore } from "@/stores/useSearchStore";
import type BottomSheet from "@gorhom/bottom-sheet";
import type { RefObject } from "react";
import { useState } from "react";
import { Dimensions, Pressable, View } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import WebView from "react-native-webview";
import CategoryList from "../../common/CategoryList";
import ClearSearchButton from "./ClearSearchButton";
import GpsButton from "./GpsButton";
import PlaceLegend from "./PlaceLegend";
import SearchBar from "./SearchBar";

const BOTTOM_OFFSET = 3.5;

export default function MapOverlay({
  webViewRef,
  animatedPosition,
  bottomSheetRef,
  animatedIndex,
}: {
  webViewRef: RefObject<WebView<unknown> | null>;
  animatedPosition: SharedValue<number>;
  bottomSheetRef: RefObject<BottomSheet | null>;
  animatedIndex: SharedValue<number>;
}) {
  const { keyword, clearResult } = useSearchStore();

  const { isDenied, setIsTracking } = useLocationStore();

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
          <SearchBar keyword={keyword} bottomSheetRef={bottomSheetRef} />
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
        pointerEvents="box-none"
      >
        <PlaceLegend className={`left-5`} />
        {!isDenied && (
          <Pressable
            className={`absolute w-12 h-12 justify-center items-center rounded-full bg-bg right-6 bottom-0 border border-border`}
            onPress={() => {
              setIsTracking(true);
              webViewRef.current?.postMessage(
                JSON.stringify({
                  type: "START_TRACKING",
                }),
              );
            }}
          >
            <GpsButton />
          </Pressable>
        )}
        {keyword && (
          <ClearSearchButton
            className={`absolute self-center left-1/2 -translate-x-1/2 top-6`}
            onPress={() => {
              clearResult();
            }}
          />
        )}
      </Animated.View>
    </View>
  );
}
