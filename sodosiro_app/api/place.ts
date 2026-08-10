import { axiosInstance } from "./instance";

type GetPlacesParams = {
  cursor?: string;
  size?: number;
  category?: number[];
  keyword?: string;
  sort?: "ALL" | "DEFAULT" | "POPULAR";
};

export async function getPlacesApi(params?: GetPlacesParams) {
  return axiosInstance.get("/api/v1/travel/spots", { params });
}
