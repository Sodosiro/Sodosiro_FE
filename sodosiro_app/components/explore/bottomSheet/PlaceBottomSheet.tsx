import { useExploreStore } from "@/stores/useExploreStore";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useEffect, useRef } from "react";
import { SharedValue } from "react-native-reanimated";
import PlaceItem from "./PlaceItem";

export default function PlaceBottomSheet({
  animatedPosition,
  animatedIndex,
  handlePlaceItemPress,
  handleLike,
}: {
  animatedPosition: SharedValue<number>;
  animatedIndex: SharedValue<number>;
  handlePlaceItemPress: (placeId: number) => void;
  handleLike: (contentId: number) => Promise<void>;
}) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const selectedPlaceId = useExploreStore((state) => state.selectedPlaceId);
  const findPlaceById = useExploreStore((state) => state.findPlaceById);
  const keyword = useExploreStore((state) => state.keyword);

  useEffect(() => {
    if (selectedPlaceId && keyword === "") {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [selectedPlaceId, keyword]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      animatedIndex={animatedIndex}
      animatedPosition={animatedPosition}
      enablePanDownToClose={false}
      handleIndicatorStyle={{
        backgroundColor: "#E6E6E6",
        width: 50,
        height: 5,
      }}
      backgroundStyle={{
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
      }}
    >
      <BottomSheetView className={`pb-2`}>
        {selectedPlaceId && (
          <PlaceItem
            place={findPlaceById(selectedPlaceId) as PlaceType}
            onPress={handlePlaceItemPress}
            handleLike={handleLike}
          />
        )}
      </BottomSheetView>
    </BottomSheet>
  );
}
