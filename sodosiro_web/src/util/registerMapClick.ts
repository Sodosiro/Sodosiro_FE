export function registerMapClick({
  map,
  markerImageMapRef,
  selectedMarkerRef,
  overlayRef: overlayRef,
}: {
  map: kakao.maps.Map;
  markerImageMapRef: WeakMap<kakao.maps.Marker, MarkerImages>;
  selectedMarkerRef: React.RefObject<kakao.maps.Marker | null>;
  overlayRef: React.RefObject<kakao.maps.CustomOverlay | null>;
}) {
  kakao.maps.event.addListener(map, "click", () => {
    overlayRef.current?.setMap(null);
    overlayRef.current = null;

    if (!selectedMarkerRef.current) return;

    const images = markerImageMapRef.get(selectedMarkerRef.current);

    if (images) {
      selectedMarkerRef.current.setImage(images.normal);
      selectedMarkerRef.current.setZIndex(0);
    }

    selectedMarkerRef.current = null;
  });
}
