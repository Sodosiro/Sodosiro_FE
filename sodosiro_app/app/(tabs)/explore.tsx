import Spinner from "@/components/common/Spinner";
import PlaceBottomSheet from "@/components/explore/bottomSheet/PlaceBottomSheet";
import PlaceListBottomSheet from "@/components/explore/bottomSheet/PlaceListBottomSheet";
import KakaoMap from "@/components/explore/KakaoMap";
import MapOverlay from "@/components/explore/overlay/MapOverlay";
import { PLACES } from "@/mocks/places";
import { useWebViewStore } from "@/stores/useWebViewStore";
import type BottomSheet from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { Dimensions, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";

export default function ExploreScreen() {
  const { isLoading } = useWebViewStore();
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KakaoMap
        webViewRef={webViewRef}
        mode="marker"
        animatedPosition={animatedPosition}
        initialData={PLACES}
      />
      {!isLoading ? (
        <>
          <MapOverlay
            webViewRef={webViewRef}
            bottomSheetRef={bottomSheetRef}
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
      />
      <PlaceBottomSheet handlePlaceItemPress={handlePlaceItemPress} />
    </SafeAreaView>
  );
}
