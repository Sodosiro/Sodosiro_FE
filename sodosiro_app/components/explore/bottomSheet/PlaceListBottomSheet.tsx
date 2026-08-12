import CustomText from "@/components/common/CustomText";
import { BottomSheetSnapPoints } from "@/constants/BottomSheet";
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
  animatedPosition,
  bottomSheetRef,
  animatedIndex,
  handlePlaceItemPress,
  handleLike,
}: {
  animatedPosition: SharedValue<number>;
  bottomSheetRef: RefObject<BottomSheet | null>;
  animatedIndex: SharedValue<number>;
  handlePlaceItemPress: (placeId: number) => void;
  handleLike: (contentId: number) => Promise<void>;
}) {
  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 100,
    stiffness: 400,
    mass: 1,
  });

  const flatListRef = useRef<BottomSheetFlatListMethods | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const searchResult = useExploreStore((state) => state.searchResult);
  const keyword = useExploreStore((state) => state.keyword);
  const selectedPlaceId = useExploreStore((state) => state.selectedPlaceId);

  useEffect(() => {
    if (searchResult) {
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
  }, [searchResult, keyword]);

  useEffect(() => {
    if (!selectedPlaceId || !searchResult) return;
    const index = searchResult.findIndex(
      (place) => place.contentId === selectedPlaceId,
    );

    if (index === -1) return;

    bottomSheetRef.current?.snapToIndex(1);
    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0,
    });
  }, [selectedPlaceId, searchResult]);

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
      {!!searchResult?.length ? (
        <BottomSheetFlatList
          ref={flatListRef}
          data={searchResult}
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
            <View key={index} className={`h-[100px]`}>
              <PlaceItem
                place={item}
                onPress={handlePlaceItemPress}
                handleLike={handleLike}
              />
              {index !== (searchResult as PlaceType[]).length - 1 && (
                <View className="h-px bg-bg-subtle mx-5" />
              )}
            </View>
          )}
        />
      ) : (
        <View className={`w-full h-full items-center justify-center`}>
          <CustomText font="body1" className={`text-text-muted`}>
            검색 결과가 없습니다.
          </CustomText>
        </View>
      )}
    </BottomSheet>
  );
}
