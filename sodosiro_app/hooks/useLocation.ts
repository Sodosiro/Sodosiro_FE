import { useLocationStore } from "@/stores/useLocationStore";
import * as Location from "expo-location";
import { useEffect } from "react";

export function useLocation() {
  const isDenied = useLocationStore((state) => state.isDenied);
  const setIsDenied = useLocationStore((state) => state.setIsDenied);
  const setLocation = useLocationStore((state) => state.setLocation);

  useEffect(() => {
    let subscription: Location.LocationSubscription | undefined;

    const start = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setIsDenied(true);
        setLocation({
          latitude: 37.8528,
          longitude: 128.2555,
        });
        return;
      }

      setIsDenied(false);
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      });

      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          distanceInterval: 3,
          timeInterval: 1000,
        },
        ({ coords }) => {
          setLocation({
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
  }, [isDenied]);
}
