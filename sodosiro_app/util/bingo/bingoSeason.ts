export const getBingoSeasonText = (season: BingoSeasonType) => {
  return `${season?.year}년 ${season?.seasonType === "SPRING" ? "봄" : season?.seasonType === "SUMMER" ? "여름" : season?.seasonType === "FALL" ? "가을" : "겨울"}`;
};

export const SEASON_IMAGES = {
  spring: require("@/assets/images/bingo/spring.png"),
  summer: require("@/assets/images/bingo/summer.png"),
  autumn: require("@/assets/images/bingo/autumn.png"),
  winter: require("@/assets/images/bingo/winter.png"),
};

export function getBingoSeasonImage(season: BingoSeasonType) {
  if (season?.seasonType === "SPRING") {
    return SEASON_IMAGES.spring;
  }

  if (season?.seasonType === "SUMMER") {
    return SEASON_IMAGES.summer;
  }

  if (season?.seasonType === "FALL") {
    return SEASON_IMAGES.autumn;
  }

  return SEASON_IMAGES.winter;
}
