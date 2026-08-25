type GpsVerificationItem = {
  contentId: number;
  title: string;
  category: CategoryNumber;
  firstImage?: string;
};

type BingoItem = {
  position: number;
  contentId: number;
  title: string;
  category: CategoryNumber;
  completed: boolean;
  firstImage?: string;
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

type SeasonType = "SPRING" | "SUMMER" | "FALL" | "WINTER";

type BingoStatus = "ACTIVE" | "ENDED";

type BingoSeasonType = {
  year: number;
  seasonType: SeasonType;
  status: BingoStatus;
};
