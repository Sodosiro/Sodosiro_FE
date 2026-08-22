import { axiosInstance } from "./instance";

type GetPlacesParams = {
  cursor?: string;
  size?: number;
  category?: number[];
  keyword?: string;
  sort?: "ALL" | "DEFAULT" | "POPULAR";
};

type GetLikePlacesParams = {
  category?: number[];
  sigunguCode?: string;
  cursor?: number;
  size?: number;
  sort?: SortType;
};

export async function getPlacesApi(params?: GetPlacesParams) {
  return axiosInstance.get("/api/v1/travel/spots", { params });
}

export async function getPlaceDetailApi(contentId: number) {
  return axiosInstance.get(`/api/v1/travel/spots/${contentId}`);
}

export async function postAiRecommendationApi(contentId: number) {
  return axiosInstance.post(
    `/api/v1/travel/spots/${contentId}/ai-recommendation`,
  );
}

export async function postLikePlacesApi(contentIds: number[]) {
  return axiosInstance.post(`/api/v1/spots/likes/toggle`, { contentIds });
}

export async function getLikePlacesApi(params?: GetLikePlacesParams) {
  return axiosInstance.get(`/api/v1/spots/likes`, { params });
}
