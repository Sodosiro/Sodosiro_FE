type GpsVerificationItem = {
  contentId: number;
  title: string;
  category: CategoryNumber;
  latitude: number;
  longitude: number;
  completed?: boolean;
  firstImage?: string;
  courseId?: number;
  day?: number;
};

type BingoItem = {
  position: number;
  contentId: number;
  title: string;
  category: CategoryNumber;
  latitude: number;
  longitude: number;
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
