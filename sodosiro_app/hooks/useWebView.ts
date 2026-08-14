import { useExploreStore } from "@/stores/useExploreStore";
import { useLocationStore } from "@/stores/useLocationStore";
import type { RefObject } from "react";
import { useCallback, useMemo, useState } from "react";
import type { WebView, WebViewMessageEvent } from "react-native-webview";

type WebViewToNativeMessage =
  | { type: "MAP_READY" }
  | { type: "MARKER_SELECTED"; place: PlaceType }
  | { type: "STOP_TRACKING" };

export function useWebView({
  webViewRef,
  mode,
  setIsLoading,
  initialData,
}: {
  webViewRef: RefObject<WebView<unknown> | null>;
  mode: "marker" | "navigation";
  setIsLoading: (value: boolean) => void;
  initialData: any;
}) {
  const setIsTracking = useLocationStore((state) => state.setIsTracking);
  const setSelectedPlaceId = useExploreStore(
    (state) => state.setSelectedPlaceId,
  );

  const [isMapReady, setIsMapReady] = useState(false);

  const postMessage = useCallback(
    (payload: object) => {
      webViewRef.current?.postMessage(JSON.stringify(payload));
    },
    [webViewRef],
  );

  // mode에 따른 초기 데이터 전송 로직.
  // MAP_READY 최초 1회 + 이후 필요할 때(예: 새로고침) 재사용 가능하도록 분리
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
        setSelectedPlaceId(data?.place?.contentId || null);
      },
      STOP_TRACKING: () => {
        setIsTracking(false);
      },
    }),
    [setIsLoading, setSelectedPlaceId, setIsTracking, updateData],
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

      if (__DEV__) {
        console.log("[useWebView]", data);
      }

      const handler = messageHandlers[data.type] as
        | ((d: typeof data) => void)
        | undefined;

      handler?.(data);
    },
    [messageHandlers],
  );

  const sendLocation = useCallback(
    (location: { latitude: number; longitude: number }, denied = false) => {
      if (!denied) {
        postMessage({ type: "UPDATE_LOCATION", ...location });
      } else {
        postMessage({ type: "DENY_LOCATION" });
      }
    },
    [postMessage],
  );

  return {
    isMapReady,
    sendLocation,
    handleMessage,
    updateData, // 필요할 때 (ex. 새로고침 버튼) 수동으로 재요청 가능
  };
}
