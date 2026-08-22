import { LOCATION_TASK_NAME } from "@/tasks/locationTask";
import * as Location from "expo-location";
import { useEffect } from "react";

export function useLocationTracking() {
  useEffect(() => {
    const startTracking = async () => {
      try {
        const isRunning =
          await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);

        console.log("기존 Task:", isRunning);

        if (isRunning) {
          await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);

          console.log("기존 Task 중지");
        }

        const foreground = await Location.requestForegroundPermissionsAsync();

        console.log("foreground:", foreground.status);

        if (foreground.status !== "granted") {
          console.log("위치 권한이 없습니다.");
          return;
        }

        // 여기부터 백그라운드 권한 요청
        const background = await Location.requestBackgroundPermissionsAsync();

        console.log("background:", background.status);

        if (background.status !== "granted") {
          console.log("백그라운드 위치 권한이 없습니다.");
          return;
        }

        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          accuracy: Location.Accuracy.Balanced,
          distanceInterval: 100,
          pausesUpdatesAutomatically: false,
        });

        console.log("위치 추적 시작");
      } catch (error) {
        console.error("위치 추적 시작 실패:", error);
      }
    };

    startTracking();
  }, []);
}
