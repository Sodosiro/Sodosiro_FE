import { getPlacesApi } from "@/api/place";
import Spinner from "@/components/common/Spinner";
import PlaceBottomSheet from "@/components/explore/bottomSheet/PlaceBottomSheet";
import PlaceListBottomSheet from "@/components/explore/bottomSheet/PlaceListBottomSheet";
import KakaoMap from "@/components/explore/KakaoMap";
import MapOverlay from "@/components/explore/overlay/MapOverlay";
import { useLikeMutation } from "@/hooks/mutation/useLikeMutation";
import { useSearchPlacesQuery } from "@/hooks/query/useSearchPlacesQuery";
import { useExploreStore } from "@/stores/useExploreStore";
import { useWebViewStore } from "@/stores/useWebViewStore";
import type BottomSheet from "@gorhom/bottom-sheet";
import { useEffect, useRef, useState } from "react";
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

  const [isPlacesPending, setisPlacesPending] = useState(true);

  const { setAllPlaces, setSearchResult } = useExploreStore();

  const { data, isPending: isSearchPending } = useSearchPlacesQuery();

  const { mutate, isPending: isLikePending } = useLikeMutation();

  const handleLike = async (contentId: number) => {
    if (isLikePending) return;
    mutate([contentId]);
  };

  useEffect(() => {
    const getPlaces = async () => {
      const response = await getPlacesApi({ size: 10000 });

      const places = response?.data.items;

      if (places) {
        setAllPlaces(places);
      }
      setisPlacesPending(false);
    };

    getPlaces();
  }, []);

  useEffect(() => {
    const places = data?.data.items;

    if (places) {
      setSearchResult(places);
    }
  }, [data]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!isPlacesPending && (
        <KakaoMap
          webViewRef={webViewRef}
          mode="marker"
          animatedPosition={animatedPosition}
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
