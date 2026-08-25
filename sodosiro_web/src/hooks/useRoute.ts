import { useCallback, useEffect, useRef } from "react";

const createPath = (path: RoutePoint[]) =>
  path.map(
    ({ longitude, latitude }) => new kakao.maps.LatLng(latitude, longitude),
  );

export function useRoute() {
  const polylineRefs = useRef<kakao.maps.Polyline[]>([]);
  const markerRefs = useRef<kakao.maps.CustomOverlay[]>([]);

  const clearRoutes = useCallback(() => {
    polylineRefs.current.forEach((polyline) => {
      polyline.setMap(null);
    });

    polylineRefs.current = [];
  }, []);

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
      index: number,
    ) => {
      const content = document.createElement("div");

      content.innerHTML = `
        <div
          style="
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #000000;
            color: #FFFFFF;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-weight: 700;
            border: 1px solid #FFFFFF;
            box-sizing: border-box;
          "
        >
          ${index + 1}
        </div>
      `;

      const marker = new kakao.maps.CustomOverlay({
        map,
        position: new kakao.maps.LatLng(position.y, position.x),
        content,
        yAnchor: 0.5,
        xAnchor: 0.5,
        zIndex: 10,
      });

      markerRefs.current.push(marker);
    },
    [],
  );

  const drawCarRoute = useCallback(
    (map: kakao.maps.Map, routeInfo: Extract<RouteInfo, { type: "CAR" }>) => {
      const path = createPath(routeInfo.paths);

      // 흰색 외곽
      const outline = new kakao.maps.Polyline({
        map,
        path,
        strokeWeight: 8,
        strokeColor: "#FFFFFF",
        strokeOpacity: 1,
        strokeStyle: "solid",
      });

      // 초록색 내부
      const inline = new kakao.maps.Polyline({
        map,
        path,
        strokeWeight: 6,
        strokeColor: "#7E9432",
        strokeOpacity: 1,
        strokeStyle: "solid",
      });

      // 가운데 흰색 점선
      const dash = new kakao.maps.Polyline({
        map,
        path,
        strokeWeight: 1.5,
        strokeColor: "#FFFFFF",
        strokeOpacity: 1,
        strokeStyle: "dash",
      });

      polylineRefs.current.push(outline, inline, dash);
    },
    [],
  );

  const drawTransitRoute = useCallback(
    (
      map: kakao.maps.Map,
      routeInfo: Extract<RouteInfo, { type: "TRANSIT" }>,
    ) => {
      routeInfo.routes.forEach((route) => {
        const path = createPath(route.path);

        const isWalking = route.type === "WALKING";

        if (isWalking) {
          const dash = new kakao.maps.Polyline({
            map,
            path,
            strokeWeight: 4,
            strokeColor: "#888888",
            strokeOpacity: 1,
            strokeStyle: "dashed",
          });

          polylineRefs.current.push(dash);

          return;
        }

        const outline = new kakao.maps.Polyline({
          map,
          path,
          strokeWeight: 8,
          strokeColor: "#FFFFFF",
          strokeOpacity: 1,
          strokeStyle: "solid",
        });

        const inline = new kakao.maps.Polyline({
          map,
          path,
          strokeWeight: 6,
          strokeColor: "#2A71FB",
          strokeOpacity: 1,
          strokeStyle: "solid",
        });

        const dash = new kakao.maps.Polyline({
          map,
          path,
          strokeWeight: 1.5,
          strokeColor: "#FFFFFF",
          strokeOpacity: 1,
          strokeStyle: "dash",
        });

        polylineRefs.current.push(outline, inline, dash);
      });
    },
    [],
  );

  const drawRoute = useCallback(
    (map: kakao.maps.Map, routeInfo: RouteInfo) => {
      // 이전 경로 / 마커 제거
      clearRoutes();
      clearMarkers();

      const bounds = new kakao.maps.LatLngBounds(
        new kakao.maps.LatLng(routeInfo.bound.min_y, routeInfo.bound.min_x),
        new kakao.maps.LatLng(routeInfo.bound.max_y, routeInfo.bound.max_x),
      );

      if (routeInfo.type === "CAR") {
        drawCarRoute(map, routeInfo);
      } else {
        drawTransitRoute(map, routeInfo);
      }

      createMarker(map, routeInfo.origin, routeInfo.origin.index);

      createMarker(map, routeInfo.destination, routeInfo.destination.index);

      map.setBounds(bounds);
    },
    [clearRoutes, clearMarkers, drawCarRoute, drawTransitRoute, createMarker],
  );

  useEffect(() => {
    return () => {
      clearRoutes();
      clearMarkers();
    };
  }, [clearRoutes, clearMarkers]);

  return {
    drawRoute,
  };
}
