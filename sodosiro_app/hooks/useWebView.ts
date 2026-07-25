import { PLACES } from "@/mocks/places";
import { Route as RouteInfo } from "@/mocks/route";
import type { RefObject } from "react";
import { useCallback } from "react";
import type { WebView, WebViewMessageEvent } from "react-native-webview";

export function useWebView({
  webViewRef,
  mode,
  setIsLoading,
}: {
  webViewRef: RefObject<WebView<unknown> | null>;
  mode: "marker" | "navigation";
  setIsLoading: (value: boolean) => void;
}) {
  const sendLocation = useCallback(
    (
      location: { latitude: number; longitude: number; initial?: boolean },
      denied = false,
    ) => {
      if (!denied) {
        webViewRef.current?.postMessage(
          JSON.stringify({
            type: "UPDATE_LOCATION",
            ...location,
          }),
        );
      } else {
        webViewRef.current?.postMessage(
          JSON.stringify({
            type: "DENY_LOCATION",
          }),
        );
      }
    },
    [],
  );

  const handleMessage = (event: WebViewMessageEvent) => {
    const data = JSON.parse(event.nativeEvent.data);

    console.log(data.type);
    switch (data.type) {
      case "LOCATION_READY":
        setIsLoading(false);
        break;

      case "MAP_READY":
        if (mode === "marker") {
          webViewRef.current?.postMessage(
            JSON.stringify({
              type: "SET_PLACES",
              places: PLACES,
            }),
          );
        }

        if (mode === "navigation") {
          webViewRef.current?.postMessage(
            JSON.stringify({
              type: "SET_ROUTE",
              routeInfo: RouteInfo,
            }),
          );
        }

        break;
    }
  };

  return {
    sendLocation,
    handleMessage,
  };
}
