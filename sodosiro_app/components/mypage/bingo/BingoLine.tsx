import { CELL_SIZE, GAP, LINE_WEIGHT } from "@/constants/Bingo";
import { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type Props = {
  boardSize: number;
  line: number[][];
};

const LINE_MAP = {
  "123": {
    top: 0,
  },
  "456": {
    top: 1,
  },
  "789": {
    top: 2,
  },
  "147": {
    left: 0,
  },
  "258": {
    left: 1,
  },
  "369": {
    left: 2,
  },
  "159": {
    diagonal: "right",
  },
  "357": {
    diagonal: "left",
  },
} as const;

const BingoLineItem = ({
  isCompleted,
  style,
}: {
  isCompleted: boolean;
  style: any;
}) => {
  const opacity = useSharedValue(isCompleted ? 0.8 : 0);

  useEffect(() => {
    opacity.value = withTiming(isCompleted ? 0.8 : 0, {
      duration: 300,
    });
  }, [isCompleted]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return <Animated.View pointerEvents="none" style={[style, animatedStyle]} />;
};

export default function BingoLine({ line, boardSize }: Props) {
  const LINE_SCALE = 0.8;
  const lineLength = boardSize * LINE_SCALE;
  const offset = (boardSize - lineLength) / 2;

  const completedLines = new Set(line.map((item) => item.join("")));

  return (
    <>
      {Object.entries(LINE_MAP).map(([key, position]) => {
        const isCompleted = completedLines.has(key);

        return (
          <BingoLineItem
            key={key}
            isCompleted={isCompleted}
            style={{
              position: "absolute",

              width: lineLength,
              height: LINE_WEIGHT,

              backgroundColor: "#7E9432",
              borderRadius: 999,

              ...("top" in position && {
                top: position.top * (CELL_SIZE + GAP + 2) + CELL_SIZE / 2 - 8,
                left: 0,
                transform: [
                  {
                    translateX: offset,
                  },
                ],
              }),

              ...("left" in position && {
                left:
                  position.left * (CELL_SIZE + GAP + 2) + CELL_SIZE / 2 - 10,
                top: 0,
                width: LINE_WEIGHT,
                height: lineLength,
                transform: [
                  {
                    translateY: offset,
                  },
                ],
              }),

              ...("diagonal" in position && {
                width: Math.sqrt(lineLength ** 2 * 2),
                left: (boardSize - Math.sqrt(lineLength ** 2 * 2)) / 2,
                top: boardSize / 2 - 8,

                transform: [
                  {
                    rotate: position.diagonal === "right" ? "45deg" : "-45deg",
                  },
                ],
              }),
            }}
          />
        );
      })}
    </>
  );
}
