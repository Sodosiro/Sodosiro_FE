import { axiosInstance } from "./instance";

type GetPlacesParams = {
  cursor?: string;
  size?: number;
  category?: number[];
  keyword?: string;
  sort?: "ALL" | "DEFAULT" | "POPULAR";
};

type GetLikePlacesParams = {
  sigunguCode?: string;
  cursor?: number;
  size?: number;
};

export async function getPlacesApi(params?: GetPlacesParams) {
  return axiosInstance.get("/api/v1/travel/spots", { params });
}

export async function getPlaceDetailApi(contentId: number) {
  return axiosInstance.get(`/api/v1/travel/spots/${contentId}`);
}

export async function postAiRecommendationApi(contentId: number) {
  // return axiosInstance.post(
  //   `/api/v1/travel/spots/${contentId}/ai-recommendation`,
  // );
  return null;
}

export async function postLikeApi(contentId: number) {
  return axiosInstance.post(`/api/v1/spots/${contentId}/like`);
}

export async function getLikePlaces(params?: GetLikePlacesParams) {
  return axiosInstance.get(`/api/v1/likes`, { params });
}
