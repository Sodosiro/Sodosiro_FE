import {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  type RefObject,
} from "react";
import type { SharedValue } from "react-native-reanimated";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { WebView } from "react-native-webview";

import { useWebView } from "@/hooks/useWebView";
import { useExploreStore } from "@/stores/useExploreStore";
import { NumberToCategory } from "@/util/place/category";

export default function KakaoMap({
  webViewRef,
  mode,
  animatedPosition,
  initialData,
  routeData,
  setIsLoading,
}: {
  webViewRef: RefObject<WebView<unknown> | null>;
  mode: "marker" | "navigation";
  animatedPosition?: SharedValue<number>;
  initialData?: any;
  routeData?: any;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}) {
  const searchResult = useExploreStore((state) => state.searchResult);
  const allPlaces = useExploreStore((state) => state.allPlaces);
  const onlySmallTown = useExploreStore((state) => state.onlySmallTown);
  const selectedCategory = useExploreStore((state) => state.selectedCategory);

  const previousPlacesRef = useRef<PlaceType[]>(allPlaces);

  const {
    handleMessage,
    updateData,
    sendPlaceUpdates,
    searchData,
    searchInitialize,
  } = useWebView({
    webViewRef,
    mode,
    initialData: routeData ? routeData : initialData,
  });

  const animatedStyle = animatedPosition
    ? useAnimatedStyle(() => ({
        height: animatedPosition.value + 8,
      }))
    : undefined;

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

    const filtered = data.filter(
      (place) =>
        (selectedCategory === "all" ||
          NumberToCategory[place.category] === selectedCategory) &&
        (!onlySmallTown || place.smallTown),
    );

    if (!searchResult) {
      searchInitialize(filtered);
    } else {
      searchData(filtered);
    }
  }, [searchResult, selectedCategory, onlySmallTown]);

  useEffect(() => {
    if (mode !== "navigation") return;

    updateData(routeData);
  }, [routeData]);

  const uri =
    mode === "marker"
      ? (process.env.EXPO_PUBLIC_WEBVIEW_URI as string)
      : `${process.env.EXPO_PUBLIC_WEBVIEW_URI}/navigation`;

  return (
    <Animated.View className={`w-screen absolute`} style={animatedStyle}>
      <WebView
        ref={webViewRef}
        source={{ uri: uri }}
        style={{ flex: 1 }}
        onMessage={handleMessage}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        applicationNameForUserAgent="SodosiroAppWebView"
      />
    </Animated.View>
  );
}
