import { ImagePickerAsset } from "expo-image-picker";
import { axiosInstance } from "./instance";

export type GetReviewsParams = {
  cursor?: number;
  size?: number;
  sort?: "RECENT" | "HIGH_RATING" | "LOW_RATING";
  hasImage?: boolean;
};

export async function getReviewsApi(
  contentId: number,
  params?: GetReviewsParams,
) {
  return axiosInstance.get(`/api/v1/spots/${contentId}/reviews`, { params });
}

export async function postReviewApi(
  contentId: number,
  rating: number,
  body: string,
  images: ImagePickerAsset[],
) {
  const formData = new FormData();

  formData.append("request", {
    string: JSON.stringify({
      contentId,
      rating,
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

  const { data } = await axiosInstance.post("/api/v1/reviews", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}

export async function patchReviewApi(
  reviewId: number,
  rating: number,
  body: string,
  images: ImagePickerAsset[],
  keepImageUrls?: string[],
) {
  const formData = new FormData();

  formData.append("request", {
    string: JSON.stringify({
      rating,
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

  const { data } = await axiosInstance.patch<User>(
    `/api/v1/reviews/${reviewId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return data;
}

export async function getMyReviewApi(reviewId: number) {
  return axiosInstance.get(`/api/v1/reviews/${reviewId}`);
}

export async function getMyReviewsApi(params?: GetReviewsParams) {
  return axiosInstance.get(`/api/v1/reviews/me`, { params });
}

export async function deleteReviewApi(reviewId: number) {
  return axiosInstance.delete(`/api/v1/reviews/${reviewId}`);
}
