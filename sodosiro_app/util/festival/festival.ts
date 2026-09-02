export const SEASON_IMAGES = {
  spring: require("@/assets/images/festival/spring.png"),
  summer: require("@/assets/images/festival/summer.png"),
  autumn: require("@/assets/images/festival/autumn.png"),
  winter: require("@/assets/images/festival/winter.png"),
};

export function getFestivalSeasonImage(date: Date) {
  const month = new Date(date).getMonth() + 1;

  if (month >= 3 && month <= 5) {
    return SEASON_IMAGES.spring;
  }

  if (month >= 6 && month <= 8) {
    return SEASON_IMAGES.summer;
  }

  if (month >= 9 && month <= 11) {
    return SEASON_IMAGES.autumn;
  }

  return SEASON_IMAGES.winter;
}
