export function registerMapClick({
  map,
  markerImageMapRef,
  selectedMarkerRef,
}: {
  map: kakao.maps.Map;
  markerImageMapRef: WeakMap<kakao.maps.Marker, MarkerImages>;
  selectedMarkerRef: React.RefObject<kakao.maps.Marker | null>;
}) {
  kakao.maps.event.addListener(map, "click", () => {
    if (!selectedMarkerRef.current) return;

    const images = markerImageMapRef.get(selectedMarkerRef.current);

    if (images) {
      selectedMarkerRef.current.setImage(images.normal);
      selectedMarkerRef.current.setZIndex(0);
    }

    selectedMarkerRef.current = null;
  });
}
