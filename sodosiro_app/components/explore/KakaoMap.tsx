import { Places } from "@/mocks/places";
import { Dispatch, SetStateAction, useRef } from "react";
import { View } from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";

export default function KakaoMap({
  isLoading,
  setIsLoading,
}: {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}) {
  const webViewRef = useRef<React.ComponentRef<typeof WebView>>(null);

  const handleMessage = (event: WebViewMessageEvent) => {
    const data = JSON.parse(event.nativeEvent.data);

    if (data.type === "MAP_READY") {
      webViewRef.current?.postMessage(
        JSON.stringify({
          type: "SET_PLACES",
          places: Places,
        }),
      );
    }
  };

  return (
    <View
      className={`w-screen h-screen absolute ${isLoading ? `opacity-0` : ``}`}
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
    </View>
  );
}
