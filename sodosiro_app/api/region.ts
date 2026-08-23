import { axiosInstance } from "./instance";

export async function getRegionIntroductionApi(sigunguId: number) {
  return axiosInstance.get(`/api/v1/regions/${sigunguId}/introduction`);
}

export async function getVisitedRegions(areaCode: string) {
  return axiosInstance.get(`/api/v1/regions/visited`, {
    params: { areaCode },
  });
}
