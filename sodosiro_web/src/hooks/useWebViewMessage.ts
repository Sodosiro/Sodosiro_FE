import { useEffect } from "react";

export function useWebViewMessage({
  mapRef,
  createCluster,
  renderPlaces,
  createMarker,
  drawRoute,
  updateLocation,
  startTracking,
  denyLocation,
}: {
  mapRef: React.RefObject<kakao.maps.Map | null>;
  createCluster: () => void;
  renderPlaces: (places: PlaceType[]) => void;
  createMarker: (map: kakao.maps.Map, place: PlaceType) => void;
  drawRoute: (map: kakao.maps.Map, route: RouteInfo) => void;
  updateLocation: (lat: number, lng: number) => kakao.maps.LatLng | undefined;
  startTracking: () => void;
  denyLocation: () => void;
}) {
  useEffect(() => {
    const receiveMessage = (event: MessageEvent) => {
      const data =
        typeof event.data === "string" ? JSON.parse(event.data) : event.data;

      switch (data.type) {
        case "SET_PLACES":
          if (!mapRef.current) return;
          createCluster();
          renderPlaces(data.places);
          break;

        case "SET_ROUTE":
          if (!mapRef.current) return;
          drawRoute(mapRef.current, data.routeInfo);
          break;

        case "SET_PLACE":
          if (!mapRef.current) return;
          createMarker(mapRef.current, data.place);
          break;

        case "UPDATE_LOCATION":
          updateLocation(data.latitude, data.longitude);
          if (data.initial) {
            window.ReactNativeWebView?.postMessage(
              JSON.stringify({
                type: "LOCATION_READY",
              }),
            );
          }
          break;

        case "DENY_LOCATION":
          denyLocation();
          window.ReactNativeWebView?.postMessage(
            JSON.stringify({
              type: "LOCATION_READY",
            }),
          );
          break;

        case "START_TRACKING":
          startTracking();
          break;
      }
    };

    window.addEventListener("message", receiveMessage);

    document.addEventListener("message", receiveMessage as EventListener);

    return () => {
      window.removeEventListener("message", receiveMessage);

      document.removeEventListener("message", receiveMessage as EventListener);
    };
  }, []);
}
