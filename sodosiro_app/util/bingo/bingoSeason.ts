export const getBingoSeasonText = (year: number, season: SeasonType) => {
  return `${year}년 ${season === "SPRING" ? "봄" : season === "SUMMER" ? "여름" : season === "FALL" ? "가을" : "겨울"}`;
};
