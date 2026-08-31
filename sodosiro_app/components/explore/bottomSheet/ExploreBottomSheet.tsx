import { useExploreStore } from "@/stores/useExploreStore";
import BottomSheet, { useBottomSheetSpringConfigs } from "@gorhom/bottom-sheet";
import { useEffect, useRef } from "react";
import { BackHandler } from "react-native";
import { SharedValue } from "react-native-reanimated";
import PlaceDetailContent from "./PlaceDetailContent";
import SearchPlacesContent from "./SearchPlacesContent";

export default function ExploreBottomSheet({
  places,
  animatedPosition,
  animatedIndex,
  handleSelectCancel,
  handlePlaceItemPress,
  handleLike,
}: {
  places: PlaceType[] | null;
  animatedPosition: SharedValue<number>;
  animatedIndex: SharedValue<number>;
  handleSelectCancel: () => void;
  handlePlaceItemPress: (placeId: number) => void;
  handleLike: (contentId: number) => Promise<void>;
}) {
  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 100,
    stiffness: 400,
    mass: 1,
  });

  const bottomSheetRef = useRef<BottomSheet>(null);
  const selectedPlaceId = useExploreStore((state) => state.selectedPlaceId);
  const setSelectedPlaceId = useExploreStore(
    (state) => state.setSelectedPlaceId,
  );
  const keyword = useExploreStore((state) => state.keyword);
  const clearSearchResult = useExploreStore((state) => state.clearSearchResult);

  useEffect(() => {
    if (!selectedPlaceId && !keyword) bottomSheetRef.current?.close();
    else if (animatedIndex.value !== 1) bottomSheetRef.current?.snapToIndex(1);
  }, [selectedPlaceId, keyword]);

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (selectedPlaceId) {
          setSelectedPlaceId(null);
          handleSelectCancel();
          return true;
        } else if (keyword) {
          clearSearchResult();
          return true;
        }

        return false;
      },
    );

    return () => subscription.remove();
  }, [selectedPlaceId, keyword]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={
        selectedPlaceId
          ? [24, 300, "95%"]
          : (places?.length ?? 0) > 1
            ? [24, 226, "95%"]
            : [24, 136]
      }
      animatedIndex={animatedIndex}
      animatedPosition={animatedPosition}
      enablePanDownToClose={false}
      enableDynamicSizing={false}
      handleIndicatorStyle={{
        backgroundColor: "#E6E6E6",
        width: 50,
        height: 5,
      }}
      backgroundStyle={{
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
      }}
      animationConfigs={animationConfigs}
    >
      {selectedPlaceId ? (
        <PlaceDetailContent placeId={selectedPlaceId} />
      ) : (
        <SearchPlacesContent
          places={places}
          handlePlaceItemPress={handlePlaceItemPress}
          handleLike={handleLike}
        />
      )}
    </BottomSheet>
  );
}
