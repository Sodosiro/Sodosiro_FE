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
  const getImageCacheKey = (place: PlaceType) => {
    const category = NumberToCategory[place.category];

    return `${category}-${place.liked}-${place.isPopular}`;
  };

  const getMarkerImages = (place: PlaceType): MarkerImages => {
    const category = NumberToCategory[place.category];
    const cacheKey = getImageCacheKey(place);

    const cachedImages = imageCacheRef.current.get(cacheKey);

    if (cachedImages) {
      return cachedImages;
    }

    const images: MarkerImages = {
      normal: new kakao.maps.MarkerImage(
        getMarkerIcon(category, place.liked, place.isPopular),
        new kakao.maps.Size(24, 24),
      ),

      selected: new kakao.maps.MarkerImage(
        getSelectedMarkerIcon(category, place.liked, place.isPopular),
        new kakao.maps.Size(60, 60),
      ),
    };

    imageCacheRef.current.set(cacheKey, images);

    return images;
  };

  const selectMarker = (marker: kakao.maps.Marker, place: PlaceType) => {
    if (selectedMarkerRef.current === marker) {
      return;
    }

    if (selectedMarkerRef.current) {
      const prevImage = markerImageMapRef.current.get(
        selectedMarkerRef.current,
      );

      if (prevImage) {
        selectedMarkerRef.current.setImage(prevImage.normal);

        selectedMarkerRef.current.setZIndex(0);
      }
    }

    overlayRef.current?.setMap(null);
    overlayRef.current = null;

    const images = markerImageMapRef.current.get(marker);

    if (images) {
      marker.setImage(images.selected);
      marker.setZIndex(999);
    }

    selectedMarkerRef.current = marker;

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

    overlayRef.current?.setMap(null);
    overlayRef.current = null;

    markerPlaceMapRef.current.clear();

    return places.map((place) => {
      const images = getMarkerImages(place);

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
            place,
          }),
        );
      });

      return marker;
    });
  };

  const updateMarkers = (places: PlaceType[]) => {
    for (const place of places) {
      const target = [...markerPlaceMapRef.current.entries()].find(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, markerPlace]) => markerPlace.contentId === place.contentId,
      );

      if (!target) continue;

      const [marker] = target;

      const images = getMarkerImages(place);

      markerImageMapRef.current.set(marker, images);
      markerPlaceMapRef.current.set(marker, place);

      const isSelected = selectedMarkerRef.current === marker;

      marker.setImage(isSelected ? images.selected : images.normal);
      marker.setZIndex(isSelected ? 999 : 0);
    }
  };

  const selectMarkerByPlaceId = (placeId: number) => {
    const target = [...markerPlaceMapRef.current.entries()].find(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, place]) => place.contentId === placeId,
    );

    if (!target) {
      return null;
    }

    const [marker, place] = target;

    selectMarker(marker, place);

    mapRef.current?.panTo(marker.getPosition());

    return marker;
  };

  const clearSelectedMarker = () => {
    const selectedMarker = selectedMarkerRef.current;

    if (selectedMarker) {
      const images = markerImageMapRef.current.get(selectedMarker);

      if (images) {
        selectedMarker.setImage(images.normal);
      }

      selectedMarker.setZIndex(0);
    }

    selectedMarkerRef.current = null;

    overlayRef.current?.setMap(null);
    overlayRef.current = null;
  };

  return {
    create,
    updateMarkers,
    selectMarker,
    selectMarkerByPlaceId,
    clearSelectedMarker,

    selectedMarkerRef,
    markerImageMapRef,
    overlayRef,
  };
}
