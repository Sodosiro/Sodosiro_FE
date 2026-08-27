import CustomText from "@/components/common/CustomText";
import { useExploreStore } from "@/stores/useExploreStore";
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
  places,
  animatedPosition,
  bottomSheetRef,
  animatedIndex,
  handlePlaceItemPress,
  handleLike,
  mode = "search",
}: {
  places: PlaceType[] | null;
  animatedPosition: SharedValue<number>;
  bottomSheetRef: RefObject<BottomSheet | null>;
  animatedIndex: SharedValue<number>;
  handlePlaceItemPress: (placeId: number) => void;
  handleLike: (contentId: number) => Promise<void>;
  mode?: "search" | "nearby";
}) {
  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 100,
    stiffness: 400,
    mass: 1,
  });

  const flatListRef = useRef<BottomSheetFlatListMethods | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const keyword = useExploreStore((state) => state.keyword);
  const selectedPlaceId = useExploreStore((state) => state.selectedPlaceId);

  const isSearchMode = mode === "search";

  useEffect(() => {
    if (mode !== "nearby" || !places?.length) return;

    bottomSheetRef.current?.snapToIndex(0);
  }, [places]);

  useEffect(() => {
    if (!isSearchMode) {
      if (places?.length) {
        bottomSheetRef.current?.snapToIndex(0);
      }
      return;
    }

    if (keyword && places?.length) {
      bottomSheetRef.current?.snapToIndex(1);

      requestAnimationFrame(() => {
        flatListRef.current?.scrollToOffset({
          offset: 0,
          animated: true,
        });
      });
    } else {
      bottomSheetRef.current?.close();
    }
  }, [keyword, isSearchMode, places]);

  // 마커 선택 시 해당 장소로 스크롤
  useEffect(() => {
    if (!selectedPlaceId || !places?.length) return;

    const index = places.findIndex(
      (place) => place.contentId === selectedPlaceId,
    );

    if (index === -1) return;

    bottomSheetRef.current?.snapToIndex(isSearchMode ? 1 : 0);

    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0,
    });
  }, [selectedPlaceId, places, isSearchMode]);

  const snapPoints =
    places && places?.length > 1
      ? isSearchMode
        ? [24, 226]
        : [226]
      : isSearchMode
        ? [24, 136]
        : [136];

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      animatedIndex={animatedIndex}
      snapPoints={snapPoints}
      animatedPosition={animatedPosition}
      backgroundStyle={{
        backgroundColor: "white",
      }}
      handleIndicatorStyle={{
        backgroundColor: "#E6E6E6",
        width: 50,
        height: 5,
      }}
      onAnimate={(_, to) => {
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
      {places?.length ? (
        <BottomSheetFlatList
          ref={flatListRef}
          data={places}
          nestedScrollEnabled
          keyExtractor={(item) => String(item.contentId)}
          contentContainerStyle={{
            paddingBottom: 10,
          }}
          getItemLayout={(_, index) => ({
            length: 100,
            offset: 100 * index,
            index,
          })}
          renderItem={({ item, index }) => (
            <View className="h-[100px]">
              <PlaceItem
                place={item}
                onPress={handlePlaceItemPress}
                handleLike={handleLike}
              />

              {index !== places.length - 1 && (
                <View className="h-px bg-bg-subtle mx-5" />
              )}
            </View>
          )}
        />
      ) : (
        places !== null && (
          <View className="w-full h-full items-center justify-center">
            <CustomText font="body1" className="text-text-muted">
              검색 결과가 없습니다.
            </CustomText>
          </View>
        )
      )}
    </BottomSheet>
  );
}
