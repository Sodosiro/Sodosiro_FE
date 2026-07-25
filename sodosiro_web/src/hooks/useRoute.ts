import { useCallback, useEffect, useRef } from "react";
import { ArrivalMarker, DepartMarker, TransitMarker } from "../assets/svgs";

export function useRoute() {
  const outlineRef = useRef<kakao.maps.Polyline | null>(null);
  const inlineRef = useRef<kakao.maps.Polyline | null>(null);
  const dashRef = useRef<kakao.maps.Polyline | null>(null);
  const markerRefs = useRef<kakao.maps.Marker[]>([]);

  const clearMarkers = useCallback(() => {
    markerRefs.current.forEach((marker) => {
      marker.setMap(null);
    });

    markerRefs.current = [];
  }, []);

  const createMarker = useCallback(
    (
      map: kakao.maps.Map,
      position: { x: number; y: number },
      image: kakao.maps.MarkerImage,
    ) => {
      const marker = new kakao.maps.Marker({
        map,
        position: new kakao.maps.LatLng(position.y, position.x),
        image,
      });

      markerRefs.current.push(marker);
    },
    [],
  );

  const drawRoute = useCallback((map: kakao.maps.Map, routeInfo: RouteInfo) => {
    clearMarkers();
    outlineRef.current?.setMap(null);
    inlineRef.current?.setMap(null);
    dashRef.current?.setMap(null);

    const bounds = new kakao.maps.LatLngBounds(
      new kakao.maps.LatLng(routeInfo.bound.min_y, routeInfo.bound.min_x),
      new kakao.maps.LatLng(routeInfo.bound.max_y, routeInfo.bound.max_x),
    );

    const path = routeInfo.sections.flatMap((section) =>
      section.roads.flatMap((road) =>
        road.vertexes.reduce<kakao.maps.LatLng[]>((acc, _, index, arr) => {
          if (index % 2 === 0) {
            acc.push(
              new kakao.maps.LatLng(
                arr[index + 1], // lat(y)
                arr[index], // lng(x)
              ),
            );
          }
          return acc;
        }, []),
      ),
    );

    outlineRef.current = new kakao.maps.Polyline({
      map,
      path,
      strokeWeight: 8,
      strokeColor: "#FFFFFF",
      strokeOpacity: 1,
    });

    inlineRef.current = new kakao.maps.Polyline({
      map,
      path,
      strokeWeight: 6,
      strokeColor: "#2D7FF9",
      strokeOpacity: 1,
    });

    dashRef.current = new kakao.maps.Polyline({
      map,
      path,
      strokeWeight: 2,
      strokeColor: "#FFFFFF",
      strokeOpacity: 1,
      strokeStyle: "dash",
    });

    const originImage = new kakao.maps.MarkerImage(
      DepartMarker,
      new kakao.maps.Size(60, 60),
      {
        offset: new kakao.maps.Point(30, 60),
      },
    );

    const destinationImage = new kakao.maps.MarkerImage(
      ArrivalMarker,
      new kakao.maps.Size(60, 60),
      {
        offset: new kakao.maps.Point(30, 60),
      },
    );

    const waypointImage = new kakao.maps.MarkerImage(
      TransitMarker,
      new kakao.maps.Size(60, 60),
      {
        offset: new kakao.maps.Point(30, 60),
      },
    );
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        type: "MARKER_IMAGE",
      }),
    );
    createMarker(map, routeInfo.origin, originImage);
    createMarker(map, routeInfo.destination, destinationImage);
    routeInfo.waypoints.forEach((waypoint) => {
      createMarker(map, waypoint, waypointImage);
    });

    map.setBounds(bounds);
  }, []);

  useEffect(() => {
    return () => {
      outlineRef.current?.setMap(null);
      inlineRef.current?.setMap(null);
      dashRef.current?.setMap(null);
      clearMarkers();
    };
  }, [clearMarkers, createMarker]);

  return { drawRoute };
}
