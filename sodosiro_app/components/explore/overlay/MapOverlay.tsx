import { useExploreStore } from "@/stores/useExploreStore";
import { useLocationStore } from "@/stores/useLocationStore";
import * as Location from "expo-location";
import { type RefObject } from "react";
import { Dimensions, Linking, Pressable, View } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import WebView from "react-native-webview";
import { useShallow } from "zustand/react/shallow";
import CategoryList from "../../common/category/CategoryList";
import ClearSearchButton from "./ClearSearchButton";
import GpsButton from "./GpsButton";
import PlaceLegend from "./PlaceLegend";
import SearchBar from "./SearchBar";
import SodosiButton from "./SodosiButton";

export default function MapOverlay({
  webViewRef,
  animatedPosition,
  animatedIndex,
}: {
  webViewRef: RefObject<WebView<unknown> | null>;
  animatedPosition: SharedValue<number>;
  animatedIndex: SharedValue<number>;
}) {
  const {
    keyword,
    clearResult,
    selectedCategory,
    setSelectedCategory,
    selectedPlaceId,
    setSelectedPlaceId,
  } = useExploreStore(
    useShallow((state) => ({
      keyword: state.keyword,
      clearResult: state.clearSearchResult,
      selectedCategory: state.selectedCategory,
      setSelectedCategory: state.setSelectedCategory,
      selectedPlaceId: state.selectedPlaceId,
      setSelectedPlaceId: state.setSelectedPlaceId,
    })),
  );

  const insets = useSafeAreaInsets();

  const setIsDenied = useLocationStore((state) => state.setIsDenied);
  const setIsTracking = useLocationStore((state) => state.setIsTracking);

  const screenHeight = Dimensions.get("window").height;

  const animatedStyle = useAnimatedStyle(() => {
    const sheetHeight = screenHeight - insets.bottom - animatedPosition.value;

    return {
      bottom: Math.min(
        Math.max(sheetHeight - 64, 16),
        selectedPlaceId ? 348 : 238,
      ),
    };
  });

  const handleTrackingButton = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Linking.openSettings();
      return;
    }

    setIsDenied(false);
    setIsTracking(true);

    webViewRef.current?.postMessage(
      JSON.stringify({
        type: "START_TRACKING",
      }),
    );

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    webViewRef.current?.postMessage(
      JSON.stringify({
        type: "UPDATE_LOCATION",
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }),
    );
  };

  return (
    <View className={`flex-1`}>
      <View>
        <View className={`px-5 py-3`}>
          <SearchBar keyword={keyword} />
        </View>
        <View className={`flex-row pl-5`}>
          <SodosiButton />
          <View className={`h-full w-px bg-border ml-1.25`} />
          <CategoryList
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            paddingLeft={5}
            paddingRight={20}
            onCategoryPress={() => setSelectedPlaceId(null)}
          />
        </View>
      </View>

      <Animated.View
        className={`w-screen flex-row absolute`}
        style={animatedStyle}
        pointerEvents="box-none"
      >
        <PlaceLegend className={`left-5`} />

        <Pressable
          className={`absolute w-12 h-12 justify-center items-center rounded-full bg-bg right-5 bottom-0 border border-border`}
          onPress={handleTrackingButton}
        >
          <GpsButton />
        </Pressable>

        {keyword && !selectedPlaceId && (
          <ClearSearchButton
            className={`absolute self-center left-1/2 -translate-x-1/2 bottom-0`}
            onPress={() => {
              clearResult();
              setSelectedPlaceId(null);
            }}
          />
        )}
      </Animated.View>
    </View>
  );
}
