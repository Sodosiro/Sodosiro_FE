import { LOCATION_TASK_NAME } from "@/tasks/locationTask";
import * as Location from "expo-location";
import { useEffect } from "react";

export function useLocationTracking() {
  useEffect(() => {
    const startTracking = async () => {
      try {
        const isRunning =
          await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);

        if (isRunning) {
          return;
        }
        const foreground = await Location.requestForegroundPermissionsAsync();

        if (foreground.status !== "granted") {
          return;
        }

        const background = await Location.requestBackgroundPermissionsAsync();

        if (background.status !== "granted") {
          return;
        }

        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          accuracy: Location.Accuracy.Balanced,
          distanceInterval: 100,
          timeInterval: 10000,
          pausesUpdatesAutomatically: false,
        });
      } catch (error) {
        console.error("위치 추적 시작 실패:", error);
      }
    };

    startTracking();
  }, []);
}
