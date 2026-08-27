export const getBingoSeasonText = (season: BingoSeasonType) => {
  return `${season?.year}년 ${season?.seasonType === "SPRING" ? "봄" : season.seasonType === "SUMMER" ? "여름" : season.seasonType === "FALL" ? "가을" : "겨울"}`;
};
