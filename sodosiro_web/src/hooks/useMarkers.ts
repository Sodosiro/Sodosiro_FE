import { useRef } from "react";
import getLabel from "../components/Marker";
import { getMarkerIcon, getSelectedMarkerIcon } from "../util/getMarkerIcon";

export function useMarkers() {
  const selectedMarkerRef = useRef<kakao.maps.Marker | null>(null);
  const overlayRef = useRef<kakao.maps.CustomOverlay | null>(null);

  const imageCacheRef = useRef(new Map<string, MarkerImages>());

  const markerImageMapRef = useRef(
    new WeakMap<kakao.maps.Marker, MarkerImages>(),
  );

  const create = (places: PlaceType[]) => {
    selectedMarkerRef.current = null;

    return places.map((place) => {
      if (!imageCacheRef.current.has(place.category)) {
        imageCacheRef.current.set(place.category, {
          normal: new kakao.maps.MarkerImage(
            getMarkerIcon(place.category, place.favorite, place.popular),
            new kakao.maps.Size(24, 24),
          ),
          selected: new kakao.maps.MarkerImage(
            getSelectedMarkerIcon(
              place.category,
              place.favorite,
              place.popular,
            ),
            new kakao.maps.Size(60, 60),
          ),
        });
      }

      const images = imageCacheRef.current.get(place.category)!;

      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(place.lat, place.lng),
        image: images.normal,
        zIndex: 0,
      });

      markerImageMapRef.current.set(marker, images);

      kakao.maps.event.addListener(marker, "click", () => {
        if (selectedMarkerRef.current) {
          const prev = markerImageMapRef.current.get(selectedMarkerRef.current);

          if (prev) {
            selectedMarkerRef.current.setImage(prev.normal);
            selectedMarkerRef.current.setZIndex(0);
          }
        }

        overlayRef.current?.setMap(null);

        // 현재 마커 선택
        marker.setImage(images.selected);
        marker.setZIndex(999);

        selectedMarkerRef.current = marker;

        const overlay = new kakao.maps.CustomOverlay({
          position: marker.getPosition(),
          content: getLabel(place.title),
          yAnchor: 0,
        });

        overlay.setMap(marker.getMap());

        overlayRef.current = overlay;

        window.ReactNativeWebView?.postMessage(
          JSON.stringify({
            type: "MARKER_CLICK",
            place: place,
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
    overlayRef,
  };
}
