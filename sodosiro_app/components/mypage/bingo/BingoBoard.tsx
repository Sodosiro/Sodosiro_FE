import CustomText from "@/components/common/CustomText";
import VerificationBottomSheet from "@/components/verification/VerificationBottomSheet";
import { getBingoSeasonText } from "@/util/bingo/bingoSeason";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRef, useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import BingoCell from "./BingoCell";
import BingoCellSkeleton from "./BingoCellSkeleton";
import BingoLine from "./BingoLine";

export default function BingoBoard({
  bingoItems,
  bingoResult,
  isPending,
  bingoStatus,
  selectedSeason,
}: {
  bingoItems: BingoItem[];
  bingoResult: BingoResult | null;
  isPending: boolean;
  bingoStatus: BingoStatus;
  selectedSeason: BingoSeasonType;
}) {
  const [boardSize, setBoardSize] = useState(0);

  const [selectedItem, setSelectedItem] = useState<BingoItem | null>(null);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handleLayout = (e: LayoutChangeEvent) => {
    const { width } = e.nativeEvent.layout;
    setBoardSize(width);
  };
  const completedCount = bingoResult?.completedLines ?? 0;
  selectedSeason?.seasonType;
  const bingoText =
    completedCount === 0
      ? "빙고를 만들어 볼까요?"
      : completedCount < 4
        ? `빙고 ${completedCount}줄 완성!`
        : completedCount < 6
          ? `벌써 ${completedCount}줄이나 완성했어요!`
          : completedCount < 8
            ? `올빙고까지 ${8 - completedCount}줄 남았어요!`
            : `${getBingoSeasonText(selectedSeason)} 시즌 올빙고!🎉`;

  return (
    <View className={`gap-3`}>
      <View className={`flex-row justify-between`}>
        <CustomText font="title" className={`text-primary-dark`}>
          {bingoText}
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
        {isPending
          ? Array.from({ length: 9 }, (_, index) => (
              <BingoCellSkeleton key={index} />
            ))
          : bingoItems.map((item, index) => (
              <BingoCell
                key={index}
                bingoItem={item}
                onPress={() => {
                  setSelectedItem(item);
                  bottomSheetRef.current?.present();
                }}
              />
            ))}
      </View>
      <VerificationBottomSheet
        ref={bottomSheetRef}
        selectedItem={selectedItem}
        onClose={() => bottomSheetRef?.current?.close()}
        bingoStatus={bingoStatus}
      />
    </View>
  );
}
