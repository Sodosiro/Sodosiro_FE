import { useRef } from "react";
import getLabel from "../components/Marker";
import { NumberToCategory } from "../util/category";
import { getMarkerIcon, getSelectedMarkerIcon } from "../util/getMarkerIcon";

export function useMarkers(
  mapRef: React.RefObject<kakao.maps.Map | null>,
  getClusterByMarker: (
    marker: kakao.maps.Marker,
  ) => kakao.maps.Cluster | undefined,
  isMarkerRendering: (marker: kakao.maps.Marker) => boolean,
  isMarkerBounding: (marker: kakao.maps.Marker) => boolean,
) {
  const selectedMarkerRef = useRef<kakao.maps.Marker | null>(null);
  const overlayRef = useRef<kakao.maps.CustomOverlay | null>(null);

  // 선택을 위해 강제로 표시한 마커 (원래 숨겨져 있던 경우에만 기록)
  const temporarilyShownMarkerRef = useRef<kakao.maps.Marker | null>(null);

  // 이미지 캐시
  const imageCacheRef = useRef(new Map<string, MarkerImages>());

  // 마커 -> 이미지
  const markerImageMapRef = useRef(
    new WeakMap<kakao.maps.Marker, MarkerImages>(),
  );

  // 마커 -> 장소
  const markerPlaceMapRef = useRef(new Map<kakao.maps.Marker, PlaceType>());

  // contentId -> 장소
  const placesRef = useRef(new Map<number, PlaceType>());

  // contentId -> 마커
  const markerByPlaceIdRef = useRef(new Map<number, kakao.maps.Marker>());

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

  /**
   * 마커 선택
   */
  const selectMarker = (marker: kakao.maps.Marker, place: PlaceType) => {
    if (selectedMarkerRef.current === marker) {
      return;
    }

    // 이전 선택 마커 원상복구
    if (selectedMarkerRef.current) {
      const prevImage = markerImageMapRef.current.get(
        selectedMarkerRef.current,
      );

      if (prevImage) {
        selectedMarkerRef.current.setImage(prevImage.normal);

        selectedMarkerRef.current.setZIndex(0);
      }
    }

    // 기존 오버레이 제거
    overlayRef.current?.setMap(null);
    overlayRef.current = null;

    // 선택 마커 이미지 변경
    const images = markerImageMapRef.current.get(marker);

    if (images) {
      marker.setImage(images.selected);
      marker.setZIndex(999);
    }

    selectedMarkerRef.current = marker;

    // 장소 이름 오버레이
    const overlay = new kakao.maps.CustomOverlay({
      position: marker.getPosition(),
      content: getLabel(place.title),
      yAnchor: 0,
    });

    overlay.setMap(mapRef.current);

    overlayRef.current = overlay;
  };

  /**
   * 마커 생성
   *
   * 최초에는 실제 마커를 생성하고,
   * 이미 존재하는 contentId라면 기존 마커를 재사용한다.
   */
  const create = (places: PlaceType[]) => {
    const markers: kakao.maps.Marker[] = [];

    places.forEach((place) => {
      // 장소 정보 저장
      placesRef.current.set(place.contentId, place);

      // 이미 만들어진 마커가 있는지 확인
      const existingMarker = markerByPlaceIdRef.current.get(place.contentId);

      if (existingMarker) {
        const images = getMarkerImages(place);

        markerImageMapRef.current.set(existingMarker, images);

        markerPlaceMapRef.current.set(existingMarker, place);

        existingMarker.setImage(images.normal);
        existingMarker.setZIndex(0);

        markers.push(existingMarker);

        return;
      }

      // 새로운 마커 생성
      const images = getMarkerImages(place);

      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(place.mapY, place.mapX),
        image: images.normal,
        zIndex: 0,
      });

      markerImageMapRef.current.set(marker, images);

      markerPlaceMapRef.current.set(marker, place);

      markerByPlaceIdRef.current.set(place.contentId, marker);

      kakao.maps.event.addListener(marker, "click", () => {
        // selectMarker(marker, place);

        mapRef.current?.panTo(marker.getPosition());

        window.ReactNativeWebView?.postMessage(
          JSON.stringify({
            type: "MARKER_SELECTED",
            place,
          }),
        );
      });

      markers.push(marker);
    });

    return markers;
  };

  /**
   * 장소 정보 업데이트
   *
   * liked / isPopular 등이 변경되었을 때
   * 기존 마커의 이미지만 변경한다.
   */
  const updateMarkers = (places: PlaceType[]) => {
    for (const place of places) {
      const marker = markerByPlaceIdRef.current.get(place.contentId);

      if (!marker) {
        continue;
      }

      // 최신 장소 정보 저장
      placesRef.current.set(place.contentId, place);

      markerPlaceMapRef.current.set(marker, place);

      const images = getMarkerImages(place);

      markerImageMapRef.current.set(marker, images);

      const isSelected = selectedMarkerRef.current === marker;

      marker.setImage(isSelected ? images.selected : images.normal);

      marker.setZIndex(isSelected ? 999 : 0);
    }
  };

  /**
   * 특정 장소의 마커 선택
   */
  const selectMarkerByPlaceId = (placeId: number) => {
    const marker = markerByPlaceIdRef.current.get(placeId);

    if (!marker) {
      return null;
    }

    const place = placesRef.current.get(placeId);

    if (!place) {
      return null;
    }

    // 혹시 숨겨져 있는 마커라면 다시 표시하고, 되돌리기 위해 기록
    const isVisible = isMarkerRendering(marker);

    if (!isVisible) {
      temporarilyShownMarkerRef.current = marker;
      marker.setMap(mapRef.current);
    } else {
      temporarilyShownMarkerRef.current = null;
    }

    // 현재 마커가 클러스터에 포함되어 있는지 확인
    const isBounding = isMarkerBounding(marker);

    const cluster = getClusterByMarker(marker);

    if (cluster || !isBounding) {
      const map = mapRef.current;

      if (map) {
        // 클러스터를 풀기 위해 레벨 조정
        if (map.getLevel() >= 5) {
          map.setLevel(4, {
            anchor: marker.getPosition(),
          });
        }

        map.panTo(marker.getPosition());
      }
    } else {
      mapRef.current?.panTo(marker.getPosition());
    }

    selectMarker(marker, place);

    return marker;
  };

  /**
   * 현재 선택된 마커 제거
   */
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

    if (temporarilyShownMarkerRef.current) {
      temporarilyShownMarkerRef.current.setMap(null);
      temporarilyShownMarkerRef.current = null;
    }
  };

  /**
   * 특정 장소들만 표시
   *
   * contentId 배열만 전달하면 된다.
   */
  const getMarkers = (contentIds: number[]) => {
    return contentIds
      .map((contentId) => markerByPlaceIdRef.current.get(contentId))
      .filter((marker): marker is kakao.maps.Marker => marker !== undefined);
  };

  /**
   * 모든 마커 표시
   */
  const getAllMarkers = () => {
    return Array.from(markerByPlaceIdRef.current.values());
  };

  return {
    create,
    updateMarkers,

    selectMarker,
    selectMarkerByPlaceId,
    clearSelectedMarker,

    getMarkers,
    getAllMarkers,

    selectedMarkerRef,
    markerImageMapRef,
    markerPlaceMapRef,
    placesRef,
    markerByPlaceIdRef,
    overlayRef,
  };
}
