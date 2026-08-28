import { ImagePickerAsset } from "expo-image-picker";
import { axiosInstance } from "./instance";

export async function getMeApi() {
  const { data } = await axiosInstance.get<User>("/api/v1/me");
  return data;
}

export async function patchMeApi(user: {
  nickName: string;
  profileImage: string | ImagePickerAsset | null;
  introduction: string | null;
}) {
  const formData = new FormData();
  const image = user.profileImage;

  formData.append("request", {
    string: JSON.stringify({
      nickName: user.nickName,
      introduction: user.introduction ?? "",
      removeImage: !image,
    }),
    type: "application/json",
  } as any);

  if (image !== null && typeof image !== "string") {
    formData.append("image", {
      uri: image.uri,
      name: image.fileName ?? "profile.jpg",
      type: image.mimeType ?? "image/jpeg",
    } as any);
  }

  const { data } = await axiosInstance.patch<User>("/api/v1/me", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}
