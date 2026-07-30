import { useToast } from "@/contexts/ToastProvider";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRef, useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import CustomText from "../common/CustomText";
import VerificationBottomSheet from "../verification/VerificationBottomSheet";
import BingoCell from "./BingoCell";
import BingoLine from "./BingoLine";

export default function BingoBoard({
  bingo,
  bingoResult,
}: {
  bingo: BingoList;
  bingoResult: BingoResult | null;
}) {
  const [boardSize, setBoardSize] = useState(0);

  const [selectedItem, setSelectedItem] = useState<BingoItem | null>(null);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const { showToast } = useToast();

  const handleLayout = (e: LayoutChangeEvent) => {
    const { width } = e.nativeEvent.layout;
    setBoardSize(width);
  };
  return (
    <View className={`gap-3`}>
      <View className={`flex-row justify-between`}>
        <CustomText font="title" className={`text-primary-dark`}>
          빙고 {bingoResult?.completedLines}줄 완성!
        </CustomText>
        <CustomText font="body3" className={`text-text-muted`}>
          {bingoResult?.completedLines}줄/8줄
        </CustomText>
      </View>
      <View
        className={`flex-row flex-wrap justify-between gap-y-10`}
        onLayout={handleLayout}
      >
        {boardSize > 0 && (
          <BingoLine
            boardSize={boardSize}
            line={bingoResult?.completedPositions ?? []}
          />
        )}
        {bingo?.bingoItems.map((item, index) => (
          <BingoCell
            key={index}
            bingoItem={item}
            onPress={() => {
              setSelectedItem(item);
              bottomSheetRef.current?.present();
              console.log(item);
            }}
          />
        ))}
      </View>
      <VerificationBottomSheet
        ref={bottomSheetRef}
        selectedItem={selectedItem}
        showToast={showToast}
        onClose={() => bottomSheetRef?.current?.close()}
      />
    </View>
  );
}
