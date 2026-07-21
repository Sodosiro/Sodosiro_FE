import type { MarkerImages } from "./createMarkers";

export function registerMapClick({
  map,
  markerImageMap,
  selectedMarkerRef,
}: {
  map: kakao.maps.Map;
  markerImageMap: WeakMap<kakao.maps.Marker, MarkerImages>;
  selectedMarkerRef: React.MutableRefObject<kakao.maps.Marker | null>;
}) {
  kakao.maps.event.addListener(map, "click", () => {
    if (!selectedMarkerRef.current) return;

    const images = markerImageMap.get(selectedMarkerRef.current);

    if (images) {
      selectedMarkerRef.current.setImage(images.normal);
      selectedMarkerRef.current.setZIndex(0);
    }

    selectedMarkerRef.current = null;
  });
}