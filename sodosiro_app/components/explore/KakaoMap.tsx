import { Places } from "@/mocks/places";
import { Route as RouteInfo } from "@/mocks/route";
import { Dispatch, SetStateAction, useRef } from "react";
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { WebView, WebViewMessageEvent } from "react-native-webview";

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
              places: Places,
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
