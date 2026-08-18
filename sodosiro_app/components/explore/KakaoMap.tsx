import { useEffect, useRef, type RefObject } from "react";
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

  const previousPlacesRef = useRef<PlaceType[]>(allPlaces);

  const {
    isMapReady,
    sendLocation,
    handleMessage,
    updateData,
    sendPlaceUpdates,
  } = useWebView({
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
    const previousPlaces = previousPlacesRef.current;

    if (mode !== "marker" || !previousPlaces || !allPlaces) return;

    const previousPlaceMap = new Map(
      previousPlaces.map((place) => [place.contentId, place]),
    );

    const changedPlaces = allPlaces.filter((place) => {
      const previousPlace = previousPlaceMap.get(place.contentId);

      if (!previousPlace) return false;

      return (
        previousPlace.liked !== place.liked ||
        previousPlace.isPopular !== place.isPopular
      );
    });

    if (changedPlaces.length > 0) {
      sendPlaceUpdates(changedPlaces);
    }

    previousPlacesRef.current = allPlaces;
  }, [allPlaces, mode]);

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
