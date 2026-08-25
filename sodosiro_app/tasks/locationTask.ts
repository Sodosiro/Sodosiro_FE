import { postUpdateLocation } from "@/api/location";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";

export const LOCATION_TASK_NAME = "sodosiro-location-task";

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error("백그라운드 위치 오류:", error);
    return;
  }

  if (!data) return;

  const { locations } = data as {
    locations: Location.LocationObject[];
  };

  const location = locations[0];

  if (!location) return;

  const { latitude, longitude } = location.coords;

  try {
    postUpdateLocation({
      latitude,
      longitude,
      accuracy: 100,
      occurredAt: new Date(),
    });
    // 서버 API 호출
  } catch (error) {
    console.error("위치 전송 실패:", error);
  }
});
