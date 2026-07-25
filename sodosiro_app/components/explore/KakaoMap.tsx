import { PLACES } from "@/mocks/places";
import { Route as RouteInfo } from "@/mocks/route";
import type { Dispatch, SetStateAction } from "react";
import { useRef } from "react";
import type { SharedValue } from "react-native-reanimated";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import type { WebViewMessageEvent } from "react-native-webview";
import { WebView } from "react-native-webview";

export default function KakaoMap({
  isLoading,
  setIsLoading,
  mode,
  animatedPosition,
}: {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  mode: "marker" | "navigation";
  animatedPosition: SharedValue<number>;
}) {
  const webViewRef = useRef<React.ComponentRef<typeof WebView>>(null);

  const animatedStyle = useAnimatedStyle(() => ({
    height: animatedPosition.value + 8,
  }));

  const handleMessage = (event: WebViewMessageEvent) => {
    const data = JSON.parse(event.nativeEvent.data);

    console.log(data.type, data.data);

    if (data.type === "MAP_READY") {
      switch (mode) {
        case "marker":
          webViewRef.current?.postMessage(
            JSON.stringify({
              type: "SET_PLACES",
              places: PLACES,
            }),
          );
          break;

        case "navigation":
          webViewRef.current?.postMessage(
            JSON.stringify({
              type: "SET_ROUTE",
              routeInfo: RouteInfo,
            }),
          );
          break;
      }
    }
  };

  return (
    <Animated.View
      className={`w-screen absolute ${isLoading ? `opacity-0` : ``}`}
      style={animatedStyle}
    >
      <WebView
        ref={webViewRef}
        source={{ uri: process.env.EXPO_PUBLIC_WEBVIEW_URI as string }}
        style={{ flex: 1 }}
        onMessage={handleMessage}
        onLoadStart={() => {
          setIsLoading(true);
        }}
        onLoadEnd={() => {
          setIsLoading(false);
        }}
      />
    </Animated.View>
  );
}
