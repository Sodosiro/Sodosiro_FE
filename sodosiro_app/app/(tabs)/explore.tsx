import Spinner from "@/components/common/Spinner";
import ExploreBottomSheet from "@/components/explore/bottomSheet/ExploreBottomSheet";
import KakaoMap from "@/components/explore/KakaoMap";
import MapOverlay from "@/components/explore/overlay/MapOverlay";
import { useLikePlaceMutation } from "@/hooks/mutation/place";
import { useSearchPlacesQuery } from "@/hooks/query/place";
import { useExploreStore } from "@/stores/useExploreStore";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Dimensions, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";

export default function ExploreScreen() {
  const [isLoading, setIsLoading] = useState(true);

  const { placeId } = useLocalSearchParams<{ placeId: string }>();

  const webViewRef = useRef<React.ComponentRef<typeof WebView>>(null);
  const screenHeight = Dimensions.get("window").height;
  const animatedPosition = useSharedValue(screenHeight);
  const animatedIndex = useSharedValue(-1);

  const searchResult = useExploreStore((state) => state.searchResult);
  const setSelectedPlaceId = useExploreStore(
    (state) => state.setSelectedPlaceId,
  );

  const isPlacesPending = useExploreStore((state) => state.isPlacesPending);
  const allPlaces = useExploreStore((state) => state.allPlaces);

  const { setSearchResult } = useExploreStore();

  const { data, isPending: isSearchPending } = useSearchPlacesQuery();

  const { mutate, isPending: isLikePending } = useLikePlaceMutation();

  const handleLike = async (contentId: number) => {
    if (isLikePending) return;
    mutate([contentId]);
  };

  const handlePlaceItemPress = (placeId: number) => {
    setSelectedPlaceId(placeId);
  };

  const handleSelectCancel = () => {
    webViewRef.current?.postMessage(
      JSON.stringify({
        type: "SELECT_CANCEL",
      }),
    );
  };

  useEffect(() => {
    const places = data?.data.items;

    if (places) {
      setSearchResult(places);
    }
  }, [data]);

  useEffect(() => {
    setSelectedPlaceId(Number(placeId));
  }, [placeId]);

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
      {!isPlacesPending && allPlaces && (
        <KakaoMap
          webViewRef={webViewRef}
          mode="marker"
          animatedPosition={animatedPosition}
          initialData={allPlaces}
          setIsLoading={setIsLoading}
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
      <ExploreBottomSheet
        places={searchResult}
        animatedPosition={animatedPosition}
        animatedIndex={animatedIndex}
        handleSelectCancel={handleSelectCancel}
        handlePlaceItemPress={handlePlaceItemPress}
        handleLike={handleLike}
      />
    </SafeAreaView>
  );
}
