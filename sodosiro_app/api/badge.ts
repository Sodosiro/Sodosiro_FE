import { axiosInstance } from "./instance";

export async function getBadgesApi() {
  return axiosInstance.get(`/api/v1/badges`);
}
