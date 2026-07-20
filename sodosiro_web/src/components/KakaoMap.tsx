import { useEffect, useRef } from "react";
import { Map, useKakaoLoader } from "react-kakao-maps-sdk";

import { createMarkers, type MarkerImages } from "../util/createMarkers";
import { registerMapClick } from "../util/registerMapClick";

export default function KakaoMap() {
  useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_MAP_KEY,
    libraries: ["clusterer"],
  });

  const clustererRef = useRef<kakao.maps.MarkerClusterer | null>(null);

  const selectedMarkerRef = useRef<kakao.maps.Marker | null>(null);

  const imageCacheRef = useRef(new globalThis.Map<string, MarkerImages>());

  const markerImageMapRef = useRef(
    new WeakMap<kakao.maps.Marker, MarkerImages>(),
  );

  const handleCreate = (map: kakao.maps.Map) => {
    const clusterer = new kakao.maps.MarkerClusterer({
      map,
      averageCenter: true,
      minLevel: 5,

      calculator: [20, 100],

      texts: (count) => `${count}`,

      styles: MarkerStyles,
    });

    clustererRef.current = clusterer;

    registerMapClick({
      map,
      markerImageMap: markerImageMapRef.current,
      selectedMarkerRef,
    });

    // RN에게 지도 준비 완료 알림
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        type: "MAP_READY",
      }),
    );
  };

  const renderPlaces = (places: PlaceType[]) => {
    if (!clustererRef.current) return;

    clustererRef.current.clear();

    selectedMarkerRef.current = null;

    const markers = createMarkers({
      places,
      imageCache: imageCacheRef.current,
      markerImageMap: markerImageMapRef.current,
      selectedMarkerRef,
    });

    clustererRef.current.addMarkers(markers);
  };

  useEffect(() => {
    const receiveMessage = (event: MessageEvent) => {
      const data =
        typeof event.data === "string" ? JSON.parse(event.data) : event.data;

      switch (data.type) {
        case "SET_PLACES":
          renderPlaces(data.places);
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

  return (
    <Map
      // 추후에 위치추적 기능 추가
      center={{
        lat: 37.5665,
        lng: 126.978,
      }}
      level={5}
      style={{
        width: "100vw",
        height: "100vh",
      }}
      onCreate={handleCreate}
    />
  );
}

const MarkerStyles = [
  {
    width: "32px",
    height: "32px",
    opacity: 0.8,
    background: "#C4D96A",
    borderRadius: "999px",
    color: "#1A1A1A",
    fontSize: "14px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 0 0 4px #C3D96A50, 0 0 0 8px #C3D96A30",
  },
  {
    width: "42px",
    height: "42px",
    opacity: 0.8,
    background: "#A9C92D",
    borderRadius: "999px",
    color: "#1A1A1A",
    fontSize: "16px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 0 0 5px #A9C92D50, 0 0 0 10px #A9C92D30",
  },
  {
    width: "52px",
    height: "52px",
    opacity: 0.8,
    background: "#7E9432",
    borderRadius: "999px",
    color: "#1A1A1A",
    fontSize: "18px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 0 0 6px #7E943250, 0 0 0 12px #7E943230",
  },
];
