import { axiosInstance } from "./instance";

export async function getRegionIntroductionApi(sigunguId: number) {
  return axiosInstance.get(`/api/v1/regions/${sigunguId}/introduction`);
}
