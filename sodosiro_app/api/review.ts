import { ImagePickerAsset } from "expo-image-picker";
import { axiosInstance } from "./instance";

export type GetReviewsParams = {
  cursor?: number;
  size?: number;
  sort?: "RECENT" | "HIGH_RATING" | "LOW_RATING";
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

  console.log(rating);

  images.forEach((image, index) => {
    formData.append("images", {
      uri: image.uri,
      name: image.fileName ?? `review-${index}.jpg`,
      type: image.mimeType ?? "image/jpeg",
    } as any);
  });

  const { data } = await axiosInstance.post<User>("/api/v1/reviews", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}
