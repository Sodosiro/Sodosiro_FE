import { useCallback, useEffect, useMemo } from "react";

type NativeToWebViewMessage =
  | {
      type: "SET_PLACES";
      places: PlaceType[];
    }
  | {
      type: "SEARCH_PLACES";
      places: PlaceType[];
    }
  | {
      type: "SEARCH_INITIALIZE";
      places: PlaceType[];
    }
  | {
      type: "UPDATE_PLACE";
      places: PlaceType[];
    }
  | {
      type: "SET_PLACE";
      place: PlaceType;
    }
  | {
      type: "SET_ROUTE";
      routeInfo: RouteInfo;
    }
  | {
      type: "UPDATE_LOCATION";
      latitude: number;
      longitude: number;
    }
  | {
      type: "DENY_LOCATION";
    }
  | {
      type: "PAN_TO";
      placeId: number;
    }
  | {
      type: "SELECT_CANCEL";
    }
  | {
      type: "START_TRACKING";
    };

export function useWebViewMessage({
  mapRef,
  renderPlaces,
  createMarker,
  drawRoute,
  updateLocation,
  startTracking,
  denyLocation,
  selectMarkerByPlaceId,
  clearSelectedMarker,
  updateMarkers,
  searchPlaces,
  searchInitialize,
}: {
  mapRef: React.RefObject<kakao.maps.Map | null>;
  renderPlaces: (places: PlaceType[]) => void;
  createMarker: (map: kakao.maps.Map, place: PlaceType) => void;
  drawRoute: (map: kakao.maps.Map, route: RouteInfo) => void;
  updateLocation: (lat: number, lng: number) => kakao.maps.LatLng | undefined;
  startTracking: () => void;
  denyLocation: () => void;
  selectMarkerByPlaceId: (placeId: number) => kakao.maps.Marker | null;
  clearSelectedMarker: () => void;
  updateMarkers: (places: PlaceType[]) => void;
  searchPlaces: (placeIds: number[]) => void;
  searchInitialize: (placeIds: number[]) => void;
}) {
  const messageHandlers = useMemo(
    () => ({
      SET_PLACES: (
        data: Extract<NativeToWebViewMessage, { type: "SET_PLACES" }>,
      ) => {
        if (!mapRef.current) return;

        renderPlaces(data.places);
      },

      SEARCH_PLACES: (
        data: Extract<NativeToWebViewMessage, { type: "SEARCH_PLACES" }>,
      ) => {
        if (!mapRef.current) return;

        searchPlaces(data.places.map((place) => place.contentId));
      },

      SEARCH_INITIALIZE: (
        data: Extract<NativeToWebViewMessage, { type: "SEARCH_INITIALIZE" }>,
      ) => {
        if (!mapRef.current) return;

        searchInitialize(data.places.map((place) => place.contentId));
      },

      UPDATE_PLACE: (
        data: Extract<NativeToWebViewMessage, { type: "UPDATE_PLACE" }>,
      ) => {
        if (!mapRef.current) return;

        updateMarkers(data.places);
      },

      SET_PLACE: (
        data: Extract<NativeToWebViewMessage, { type: "SET_PLACE" }>,
      ) => {
        if (!mapRef.current) return;

        createMarker(mapRef.current, data.place);
      },

      SET_ROUTE: (
        data: Extract<NativeToWebViewMessage, { type: "SET_ROUTE" }>,
      ) => {
        if (!mapRef.current) return;

        drawRoute(mapRef.current, data.routeInfo);
      },

      UPDATE_LOCATION: (
        data: Extract<NativeToWebViewMessage, { type: "UPDATE_LOCATION" }>,
      ) => {
        updateLocation(data.latitude, data.longitude);
      },

      DENY_LOCATION: () => {
        denyLocation();
      },

      PAN_TO: (data: Extract<NativeToWebViewMessage, { type: "PAN_TO" }>) => {
        selectMarkerByPlaceId(data.placeId);
      },

      SELECT_CANCEL: () => {
        clearSelectedMarker();
      },

      START_TRACKING: () => {
        startTracking();
      },
    }),
    [
      mapRef,
      renderPlaces,
      searchPlaces,
      searchInitialize,
      updateMarkers,
      createMarker,
      drawRoute,
      updateLocation,
      denyLocation,
      selectMarkerByPlaceId,
      clearSelectedMarker,
      startTracking,
    ],
  );

  const handleMessage = useCallback(
    (event: MessageEvent) => {
      let data: NativeToWebViewMessage;

      try {
        data =
          typeof event.data === "string" ? JSON.parse(event.data) : event.data;
      } catch {
        console.warn("[useWebViewMessage] 메시지 파싱 실패:", event.data);
        return;
      }

      const handler = messageHandlers[data.type];

      handler?.(data as never);
    },
    [messageHandlers],
  );

  useEffect(() => {
    window.addEventListener("message", handleMessage);

    document.addEventListener("message", handleMessage as EventListener);

    return () => {
      window.removeEventListener("message", handleMessage);

      document.removeEventListener("message", handleMessage as EventListener);
    };
  }, [handleMessage]);
}
