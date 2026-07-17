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

  const imageCacheRef = useRef(
    new globalThis.Map<string, MarkerImages>()
  );

  const markerImageMapRef = useRef(
    new WeakMap<kakao.maps.Marker, MarkerImages>()
  );

  const handleCreate = (map: kakao.maps.Map) => {
    const clusterer = new kakao.maps.MarkerClusterer({
      map,
      averageCenter: true,
      minLevel: 5,
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
        typeof event.data === "string"
          ? JSON.parse(event.data)
          : event.data;

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