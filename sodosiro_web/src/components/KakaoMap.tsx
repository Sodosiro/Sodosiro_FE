import { useRef } from "react";

import { Map, useKakaoLoader } from "react-kakao-maps-sdk";

import { useClusterer } from "../hooks/useClusterer";
import { useCurrentLocationMarker } from "../hooks/useCurrentLocationMarker";
import { useMarker } from "../hooks/useMarker";
import { useMarkers } from "../hooks/useMarkers";
import { useRoute } from "../hooks/useRoute";
import { useWebViewMessage } from "../hooks/useWebViewMessage";

export default function KakaoMap() {
  const params = new URLSearchParams(window.location.search);

  const lat = Number(params.get("lat"));
  const lng = Number(params.get("lng"));
  const level = Number(params.get("level"));

  const isExplore = params.get("explore") === "true";

  useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_MAP_KEY,
    libraries: ["clusterer"],
  });

  const mapRef = useRef<kakao.maps.Map | null>(null);

  const {
    create: createCluster,
    setMarkers,
    getClusterByMarker,
    isMarkerBounding,
    isMarkerRendering,
  } = useClusterer();

  const {
    create: createMarkers,
    updateMarkers,
    selectMarkerByPlaceId,
    clearSelectedMarker,
    getMarkers,
  } = useMarkers(
    mapRef,
    getClusterByMarker,
    isMarkerRendering,
    isMarkerBounding,
  );

  const { create: createMarker } = useMarker();

  const { drawRoute } = useRoute();

  const { updateLocation, startTracking, stopTracking, denyLocation } =
    useCurrentLocationMarker(mapRef);

  const renderPlaces = (places: PlaceType[]) => {
    clearSelectedMarker();

    const markers = createMarkers(places);
    setMarkers(markers);
  };

  const searchPlaces = (placeIds: number[]) => {
    clearSelectedMarker();

    const markers = getMarkers(placeIds);
    setMarkers(markers);

    if (placeIds.length > 0) {
      selectMarkerByPlaceId(placeIds[0]);
    }
  };

  const searchInitialize = (placeIds: number[]) => {
    clearSelectedMarker();

    const markers = getMarkers(placeIds);
    setMarkers(markers);
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
    clearSelectedMarker,
    updateMarkers,
    searchPlaces,
    searchInitialize,
  });

  const handleCreate = (map: kakao.maps.Map) => {
    mapRef.current = map;

    map.setCopyrightPosition(kakao.maps.CopyrightPosition.BOTTOMRIGHT, true);

    if (isExplore) {
      const mapContainer = map.getNode();

      const copyright = mapContainer.querySelector(
        'div[style*="bottom: 0px"][style*="right: 0px"]',
      ) as HTMLElement | null;

      if (copyright) {
        copyright.style.bottom = "110px";
      }
    }
    createCluster(map);

    kakao.maps.event.addListener(map, "dragstart", stopTracking);

    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        type: "MAP_READY",
      }),
    );
  };

  return (
    <div
      className={`w-screen h-screen flex flex-col items-center justify-center`}
    >
      <div className={`w-screen h-screen`}>
        <Map
          ref={mapRef}
          center={{
            lat: lat || 37.8528,
            lng: lng || 128.2555,
          }}
          level={level || 12}
          style={{
            width: "100%",
            height: isExplore ? "calc(100% + 100px)" : "100%",
          }}
          onCreate={handleCreate}
        />
      </div>
    </div>
  );
}
