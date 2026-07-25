import { BottomSheetSnapPoints } from "@/constants/BottomSheet";
import { PLACE_LIST } from "@/mocks/places";
import { useSearchStore } from "@/stores/useSearchStore";
import BottomSheet, {
  BottomSheetFlatList,
  useBottomSheetSpringConfigs,
} from "@gorhom/bottom-sheet";
import { useEffect, useState, type RefObject } from "react";
import { View } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import Place from "./Place";

export default function CustomBottomSheet({
  animatedPosition,
  bottomSheetRef,
  animatedIndex,
}: {
  animatedPosition: SharedValue<number>;
  bottomSheetRef: RefObject<BottomSheet | null>;
  animatedIndex: SharedValue<number>;
}) {
  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 100,
    stiffness: 400,
    mass: 1,
  });

  const [isClosing, setIsClosing] = useState(false);
  const { result, keyword } = useSearchStore();

  useEffect(() => {
    if (result.length > 0) bottomSheetRef.current?.snapToIndex(1);
    else bottomSheetRef.current?.close();
  }, [result, keyword]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      animatedIndex={animatedIndex}
      snapPoints={BottomSheetSnapPoints}
      animatedPosition={animatedPosition}
      backgroundStyle={{
        backgroundColor: "white",
      }}
      handleIndicatorStyle={{
        backgroundColor: "#E6E6E6",
        width: 50,
        height: 5,
      }}
      onAnimate={(from, to) => {
        if (to === -1) {
          setIsClosing(true);
        }
      }}
      onClose={() => {
        setIsClosing(false);
      }}
      enableDynamicSizing={false}
      enablePanDownToClose={false}
      enableContentPanningGesture={!isClosing}
      enableHandlePanningGesture={!isClosing}
      animationConfigs={animationConfigs}
    >
      <BottomSheetFlatList
        data={result}
        nestedScrollEnabled
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{
          paddingBottom: 10,
        }}
        renderItem={({ item, index }) => (
          <View key={index}>
            <Place place={item} />
            {index !== PLACE_LIST.length - 1 && (
              <View className="h-px bg-bg-subtle mx-5" />
            )}
          </View>
        )}
      ></BottomSheetFlatList>
    </BottomSheet>
  );
}
