import {
  getMarkerIcon,
  getSelectedMarkerIcon,
} from "./getMarkerIcon";

export type MarkerImages = {
  normal: kakao.maps.MarkerImage;
  selected: kakao.maps.MarkerImage;
};

export function createMarkers({
  places,
  markerImageMap,
  imageCache,
  selectedMarkerRef,
}: {
  places: PlaceType[];
  markerImageMap: WeakMap<
    kakao.maps.Marker,
    MarkerImages
  >;
  imageCache: Map<
    string,
    MarkerImages
  >;
  selectedMarkerRef: React.MutableRefObject<
    kakao.maps.Marker | null
  >;
}) {
  return places.map((item) => {
    if (!imageCache.has(item.category)) {
      imageCache.set(item.category, {
        normal: new kakao.maps.MarkerImage(
          getMarkerIcon(item.category),
          new kakao.maps.Size(24, 24)
        ),
        selected: new kakao.maps.MarkerImage(
          getSelectedMarkerIcon(item.category)!,
          new kakao.maps.Size(60, 60)
        ),
      });
    }

    const images = imageCache.get(item.category)!;

    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(
        item.lat,
        item.lng
      ),
      image: images.normal,
    });

    markerImageMap.set(marker, images);

    kakao.maps.event.addListener(marker, "click", () => {
      if (selectedMarkerRef.current === marker) return;

      if (selectedMarkerRef.current) {
        const prev = markerImageMap.get(
          selectedMarkerRef.current
        );

        if (prev) {
          selectedMarkerRef.current.setImage(prev.normal);
        }
      }

      marker.setImage(images.selected);
      selectedMarkerRef.current = marker;

      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: "MARKER_CLICK",
            place: item,
          })
        );
      }
    });

    return marker;
  });
}