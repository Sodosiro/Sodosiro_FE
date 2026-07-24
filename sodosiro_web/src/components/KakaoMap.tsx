import { useEffect, useRef } from "react";
import { Map, useKakaoLoader } from "react-kakao-maps-sdk";
import { registerMapClick } from "../util/registerMapClick";
import { useClusterer } from "../hooks/useClusterer";
import { useMarkers } from "../hooks/useMarkers";
import { useRoute } from "../hooks/useRoute";

export default function KakaoMap() {
  useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_MAP_KEY,
    libraries: ["clusterer"],
  });

  const mapRef = useRef<kakao.maps.Map | null>(null);

  const {
    create: createMarker,
    selectedMarkerRef,
    markerImageMapRef,
  } = useMarkers();
  const { create: createCluster, setMarkers } = useClusterer();
  const { drawRoute } = useRoute();

  const handleCreate = (map: kakao.maps.Map) => {
    mapRef.current = map;

    createCluster(map);

    registerMapClick({
      map,
      markerImageMapRef: markerImageMapRef.current,
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
    const markers = createMarker(places);
    setMarkers(markers);
  };

  useEffect(() => {
    const receiveMessage = (event: MessageEvent) => {
      const data =
        typeof event.data === "string" ? JSON.parse(event.data) : event.data;

      switch (data.type) {
        case "SET_PLACES":
          renderPlaces(data.places);
          break;

        case "SET_ROUTE":
          if (!mapRef.current) return;
          drawRoute(mapRef.current, data.routeInfo);
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
    <div
      className={`w-screen h-screen flex flex-col justify-center items-center`}
    >
      <div className={`w-screen min-h-200 h-screen`}>
        <Map
          // 추후에 위치추적 기능 추가
          center={{
            lat: 37.5665,
            lng: 126.978,
          }}
          level={5}
          style={{
            width: "100vw",
            height: "100%",
          }}
          onCreate={handleCreate}
        />
      </div>
    </div>
  );
}
