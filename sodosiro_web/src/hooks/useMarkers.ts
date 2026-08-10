import { useRef } from "react";
import getLabel from "../components/Marker";
import { NumberToCategory } from "../util/category";
import { getMarkerIcon, getSelectedMarkerIcon } from "../util/getMarkerIcon";

export function useMarkers(mapRef: React.RefObject<kakao.maps.Map | null>) {
  const selectedMarkerRef = useRef<kakao.maps.Marker | null>(null);
  const overlayRef = useRef<kakao.maps.CustomOverlay | null>(null);

  const imageCacheRef = useRef(new Map<string, MarkerImages>());

  const markerImageMapRef = useRef(
    new WeakMap<kakao.maps.Marker, MarkerImages>(),
  );

  const markerPlaceMapRef = useRef(new Map<kakao.maps.Marker, PlaceType>());

  const selectMarker = (marker: kakao.maps.Marker, place: PlaceType) => {
    if (selectedMarkerRef.current === marker) {
      return;
    }

    // 이전 선택 마커 복구
    if (selectedMarkerRef.current) {
      const prevImage = markerImageMapRef.current.get(
        selectedMarkerRef.current,
      );

      if (prevImage) {
        selectedMarkerRef.current.setImage(prevImage.normal);
        selectedMarkerRef.current.setZIndex(0);
      }
    }

    // 기존 overlay 제거
    overlayRef.current?.setMap(null);

    const images = markerImageMapRef.current.get(marker);

    if (images) {
      marker.setImage(images.selected);
      marker.setZIndex(999);
    }

    selectedMarkerRef.current = marker;

    // overlay 생성
    const overlay = new kakao.maps.CustomOverlay({
      position: marker.getPosition(),
      content: getLabel(place.title),
      yAnchor: 0,
    });

    overlay.setMap(mapRef.current);

    overlayRef.current = overlay;
  };

  const create = (places: PlaceType[]) => {
    selectedMarkerRef.current = null;
    markerPlaceMapRef.current.clear();

    return places.map((place) => {
      if (!imageCacheRef.current.has(NumberToCategory[place.category])) {
        imageCacheRef.current.set(NumberToCategory[place.category], {
          normal: new kakao.maps.MarkerImage(
            getMarkerIcon(
              NumberToCategory[place.category],
              place.liked,
              place.isPopular,
            ),
            new kakao.maps.Size(24, 24),
          ),
          selected: new kakao.maps.MarkerImage(
            getSelectedMarkerIcon(
              NumberToCategory[place.category],
              place.liked,
              place.isPopular,
            ),
            new kakao.maps.Size(60, 60),
          ),
        });
      }

      const images = imageCacheRef.current.get(
        NumberToCategory[place.category],
      )!;

      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(place.mapY, place.mapX),
        image: images.normal,
        zIndex: 0,
      });

      markerImageMapRef.current.set(marker, images);

      markerPlaceMapRef.current.set(marker, place);

      kakao.maps.event.addListener(marker, "click", () => {
        selectMarker(marker, place);

        mapRef.current?.panTo(marker.getPosition());

        window.ReactNativeWebView?.postMessage(
          JSON.stringify({
            type: "MARKER_SELECTED",
            place: place,
          }),
        );
      });

      return marker;
    });
  };

  const selectMarkerByPlaceId = (placeId: number) => {
    const target = [...markerPlaceMapRef.current.entries()]
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .find(([_, place]) => place.contentId === placeId);

    if (!target) return null;

    const [marker, place] = target;

    selectMarker(marker, place);

    mapRef.current?.panTo(marker.getPosition());

    return marker;
  };

  const clearSelectedMarker = () => {
    selectedMarkerRef.current = null;
    overlayRef.current?.setMap(null);
    overlayRef.current = null;
  };

  return {
    create,
    selectMarker,
    selectMarkerByPlaceId,
    clearSelectedMarker,
    selectedMarkerRef,
    markerImageMapRef,
    overlayRef,
  };
}
