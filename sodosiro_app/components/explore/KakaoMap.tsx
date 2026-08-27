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
  const keyword = useExploreStore((state) => state.keyword);
  const allPlaces = useExploreStore((state) => state.allPlaces);
  const selectedCategory = useExploreStore((state) => state.selectedCategory);

  const previousPlacesRef = useRef<PlaceType[]>(allPlaces);
  const previousKeywordRef = useRef(keyword);

  const { handleMessage, updateData, sendPlaceUpdates } = useWebView({
    webViewRef,
    mode,
    initialData: routeData ? routeData : initialData,
  });

  const animatedStyle = animatedPosition
    ? useAnimatedStyle(() => ({
        height: animatedPosition.value + 8,
      }))
    : undefined;

  const initialBound = routeData?.bound;

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

    const isKeywordChanged = previousKeywordRef.current !== keyword;

    const filtered =
      selectedCategory === "all"
        ? data
        : data.filter(
            (place: PlaceType) =>
              NumberToCategory[place.category] === selectedCategory,
          );
    updateData(filtered, !!searchResult && isKeywordChanged);
    previousKeywordRef.current = keyword;
  }, [searchResult, selectedCategory]);

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
      />
    </Animated.View>
  );
}
