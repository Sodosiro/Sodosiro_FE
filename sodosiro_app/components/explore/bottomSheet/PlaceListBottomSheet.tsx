import { BottomSheetSnapPoints } from "@/constants/BottomSheet";
import { PLACE_LIST } from "@/mocks/places";
import { useSearchStore } from "@/stores/useSearchStore";
import { useSelectedPlaceStore } from "@/stores/useSelectedPlaceStore";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
  useBottomSheetSpringConfigs,
} from "@gorhom/bottom-sheet";
import { useEffect, useRef, useState, type RefObject } from "react";
import { View } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import PlaceItem from "./PlaceItem";

export default function PlaceListBottomSheet({
  animatedPosition,
  bottomSheetRef,
  animatedIndex,
  handlePlaceItemPress,
}: {
  animatedPosition: SharedValue<number>;
  bottomSheetRef: RefObject<BottomSheet | null>;
  animatedIndex: SharedValue<number>;
  handlePlaceItemPress: (placeId: number) => void;
}) {
  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 100,
    stiffness: 400,
    mass: 1,
  });

  const flatListRef = useRef<BottomSheetFlatListMethods | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const { result, keyword } = useSearchStore();
  const { selectedPlace } = useSelectedPlaceStore();

  useEffect(() => {
    if (result && result.length > 0) bottomSheetRef.current?.snapToIndex(1);
    else bottomSheetRef.current?.close();
  }, [result, keyword]);

  useEffect(() => {
    if (!selectedPlace || !result) return;
    const index = result.findIndex((place) => place.id === selectedPlace.id);

    if (index === -1) return;

    bottomSheetRef.current?.snapToIndex(1);
    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0,
    });
  }, [selectedPlace, result]);

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
        ref={flatListRef}
        data={result}
        nestedScrollEnabled
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{
          paddingBottom: 10,
        }}
        getItemLayout={(_, index) => ({
          length: 100,
          offset: 100 * index,
          index,
        })}
        renderItem={({ item, index }) => (
          <View key={index} className={`h-[100px]`}>
            <PlaceItem place={item} onPress={handlePlaceItemPress} />
            {index !== PLACE_LIST.length - 1 && (
              <View className="h-px bg-bg-subtle mx-5" />
            )}
          </View>
        )}
      ></BottomSheetFlatList>
    </BottomSheet>
  );
}
