import { PinMiniIcon, RightIcon } from "@/assets/svgs";
import { PLACE_DETAIL } from "@/mocks/places";
import { useRef, type RefObject } from "react";
import type { ViewProps } from "react-native";
import { Linking, Pressable, View } from "react-native";
import type { WebViewMessageEvent } from "react-native-webview";
import WebView from "react-native-webview";
import CustomText from "../../common/CustomText";
import PlaceDetailSectionContainer from "./PlaceDetailSectionContainer";

interface Props extends ViewProps {
  address: string;
  ref: RefObject<View | null>;
}

export default function LocationSection({ address, ref, ...props }: Props) {
  const webViewRef = useRef<React.ComponentRef<typeof WebView>>(null);
  const handleMessage = (event: WebViewMessageEvent) => {
    const data = JSON.parse(event.nativeEvent.data);

    console.log(data.type, data.data);

    if (data.type === "MAP_READY") {
      webViewRef.current?.postMessage(
        JSON.stringify({
          type: "SET_PLACE",
          place: PLACE_DETAIL,
        }),
      );
    }
  };

  return (
    <PlaceDetailSectionContainer ref={ref} title="위치" {...props}>
      <Pressable
        className={`gap-1 rounded-xl border border-border overflow-hidden`}
        onPress={() =>
          Linking.openURL(
            `https://map.kakao.com/link/search/${encodeURIComponent(address)}`,
          )
        }
      >
        <WebView
          ref={webViewRef}
          style={{ width: "100%", aspectRatio: 5 / 3 }}
          source={{ uri: process.env.EXPO_PUBLIC_WEBVIEW_URI as string }}
          onMessage={handleMessage}
        />
        <View className={`p-4 gap-1`}>
          <View className={`flex-row gap-1 items-center`}>
            <PinMiniIcon height={14} />
            <CustomText font="body2">{address}</CustomText>
          </View>
          <View className={`flex-row items-center`}>
            <CustomText font="body3" className={`text-text-muted`}>
              지도 보기
            </CustomText>
            <RightIcon color={"#888888"} width={18} height={18} />
          </View>
        </View>
      </Pressable>
    </PlaceDetailSectionContainer>
  );
}
