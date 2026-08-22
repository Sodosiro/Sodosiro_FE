import { ImagePickerAsset } from "expo-image-picker";
import { axiosInstance } from "./instance";

type GetFeedsParams = {
  cursor?: number;
  size?: number;
};

export async function getFeedsApi(params?: GetFeedsParams) {
  return axiosInstance.get("/api/v1/diggings", { params });
}

export async function getFeedCandidatesApi(courseId: number) {
  return axiosInstance.get(`/api/v1/courses/${courseId}/digging-candidates`);
}

export async function postFeedApi(
  courseId: number,
  contentId: number,
  body: string,
  images: ImagePickerAsset[],
) {
  const formData = new FormData();

  formData.append("request", {
    string: JSON.stringify({
      courseId,
      contentId,
      body,
    }),
    type: "application/json",
  } as any);

  images.forEach((image, index) => {
    formData.append("images", {
      uri: image.uri,
      name: image.fileName ?? `review-${index}.jpg`,
      type: image.mimeType ?? "image/jpeg",
    } as any);
  });

  const { data } = await axiosInstance.post("/api/v1/diggings", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}

export async function patchFeedApi(
  diggingId: number,
  body: string,
  keepImageUrls: string[],
  images: ImagePickerAsset[],
) {
  const formData = new FormData();

  formData.append("request", {
    string: JSON.stringify({
      body,
      keepImageUrls,
    }),
    type: "application/json",
  } as any);

  images.forEach((image, index) => {
    formData.append("images", {
      uri: image.uri,
      name: image.fileName ?? `review-${index}.jpg`,
      type: image.mimeType ?? "image/jpeg",
    } as any);
  });

  const { data } = await axiosInstance.patch(
    `/api/v1/diggings/${diggingId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return data;
}

export async function postLikeFeedApi(diggingId: number) {
  return axiosInstance.post(`/api/v1/diggings/${diggingId}/like`);
}

export async function getFeedApi(diggingId: number) {
  return axiosInstance.get(`/api/v1/diggings/${diggingId}`);
}

export async function deleteFeedApi(diggingId: number) {
  return axiosInstance.delete(`/api/v1/diggings/${diggingId}`);
}
