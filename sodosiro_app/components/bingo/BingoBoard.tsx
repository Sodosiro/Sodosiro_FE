import { useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import CustomText from "../common/CustomText";
import BingoCell from "./BingoCell";
import BingoLine from "./BingoLine";

type Bingo =
  | {
      region: string;
      bingoItems: {
        position: number;
        title: string;
        completed: boolean;
      }[];
    }
  | undefined;

export default function BingoBoard({
  bingo,
  bingoResult,
}: {
  bingo: Bingo;
  bingoResult: BingoResult | null;
}) {
  const [boardSize, setBoardSize] = useState(0);

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
          <BingoCell key={index} bingoItem={item} />
        ))}
      </View>
    </View>
  );
}
