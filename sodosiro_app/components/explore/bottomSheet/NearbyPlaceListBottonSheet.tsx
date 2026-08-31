import CustomText from "@/components/common/CustomText";
import BottomSheet, {
  BottomSheetFlatList,
  useBottomSheetSpringConfigs,
} from "@gorhom/bottom-sheet";
import { useEffect, type RefObject } from "react";
import { View } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import PlaceItem from "./PlaceItem";

export default function NearbyPlaceListBottomSheet({
  places,
  animatedPosition,
  bottomSheetRef,
  animatedIndex,
  handlePlaceItemPress,
  handleLike,
}: {
  places: PlaceType[] | null;
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

  useEffect(() => {
    if (places?.length) {
      bottomSheetRef.current?.snapToIndex(0);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [places]);

  const snapPoints = places && places?.length > 1 ? [226] : [136];

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
      enableDynamicSizing={false}
      enablePanDownToClose={false}
      animationConfigs={animationConfigs}
    >
      {places?.length ? (
        <BottomSheetFlatList
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
            <View style={{ height: 100 }}>
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
              장소 정보를 불러오지 못했어요.
            </CustomText>
          </View>
        )
      )}
    </BottomSheet>
  );
}
