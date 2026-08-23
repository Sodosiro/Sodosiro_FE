import { axiosInstance } from "./instance";

type PostUpdateLocationBody = {
  latitude: number;
  longitude: number;
  accuracy: number;
  occurredAt: Date;
};

export async function postUpdateLocation(body: PostUpdateLocationBody) {
  return axiosInstance.post(`/api/v1/locations`, body);
}
