import Spinner from "@/components/common/Spinner";
import CustomBottomSheet from "@/components/explore/bottomSheet/CustomBottomSheet";
import KakaoMap from "@/components/explore/KakaoMap";
import MapOverlay from "@/components/explore/overlay/MapOverlay";
import type BottomSheet from "@gorhom/bottom-sheet";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Dimensions, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExploreScreen() {
  const [isLoading, setIsLoading] = useState(true);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const screenHeight = Dimensions.get("window").height;
  const animatedPosition = useSharedValue(screenHeight);

  const { keyword: param } = useLocalSearchParams<{
    keyword?: string;
  }>();

  const animatedIndex = useSharedValue(-1);

  useEffect(() => {
    if (!isLoading && param) {
      bottomSheetRef.current?.snapToIndex(1);
    }
  }, [param, isLoading]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KakaoMap
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        mode="marker"
        animatedPosition={animatedPosition}
      />
      {!isLoading ? (
        <>
          <MapOverlay
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
