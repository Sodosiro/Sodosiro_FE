import { Places } from "@/mocks/places";
import { useRef } from "react";
import { View } from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview"

export default function ExploreScreen() {

  const webViewRef = useRef<React.ElementRef<typeof WebView>>(null);

  const handleMessage = (event: WebViewMessageEvent) => {
    const data = JSON.parse(event.nativeEvent.data);

    if (data.type === "MAP_READY") {
      webViewRef.current?.postMessage(
        JSON.stringify({
          type: "SET_PLACES",
          places: Places,
        })
      )
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webViewRef}
        source={{ uri: process.env.EXPO_PUBLIC_WEBVIEW_URI as string }}
        style={{ flex: 1 }}
        onMessage={handleMessage}/>
    </View>
  );
}