import { useLocationStore } from "@/stores/useLocationStore";
import * as Location from "expo-location";
import { useEffect } from "react";

type SendLocation = (
  location: {
    latitude: number;
    longitude: number;
  },
  denied?: boolean,
) => void;

export function useLocation(sendLocation: SendLocation, isMapReady: boolean) {
  const setIsDenied = useLocationStore((state) => state.setIsDenied);

  useEffect(() => {
    if (!isMapReady) return;

    let subscription: Location.LocationSubscription | undefined;

    const start = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setIsDenied(true);
        sendLocation(
          {
            latitude: 37.8528,
            longitude: 128.2555,
          },
          true,
        );
        return;
      }

      setIsDenied(false);
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      });

      sendLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          distanceInterval: 3,
          timeInterval: 1000,
        },
        ({ coords }) => {
          sendLocation({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        },
      );
    };

    start();

    return () => {
      subscription?.remove();
    };
  }, [isMapReady]);
}
