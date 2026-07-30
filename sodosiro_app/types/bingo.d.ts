type BingoItem = {
  position: number;
  title: string;
  category: CategoryTypeWithoutAll;
  completed: boolean;
  latlng: {
    lat: number;
    lng: number;
  };
  imageSource?: string;
};

type BingoList = {
  region: string;
  bingoItems: BingoItem[];
};

type BingoResult = {
  completedLines: number;
  isBingo: boolean;
  completedPositions: number[][];
};
