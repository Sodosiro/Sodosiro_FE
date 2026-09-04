import { SpotItem } from "@/api/course";

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
    smallTown: false,
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
