import Spinner from "@/components/common/Spinner";
import CustomBottomSheet from "@/components/explore/bottomSheet/CustomBottomSheet";
import KakaoMap from "@/components/explore/KakaoMap";
import MapOverlay from "@/components/explore/overlay/MapOverlay";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExploreScreen() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KakaoMap isLoading={isLoading} setIsLoading={setIsLoading} />
      {!isLoading ? (
        <>
          <MapOverlay />
          <CustomBottomSheet />
        </>
      ) : (
        <View
          className={`w-screen h-screen absolute flex justify-center items-center bg-white`}
        >
          <Spinner size={32} />
        </View>
      )}
    </SafeAreaView>
  );
}
