import Spinner from "@/components/common/Spinner";
import PlaceBottomSheet from "@/components/explore/bottomSheet/PlaceBottomSheet";
import PlaceListBottomSheet from "@/components/explore/bottomSheet/PlaceListBottomSheet";
import KakaoMap from "@/components/explore/KakaoMap";
import MapOverlay from "@/components/explore/overlay/MapOverlay";
import { useLikePlaceMutation } from "@/hooks/mutation/place";
import { useSearchPlacesQuery } from "@/hooks/query/place";
import { useExploreStore } from "@/stores/useExploreStore";
import { useWebViewStore } from "@/stores/useWebViewStore";
import type BottomSheet from "@gorhom/bottom-sheet";
import { useEffect, useRef } from "react";
import { Dimensions, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";

export default function ExploreScreen() {
  const isLoading = useWebViewStore((state) => state.isLoading);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const screenHeight = Dimensions.get("window").height;
  const animatedPosition = useSharedValue(screenHeight);
  const animatedIndex = useSharedValue(-1);

  const webViewRef = useRef<React.ComponentRef<typeof WebView>>(null);

  const handlePlaceItemPress = (placeId: number) => {
    webViewRef.current?.postMessage(
      JSON.stringify({
        type: "PAN_TO",
        placeId: placeId,
      }),
    );
  };

  const isPlacesPending = useExploreStore((state) => state.isPlacesPending);
  const allPlaces = useExploreStore((state) => state.allPlaces);

  const { setSearchResult } = useExploreStore();

  const { data, isPending: isSearchPending } = useSearchPlacesQuery();

  const { mutate, isPending: isLikePending } = useLikePlaceMutation();

  const handleLike = async (contentId: number) => {
    if (isLikePending) return;
    mutate([contentId]);
  };

  useEffect(() => {
    const places = data?.data.items;

    if (places) {
      setSearchResult(places);
    }
  }, [data]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!isPlacesPending && allPlaces && (
        <KakaoMap
          webViewRef={webViewRef}
          mode="marker"
          animatedPosition={animatedPosition}
          initialData={allPlaces}
        />
      )}

      {!isLoading && !isPlacesPending ? (
        <>
          <MapOverlay
            webViewRef={webViewRef}
            animatedPosition={animatedPosition}
            animatedIndex={animatedIndex}
          />
        </>
      ) : (
        <View
          className={`w-screen h-screen absolute flex justify-center items-center bg-white`}
        >
          <Spinner size={32} />
        </View>
      )}
      <PlaceListBottomSheet
        bottomSheetRef={bottomSheetRef}
        animatedPosition={animatedPosition}
        animatedIndex={animatedIndex}
        handlePlaceItemPress={handlePlaceItemPress}
        handleLike={handleLike}
      />
      <PlaceBottomSheet
        handlePlaceItemPress={handlePlaceItemPress}
        handleLike={handleLike}
      />
    </SafeAreaView>
  );
}
