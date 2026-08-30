import Header from "@/components/common/Header";
import Spinner from "@/components/common/Spinner";
import PlaceListBottomSheet from "@/components/explore/bottomSheet/PlaceListBottomSheet";
import { useLikePlaceMutation } from "@/hooks/mutation/place";
import { useWebView } from "@/hooks/useWebView";
import { useExploreStore } from "@/stores/useExploreStore";
import { useLocationStore } from "@/stores/useLocationStore";
import { getBoundsCenter } from "@/util/location/location";
import BottomSheet from "@gorhom/bottom-sheet";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Dimensions, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import WebView from "react-native-webview";

export default function NearbyLikedScreen() {
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const screenHeight = Dimensions.get("window").height;
  const animatedPosition = useSharedValue(screenHeight);
  const animatedIndex = useSharedValue(-1);

  const location = useLocationStore((state) => state.location);
  const isPlacesPending = useExploreStore((state) => state.isPlacesPending);
  const allPlaces = useExploreStore((state) => state.allPlaces);

  const webViewRef = useRef<React.ComponentRef<typeof WebView>>(null);
  const previousPlacesRef = useRef<PlaceType[]>(allPlaces);

  const [isLoading, setIsLoading] = useState(true);

  const { placeIds } = useLocalSearchParams<{ placeIds: string | string[] }>();
  const placeIdList = Array.isArray(placeIds) ? placeIds : [placeIds];

  const nearbyLikedPlaces =
    allPlaces?.filter((place) =>
      placeIdList.includes(String(place.contentId)),
    ) ?? [];

  const { handleMessage, sendPlaceUpdates } = useWebView({
    webViewRef,
    mode: "marker",
    initialData: nearbyLikedPlaces,
    doNotSelect: true,
  });

  const { mutate, isPending: isLikePending } = useLikePlaceMutation();

  const handleLike = async (contentId: number) => {
    if (isLikePending) return;
    mutate([contentId]);
  };

  const handlePlaceItemPress = (placeId: number) => {
    webViewRef.current?.postMessage(
      JSON.stringify({
        type: "PAN_TO",
        placeId: placeId,
      }),
    );
  };

  useEffect(() => {
    const previousPlaces = previousPlacesRef.current;

    if (!previousPlaces || !allPlaces) return;

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
  }, [allPlaces]);

  const uri = new URL(process.env.EXPO_PUBLIC_WEBVIEW_URI as string);

  const centerLocation = getBoundsCenter(nearbyLikedPlaces);

  if (location) {
    uri.searchParams.set("lat", String(centerLocation?.latitude));
    uri.searchParams.set("lng", String(centerLocation?.longitude));
    uri.searchParams.set("level", String(3));
  }

  return (
    <View style={{ flex: 1 }}>
      <View className={`absolute w-screen z-10 bg-bg`}>
        <View style={{ paddingTop: insets.top }}>
          <Header title="근처 저장한 장소" />
        </View>
      </View>
      {!isPlacesPending && allPlaces ? (
        <>
          <WebView
            ref={webViewRef}
            source={{ uri: uri.toString() }}
            style={{ flex: 1 }}
            onMessage={handleMessage}
            onLoadStart={() => setIsLoading(true)}
            onLoadEnd={() => setIsLoading(false)}
            applicationNameForUserAgent="SodosiroAppWebView"
          />
          <PlaceListBottomSheet
            places={nearbyLikedPlaces}
            animatedPosition={animatedPosition}
            animatedIndex={animatedIndex}
            bottomSheetRef={bottomSheetRef}
            handlePlaceItemPress={handlePlaceItemPress}
            handleLike={handleLike}
            mode={"nearby"}
          />
        </>
      ) : (
        <View className={`flex-1 justify-center items-center`}>
          <Spinner />
        </View>
      )}
    </View>
  );
}
