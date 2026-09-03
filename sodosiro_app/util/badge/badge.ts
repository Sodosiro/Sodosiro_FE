import { formatRegionName } from "../region/region";

type SodosiName =
  | "고성"
  | "삼척"
  | "양구"
  | "양양"
  | "영월"
  | "정선"
  | "철원"
  | "태백"
  | "평창"
  | "홍천"
  | "화천"
  | "횡성";

export const BADGE_IMAGES = {
  고성: require("@/assets/images/badge/고성.png"),
  삼척: require("@/assets/images/badge/삼척.png"),
  양구: require("@/assets/images/badge/양구.png"),
  양양: require("@/assets/images/badge/양양.png"),
  영월: require("@/assets/images/badge/영월.png"),
  정선: require("@/assets/images/badge/정선.png"),
  철원: require("@/assets/images/badge/철원.png"),
  태백: require("@/assets/images/badge/태백.png"),
  평창: require("@/assets/images/badge/평창.png"),
  홍천: require("@/assets/images/badge/홍천.png"),
  화천: require("@/assets/images/badge/화천.png"),
  횡성: require("@/assets/images/badge/횡성.png"),
  비밀: require("@/assets/images/badge/비밀.png"),
};

export function getBadgeImage(badge: BadgeType) {
  if (!badge?.earned) {
    return BADGE_IMAGES["비밀"];
  }

  return BADGE_IMAGES[formatRegionName(badge.name) as SodosiName];
}
