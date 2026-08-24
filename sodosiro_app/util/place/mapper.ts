import { SpotItem } from "@/api/course";

// utils/mapper.ts (또는 해당 파일 상단)
export function spotItemToPlaceType(spot: SpotItem): PlaceType {
  return {
    contentId: spot.contentId,
    title: spot.title,
    category: spot.category,
    overview: spot.overview ?? "",
    firstImage: spot.firstImage ?? "",
    mapX: spot.mapX,
    mapY: spot.mapY,
    avgRating: spot.avgRating ?? 0,
    reviewCount: spot.reviewCount ?? 0,
    // SpotItem에 없는 필수 값들은 기본값(Fallback) 채움
    addr1: "",
    region: "",
    restdate: "",
    likeCount: 0,
    liked: false,
    isPopular: false,
    popularity: null,
    tags: [],
  };
}
