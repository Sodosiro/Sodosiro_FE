import Spinner from "@/components/common/Spinner";
import CustomBottomSheet from "@/components/explore/bottomSheet/CustomBottomSheet";
import KakaoMap from "@/components/explore/KakaoMap";
import MapOverlay from "@/components/explore/overlay/MapOverlay";
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KakaoMap
        webViewRef={webViewRef}
        mode="marker"
        animatedPosition={animatedPosition}
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
      <CustomBottomSheet
        bottomSheetRef={bottomSheetRef}
        animatedPosition={animatedPosition}
        animatedIndex={animatedIndex}
      />
    </SafeAreaView>
  );
}
