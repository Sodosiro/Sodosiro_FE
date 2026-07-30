import { useRef } from "react";
import { CurrentLocation } from "../assets/svgs";

export function useCurrentLocationMarker(
  mapRef: React.RefObject<kakao.maps.Map | null>,
) {
  const markerRef = useRef<kakao.maps.Marker | null>(null);
  const isTrackingRef = useRef(true);

  const denyLocation = () => {
    isTrackingRef.current = false;

    markerRef.current?.setMap(null);
    markerRef.current = null;

    mapRef.current?.setCenter(new kakao.maps.LatLng(37.5665, 126.978));
  };

  const updateLocation = (latitude: number, longitude: number) => {
    if (!mapRef.current) return;

    const position = new kakao.maps.LatLng(latitude, longitude);

    if (!markerRef.current) {
      markerRef.current = new kakao.maps.Marker({
        map: mapRef.current,
        position,
        image: new kakao.maps.MarkerImage(
          CurrentLocation,
          new kakao.maps.Size(40, 40),
        ),
      });
    } else {
      markerRef.current.setPosition(position);
    }

    if (isTrackingRef.current) {
      mapRef.current.panTo(position);
    }

    return position;
  };

  const startTracking = () => {
    isTrackingRef.current = true;

    if (markerRef.current) {
      mapRef.current?.panTo(markerRef.current.getPosition());
    }
  };

  const stopTracking = () => {
    isTrackingRef.current = false;

    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        type: "STOP_TRACKING",
      }),
    );
  };

  return {
    updateLocation,
    startTracking,
    stopTracking,
    denyLocation,
  };
}
