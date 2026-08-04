import { useRef } from "react";
import { Map, useKakaoLoader } from "react-kakao-maps-sdk";
import { useClusterer } from "../hooks/useClusterer";
import { useCurrentLocationMarker } from "../hooks/useCurrentLocationMarker";
import { useMarker } from "../hooks/useMarker";
import { useMarkers } from "../hooks/useMarkers";
import { useRoute } from "../hooks/useRoute";
import { useWebViewMessage } from "../hooks/useWebViewMessage";
import { registerMapClick } from "../util/registerMapClick";

export default function KakaoMap() {
  useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_MAP_KEY,
    libraries: ["clusterer"],
  });

  const mapRef = useRef<kakao.maps.Map | null>(null);

  const {
    create: createMarkers,
    selectMarkerByPlaceId,
    clearSelectedMarker,
    selectedMarkerRef,
    markerImageMapRef,
    overlayRef,
  } = useMarkers(mapRef);

  const { create: createCluster, setMarkers } = useClusterer();
  const { create: createMarker } = useMarker();
  const { drawRoute } = useRoute();

  const { updateLocation, startTracking, stopTracking, denyLocation } =
    useCurrentLocationMarker(mapRef);

  const renderPlaces = (places: PlaceType[], isPanTo = false) => {
    clearSelectedMarker();
    const markers = createMarkers(places);
    setMarkers(markers);
    if (places.length > 0 && isPanTo) {
      selectMarkerByPlaceId(places[0].id);
    }
  };

  useWebViewMessage({
    mapRef,
    renderPlaces,
    createMarker,
    drawRoute,
    updateLocation,
    startTracking,
    denyLocation,
    selectMarkerByPlaceId,
  });

  const handleCreate = (map: kakao.maps.Map) => {
    mapRef.current = map;

    createCluster(map);

    registerMapClick({
      map,
      markerImageMapRef: markerImageMapRef.current,
      selectedMarkerRef,
      overlayRef,
    });

    kakao.maps.event.addListener(map, "dragstart", stopTracking);

    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        type: "MAP_READY",
      }),
    );
  };

  return (
    <div
      className={`w-screen h-screen flex flex-col justify-center items-center`}
    >
      <div className={`w-screen min-h-250 h-screen`}>
        <Map
          ref={mapRef}
          center={{
            lat: 37.5665,
            lng: 126.978,
          }}
          level={5}
          style={{
            width: "100%",
            height: "100%",
          }}
          onCreate={handleCreate}
        />
      </div>
    </div>
  );
}
