import { useExploreStore } from "@/stores/useExploreStore";
import { useLocationStore } from "@/stores/useLocationStore";
import type { RefObject } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { WebView, WebViewMessageEvent } from "react-native-webview";

type WebViewToNativeMessage =
  | { type: "MAP_READY" }
  | { type: "MARKER_SELECTED"; place: PlaceType }
  | { type: "STOP_TRACKING" };

export function useWebView({
  webViewRef,
  mode,
  initialData,
  doNotSelect,
}: {
  webViewRef: RefObject<WebView<unknown> | null>;
  mode: "marker" | "navigation";
  initialData: any;
  doNotSelect?: boolean;
}) {
  const setIsTracking = useLocationStore((state) => state.setIsTracking);
  const setSelectedPlaceId = useExploreStore(
    (state) => state.setSelectedPlaceId,
  );

  const [isMapReady, setIsMapReady] = useState(false);
  const location = useLocationStore((state) => state.location);
  const isDenied = useLocationStore((state) => state.isDenied);

  const postMessage = useCallback(
    (payload: object) => {
      webViewRef.current?.postMessage(JSON.stringify(payload));
    },
    [webViewRef],
  );

  const sendPlaceUpdates = useCallback(
    (places: PlaceType[]) => {
      postMessage({
        type: "UPDATE_PLACE",
        places,
      });
    },
    [postMessage],
  );

  const updateData = useCallback(
    (data?: any, isPanTo?: boolean) => {
      if (mode === "marker") {
        postMessage({
          type: "SET_PLACES",
          places: data ?? initialData,
          isPanTo: isPanTo ?? false,
        });
      }
      if (mode === "navigation") {
        postMessage({
          type: "SET_ROUTE",
          routeInfo: data ?? initialData,
        });
      }
    },
    [mode, postMessage, initialData],
  );

  const messageHandlers = useMemo(
    () => ({
      MAP_READY: () => {
        setIsMapReady(true);
        updateData();
      },
      MARKER_SELECTED: (
        data: Extract<WebViewToNativeMessage, { type: "MARKER_SELECTED" }>,
      ) => {
        if (!doNotSelect) setSelectedPlaceId(data?.place?.contentId || null);
      },
      STOP_TRACKING: () => {
        setIsTracking(false);
      },
    }),
    [setSelectedPlaceId, setIsTracking, updateData],
  );

  const handleMessage = useCallback(
    (event: WebViewMessageEvent) => {
      let data: WebViewToNativeMessage;

      try {
        data = JSON.parse(event.nativeEvent.data);
      } catch {
        if (__DEV__) {
          console.warn(
            "[useWebView] 메시지 파싱 실패:",
            event.nativeEvent.data,
          );
        }
        return;
      }

      const handler = messageHandlers[data.type] as
        | ((d: typeof data) => void)
        | undefined;

      handler?.(data);
    },
    [messageHandlers],
  );

  useEffect(() => {
    if (!isMapReady) return;

    if (isDenied) {
      postMessage({ type: "DENY_LOCATION" });
      return;
    }

    if (location) {
      postMessage({
        type: "UPDATE_LOCATION",
        ...location,
      });
    }
  }, [isMapReady, isDenied, location, postMessage]);

  return {
    handleMessage,
    updateData,
    sendPlaceUpdates,
  };
}
