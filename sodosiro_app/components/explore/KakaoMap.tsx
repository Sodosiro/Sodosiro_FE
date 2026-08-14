import { useEffect, type RefObject } from "react";
import type { SharedValue } from "react-native-reanimated";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { WebView } from "react-native-webview";

import { useLocation } from "@/hooks/useLocation";
import { useWebView } from "@/hooks/useWebView";
import { useExploreStore } from "@/stores/useExploreStore";
import { useLocationStore } from "@/stores/useLocationStore";
import { useWebViewStore } from "@/stores/useWebViewStore";
import { NumberToCategory } from "@/util/place/category";

export default function KakaoMap({
  webViewRef,
  mode,
  animatedPosition,
}: {
  webViewRef: RefObject<WebView<unknown> | null>;
  mode: "marker" | "navigation";
  animatedPosition: SharedValue<number>;
}) {
  const { isLoading, setIsLoading } = useWebViewStore();
  const searchResult = useExploreStore((state) => state.searchResult);
  const allPlaces = useExploreStore((state) => state.allPlaces);
  const selectedCategory = useExploreStore((state) => state.selectedCategory);
  const location = useLocationStore((state) => state.location);
  const isDenied = useLocationStore((state) => state.isDenied);

  const { isMapReady, sendLocation, handleMessage, updateData } = useWebView({
    webViewRef,
    mode,
    setIsLoading,
    initialData: allPlaces,
  });

  useLocation(sendLocation, isMapReady);

  const animatedStyle = useAnimatedStyle(() => ({
    height: animatedPosition.value + 8,
  }));

  useEffect(() => {
    if (!location) return;
    sendLocation(location, isDenied);
  }, [location]);

  useEffect(() => {
    if (mode !== "marker") return;

    const data = searchResult ?? (allPlaces as PlaceType[]);

    const filtered =
      selectedCategory === "all"
        ? data
        : data.filter(
            (place: PlaceType) =>
              NumberToCategory[place.category] === selectedCategory,
          );
    updateData(filtered, !!searchResult);
  }, [searchResult, selectedCategory]);

  return (
    <Animated.View
      className={`w-screen absolute ${isLoading ? "opacity-0" : ""}`}
      style={animatedStyle}
    >
      <WebView
        ref={webViewRef}
        source={{
          uri: process.env.EXPO_PUBLIC_WEBVIEW_URI as string,
        }}
        style={{ flex: 1 }}
        onMessage={handleMessage}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
      />
    </Animated.View>
  );
}
