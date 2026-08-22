import { axiosInstance } from "./instance";

export async function getTrendSearchApi() {
  return axiosInstance.get(`/api/v1/travel/search/trending`);
}
