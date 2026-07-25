import { useEffect, type RefObject } from "react";
import type { SharedValue } from "react-native-reanimated";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { WebView } from "react-native-webview";

import { useLocation } from "@/hooks/useLocation";
import { useWebView } from "@/hooks/useWebView";
import { useLocationStore } from "@/stores/useLocationStore";
import { useWebViewStore } from "@/stores/useWebViewStore";

export default function KakaoMap({
  webViewRef,
  mode,
  animatedPosition,
}: {
  webViewRef: RefObject<WebView<unknown> | null>;
  mode: "marker" | "navigation";
  animatedPosition: SharedValue<number>;
}) {
  const { isLoading, setIsLoading } = useWebViewStore();

  const { sendLocation, handleMessage } = useWebView({
    webViewRef,
    mode,
    setIsLoading,
  });

  useLocation(sendLocation);

  const { location, isDenied } = useLocationStore();

  const animatedStyle = useAnimatedStyle(() => ({
    height: animatedPosition.value + 8,
  }));

  useEffect(() => {
    if (!location) return;
    sendLocation(location, isDenied);
  }, [location]);

  return (
    <Animated.View
      className={`w-screen absolute ${isLoading ? "opacity-0" : ""}`}
      style={animatedStyle}
    >
      <WebView
        ref={webViewRef}
        source={{
          uri: process.env.EXPO_PUBLIC_WEBVIEW_URI as string,
        }}
        style={{ flex: 1 }}
        onMessage={handleMessage}
        onLoadStart={() => setIsLoading(true)}
      />
    </Animated.View>
  );
}
