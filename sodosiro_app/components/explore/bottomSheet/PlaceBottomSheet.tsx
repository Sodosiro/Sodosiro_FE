import { useSearchStore } from "@/stores/useSearchStore";
import { useSelectedPlaceStore } from "@/stores/useSelectedPlaceStore";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useEffect, useRef } from "react";
import PlaceItem from "./PlaceItem";

export default function PlaceBottomSheet({
  handlePlaceItemPress,
}: {
  handlePlaceItemPress: (placeId: number) => void;
}) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { selectedPlace } = useSelectedPlaceStore();
  const { keyword } = useSearchStore();

  useEffect(() => {
    if (selectedPlace && keyword === "") {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [selectedPlace, keyword]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
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
        {selectedPlace && (
          <PlaceItem place={selectedPlace} onPress={handlePlaceItemPress} />
        )}
      </BottomSheetView>
    </BottomSheet>
  );
}
