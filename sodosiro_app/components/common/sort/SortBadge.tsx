import { SortMiniIcon } from "@/assets/svgs";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Dispatch, SetStateAction, useRef } from "react";
import { Pressable } from "react-native";
import CustomText from "../CustomText";

const SORT_OPTIONS = ["최신순", "오래된순", "오름차순", "내림차순"];

export default function SortBadge({
  sortOption,
  setSortOption,
}: {
  sortOption: string;
  setSortOption: Dispatch<SetStateAction<string>>;
}) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const openSheet = () => {
    bottomSheetRef.current?.present();
  };

  const closeSheet = () => {
    bottomSheetRef.current?.dismiss();
  };

  return (
    <>
      <Pressable
        className="flex-row gap-1 rounded-full border border-border px-4 py-2.5 self-start items-center"
        onPress={openSheet}
      >
        <SortMiniIcon />
        <CustomText font="body3 tight">{sortOption}</CustomText>
      </Pressable>

      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        enablePanDownToClose
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
        }}
        backgroundStyle={{
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        }}
      >
        <BottomSheetView className="px-5 pb-8 pt-6">
          <CustomText font="heading2" className="mb-5">
            정렬
          </CustomText>

          {SORT_OPTIONS.map((option) => (
            <Pressable
              key={option}
              className="py-4"
              onPress={() => {
                setSortOption(option);
                closeSheet();
              }}
            >
              <CustomText
                font="body1"
                className={
                  option === sortOption
                    ? "text-primary-dark"
                    : "text-text-primary"
                }
              >
                {option}
              </CustomText>
            </Pressable>
          ))}
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
}
