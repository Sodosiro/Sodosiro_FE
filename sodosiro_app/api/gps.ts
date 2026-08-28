import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "./instance";

// Request Body 타입 정의
export type UpdateGpsRequest = {
  courseId: number;
  contentId: number;
  day: number;
  latitude: number;
  longitude: number;
};

// API 호출 함수
export const updateGpsLocationApi = async (body: UpdateGpsRequest) => {
  const { data } = await axiosInstance.post("/api/v1/gps", body);
  return data;
};

// TanStack Query Mutation Hook
export const useUpdateGpsMutation = () => {
  return useMutation({
    mutationFn: updateGpsLocationApi,
  });
};
