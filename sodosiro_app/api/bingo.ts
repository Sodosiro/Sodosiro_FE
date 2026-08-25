import { axiosInstance } from "./instance";

export async function getBingoSeasonsApi() {
  return axiosInstance.get(`/api/v1/bingo/seasons`);
}

export async function getBingoApi(
  sigunguId: number,
  year?: number,
  seasonType?: SeasonType,
) {
  return axiosInstance.get(`/api/v1/bingo/regions/${sigunguId}`, {
    params: {
      year,
      seasonType,
    },
  });
}

export async function postBingoGps(
  contentId: number,
  latitude: number,
  longitude: number,
) {
  return await axiosInstance.post(`/api/v1/bingo/gps`, {
    contentId,
    latitude,
    longitude,
  });
}
