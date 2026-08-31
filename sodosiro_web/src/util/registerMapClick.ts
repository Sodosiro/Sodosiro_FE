export function registerMapClick({
  map,
  clearSelectedMarker,
}: {
  map: kakao.maps.Map;

  clearSelectedMarker: () => void;
}) {
  kakao.maps.event.addListener(map, "click", () => {
    clearSelectedMarker();

    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        type: "MARKER_SELECTED",
        place: null,
      }),
    );
  });
}
