import { DownIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import { SkeletonLine } from "@/components/common/skeleton/SkeletonLine";
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  BackHandler,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  View,
} from "react-native";

const ITEM_HEIGHT = 48;
const VISIBLE_ITEMS = 3;
const WHEEL_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;

export default function WheelPicker({
  title,
  values,
  selectedValue,
  setSelectedValue,
  isPending,
}: {
  title: string;
  values: string[];
  selectedValue: string;
  setSelectedValue: Dispatch<SetStateAction<any>>;
  isPending: boolean;
}) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const openSheet = () => {
    bottomSheetRef.current?.present();
  };

  return (
    <>
      <View className="gap-2">
        {isPending || !selectedValue ? (
          <View className={`self-start`}>
            <SkeletonLine font="heading2" text="2026년 여름" />
          </View>
        ) : (
          <Pressable
            onPress={openSheet}
            className={`flex-row gap-1 items-center`}
          >
            <CustomText font="heading2">{selectedValue}</CustomText>
            <DownIcon width={16} />
          </Pressable>
        )}
      </View>

      <WheelPickerModal
        bottomSheetRef={bottomSheetRef}
        title={title}
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
        values={values}
      />
    </>
  );
}

const WheelPickerModal = ({
  bottomSheetRef,
  title,
  values,
  selectedValue,
  setSelectedValue,
}: {
  bottomSheetRef: RefObject<BottomSheetModal | null>;
  title: string;
  values: string[];
  selectedValue: string;
  setSelectedValue: Dispatch<SetStateAction<string>>;
}) => {
  const flatListRef = useRef<BottomSheetFlatListMethods>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [tempSelectedValue, setTempSelectedValue] = useState(selectedValue);
  const selectedValueRef = useRef(selectedValue);
  selectedValueRef.current = selectedValue;

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    const clampedIndex = Math.max(0, Math.min(index, values?.length - 1));
    const value = values?.[clampedIndex];

    setTempSelectedValue(value);
  };

  const handleSelect = (item: string) => {
    const index = values?.indexOf(item);

    if (index < 0) return;

    flatListRef.current?.scrollToOffset({
      offset: index * ITEM_HEIGHT,
      animated: true,
    });

    setTempSelectedValue(item);
  };

  const handleConfirm = () => {
    setSelectedValue(tempSelectedValue);

    bottomSheetRef.current?.dismiss();
  };

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (!isOpen) {
          return false;
        }

        bottomSheetRef.current?.dismiss();
        return true;
      },
    );

    return () => subscription.remove();
  }, [isOpen]);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={0}
      snapPoints={[300]}
      enableDynamicSizing={false}
      enableContentPanningGesture={false}
      onChange={(index) => {
        setIsOpen(index >= 0);
      }}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          opacity={0.5}
          pressBehavior="none"
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
            {title}
          </CustomText>
          <Pressable onPress={handleConfirm} hitSlop={20}>
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
              data={values}
              keyExtractor={(item) => item}
              showsVerticalScrollIndicator={false}
              initialScrollIndex={values?.indexOf(selectedValue)}
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
                const isSelected = item === selectedValue;

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
                      {item}
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
