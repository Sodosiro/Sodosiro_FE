import { axiosInstance } from "./instance";

type GetFestivalsParams = {
  areaCode?: string;
  status?: FestivalStatus;
  cursor?: number;
  size?: number;
};

export async function getFestivalsApi(params?: GetFestivalsParams) {
  return axiosInstance.get("/api/v1/festivals", { params });
}
