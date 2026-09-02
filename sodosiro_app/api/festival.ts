import { axiosInstance } from "./instance";

type GetFestivalsParams = {
  areaCode?: string;
  status?: FestivalStatus;
  sigunguId?: number;
  cursor?: number;
  size?: number;
  year?: number;
};

export async function getFestivalsApi(params?: GetFestivalsParams) {
  return axiosInstance.get("/api/v1/festivals", { params });
}
