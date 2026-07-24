import { useRef } from "react";
import { getMarkerIcon, getSelectedMarkerIcon } from "../util/getMarkerIcon";

export type MarkerImages = {
  normal: kakao.maps.MarkerImage;
  selected: kakao.maps.MarkerImage;
};

export function useMarkers() {
  const selectedMarkerRef = useRef<kakao.maps.Marker | null>(null);

  const imageCacheRef = useRef(new Map<string, MarkerImages>());

  const markerImageMapRef = useRef(
    new WeakMap<kakao.maps.Marker, MarkerImages>(),
  );

  const create = (places: PlaceType[]) => {
    selectedMarkerRef.current = null;

    return places.map((item) => {
      if (!imageCacheRef.current.has(item.category)) {
        imageCacheRef.current.set(item.category, {
          normal: new kakao.maps.MarkerImage(
            getMarkerIcon(item.category, item.favorite, item.popular),
            new kakao.maps.Size(24, 24),
          ),
          selected: new kakao.maps.MarkerImage(
            getSelectedMarkerIcon(item.category, item.favorite, item.popular),
            new kakao.maps.Size(60, 60),
          ),
        });
      }

      const images = imageCacheRef.current.get(item.category)!;

      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(item.lat, item.lng),
        image: images.normal,
        zIndex: 0,
      });

      markerImageMapRef.current.set(marker, images);

      kakao.maps.event.addListener(marker, "click", () => {
        if (selectedMarkerRef.current === marker) return;

        if (selectedMarkerRef.current) {
          const prev = markerImageMapRef.current.get(selectedMarkerRef.current);

          if (prev) {
            selectedMarkerRef.current.setImage(prev.normal);
            selectedMarkerRef.current.setZIndex(0);
          }
        }

        marker.setImage(images.selected);
        marker.setZIndex(999);

        selectedMarkerRef.current = marker;

        window.ReactNativeWebView?.postMessage(
          JSON.stringify({
            type: "MARKER_CLICK",
            place: item,
          }),
        );
      });

      return marker;
    });
  };

  return {
    create,
    selectedMarkerRef,
    markerImageMapRef,
  };
}
