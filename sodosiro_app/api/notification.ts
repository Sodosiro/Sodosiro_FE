import { axiosInstance } from "./instance";

type GetNotificationsParams = {
  cursor?: number;
  size?: number;
};

export async function putFcmToken(deviceId: string, fcmToken: string) {
  return axiosInstance.put(`/api/v1/devices/${deviceId}/push-token`, {
    fcmToken,
    platform: "ANDROID",
  });
}

export async function getNotifications(params?: GetNotificationsParams) {
  return axiosInstance.get(`/api/v1/notifications`, { params });
}

export async function patchNotificationRead(notificationId: number) {
  return axiosInstance.patch(`/api/v1/notifications/${notificationId}/read`);
}

export async function patchAllNotificationsRead() {
  return axiosInstance.patch(`/api/v1/notifications/read-all`);
}
