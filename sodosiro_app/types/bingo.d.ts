type BingoItem = {
  position: number;
  title: string;
  completed: boolean;
};

type BingoResult = {
  completedLines: number;
  isBingo: boolean;
  completedPositions: number[][];
};
