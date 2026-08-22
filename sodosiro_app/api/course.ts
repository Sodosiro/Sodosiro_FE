import { axiosInstance } from "./instance";

export async function getCoursesApi(status?: TripStatus) {
  return axiosInstance.get("/api/v1/courses/me", { params: { status } });
}
