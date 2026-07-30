import { AwardIcon, ChipIcon } from "@/assets/svgs";
import { Dimensions } from "react-native";

export const SCREEN_WIDTH = Dimensions.get("window").width;
export const GAP = 32;
export const PADDING_HORIZON = 20;
export const CELL_SIZE = (SCREEN_WIDTH - (PADDING_HORIZON + GAP) * 2) / 3;

export const LINE_WEIGHT = 20;

export const ADVANTAGES = [
  {
    Icon: AwardIcon,
    condition: "1줄 완성",
    reward: "빙고 첫 줄 뱃지 획득",
  },
  {
    Icon: ChipIcon,
    condition: "전체 완성",
    reward: "빙고 완성 뱃지 획득",
  },
];

export const BINGO_IMAGES: Record<CategoryTypeWithoutAll, number> = {
  activity: require("@/assets/images/bingo/activity_bingo.png"),
  attraction: require("@/assets/images/bingo/attraction_bingo.png"),
  cafe: require("@/assets/images/bingo/cafe_bingo.png"),
  nature: require("@/assets/images/bingo/nature_bingo.png"),
  restaurant: require("@/assets/images/bingo/restaurant_bingo.png"),
  shopping: require("@/assets/images/bingo/shopping_bingo.png"),
  culture: require("@/assets/images/bingo/culture_bingo.png"),
};
