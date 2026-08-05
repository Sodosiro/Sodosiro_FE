import { axiosInstance } from "./instance";

export async function getMeApi() {
  const { data } = await axiosInstance.get<User>("/api/v1/me");
  return data;
}

export async function patchMeApi(user: User) {
  const formData = new FormData();
  const image = user.profileImage;

  formData.append("request", {
    string: JSON.stringify({
      nickName: user.nickName,
      introduction: user.introduction ?? "",
    }),
    type: "application/json",
  } as any);

  // 기본 이미지로 변경 로직 백엔드 논의 후 수정 필요
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
