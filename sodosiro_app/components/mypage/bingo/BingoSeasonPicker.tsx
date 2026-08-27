import CustomText from "@/components/common/CustomText";
import { getBingoSeasonText } from "@/util/bingo/bingoSeason";
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { Dispatch, RefObject, SetStateAction, useRef, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  View,
} from "react-native";

const ITEM_HEIGHT = 48;
const VISIBLE_ITEMS = 3;
const WHEEL_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;

export default function BingoSeasonPicker({
  bingoSeasons,
  selectedSeason,
  setSelectedSeason,
}: {
  bingoSeasons: BingoSeasonType[];
  selectedSeason: BingoSeasonType;
  setSelectedSeason: Dispatch<SetStateAction<BingoSeasonType>>;
}) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const openSheet = () => {
    bottomSheetRef.current?.present();
  };

  return (
    <>
      <View className="gap-2">
        <Pressable onPress={openSheet}>
          <CustomText font="heading2">
            {getBingoSeasonText(selectedSeason)}
          </CustomText>
        </Pressable>

        <CustomText font="body2" className="text-text-muted">
          계절이 바뀌면 새로운 빙고가 열려요.
        </CustomText>
      </View>

      <BingoSeasonPickerModal
        bottomSheetRef={bottomSheetRef}
        selectedSeason={selectedSeason}
        setSelectedSeason={setSelectedSeason}
        bingoSeasons={bingoSeasons}
      />
    </>
  );
}

const BingoSeasonPickerModal = ({
  bottomSheetRef,
  selectedSeason,
  setSelectedSeason,
  bingoSeasons,
}: {
  bottomSheetRef: RefObject<BottomSheetModal | null>;
  selectedSeason: BingoSeasonType;
  setSelectedSeason: Dispatch<SetStateAction<BingoSeasonType>>;
  bingoSeasons: BingoSeasonType[];
}) => {
  const flatListRef = useRef<BottomSheetFlatListMethods>(null);

  const [tempSelectedSeason, setTempSelectedSeason] = useState(selectedSeason);
  const selectedSeasonRef = useRef(selectedSeason);
  selectedSeasonRef.current = selectedSeason;

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    const clampedIndex = Math.max(0, Math.min(index, bingoSeasons?.length - 1));
    const season = bingoSeasons?.[clampedIndex];

    setTempSelectedSeason(season);
  };

  const handleSelect = (item: BingoSeasonType) => {
    const index = bingoSeasons?.indexOf(item);

    if (index < 0) return;

    flatListRef.current?.scrollToOffset({
      offset: index * ITEM_HEIGHT,
      animated: true,
    });

    setTempSelectedSeason(item);
  };

  const handleConfirm = () => {
    setSelectedSeason(tempSelectedSeason);

    bottomSheetRef.current?.dismiss();
  };

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={0}
      snapPoints={[300]}
      enableDynamicSizing={false}
      enablePanDownToClose
      enableContentPanningGesture={false}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          opacity={0.5}
          pressBehavior="close"
        />
      )}
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
      <BottomSheetView
        className="px-5 pb-2 pt-6"
        onStartShouldSetResponder={() => true}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between pb-4">
          <CustomText font="body1" className="opacity-0">
            완료
          </CustomText>
          <CustomText font="heading2" className="text-center flex-1">
            시즌 선택
          </CustomText>
          <Pressable onPress={handleConfirm}>
            <CustomText font="body1" className="text-primary-dark">
              완료
            </CustomText>
          </Pressable>
        </View>

        <View className="pt-6">
          <View
            style={{
              height: WHEEL_HEIGHT,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <View
              pointerEvents="none"
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: ITEM_HEIGHT,
                height: ITEM_HEIGHT,
                borderRadius: 8,
                backgroundColor: "#F5F5F5",
              }}
            />
            <BottomSheetFlatList
              ref={flatListRef}
              style={{
                height: WHEEL_HEIGHT,
              }}
              data={bingoSeasons}
              keyExtractor={(item) => getBingoSeasonText(item)}
              showsVerticalScrollIndicator={false}
              initialScrollIndex={bingoSeasons?.indexOf(selectedSeason)}
              bounces={false}
              snapToInterval={ITEM_HEIGHT}
              onMomentumScrollEnd={handleScrollEnd}
              getItemLayout={(_, index) => ({
                length: ITEM_HEIGHT,
                offset: ITEM_HEIGHT * index,
                index,
              })}
              contentContainerStyle={{
                paddingVertical: ITEM_HEIGHT,
              }}
              renderItem={({ item }) => {
                const isSelected = item === selectedSeason;

                return (
                  <Pressable
                    onPress={() => handleSelect(item)}
                    style={{
                      width: "100%",
                      height: ITEM_HEIGHT,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CustomText
                      font="body1"
                      className={
                        isSelected ? "text-primary-dark" : "text-text-muted"
                      }
                    >
                      {getBingoSeasonText(item)}
                    </CustomText>
                  </Pressable>
                );
              }}
            />
            <LinearGradient
              pointerEvents="none"
              colors={["#FFFFFF", "rgba(255,255,255,0)"]}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: ITEM_HEIGHT,
                zIndex: 2,
              }}
            />
            <LinearGradient
              pointerEvents="none"
              colors={["rgba(255,255,255,0)", "#FFFFFF"]}
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: ITEM_HEIGHT,
                zIndex: 2,
              }}
            />
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};
