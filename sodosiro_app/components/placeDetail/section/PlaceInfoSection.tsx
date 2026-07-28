import {
  CallMiniIcon,
  ClockMiniIcon,
  ParkingMiniIcon,
  PetMiniIcon,
  PinMiniIcon,
  RightIcon,
} from "@/assets/svgs";
import { PLACE_DETAIL } from "@/mocks/places";
import { useRef, type RefObject } from "react";
import type { ViewProps } from "react-native";
import { Linking, Pressable, View } from "react-native";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import CustomText from "../../common/CustomText";
import PlaceDetailSectionContainer from "./PlaceDetailSectionContainer";

type InfoType = {
  opening: string;
  phoneNumber: string;
  parking: boolean;
  pet: boolean;
};

interface Props extends ViewProps {
  info: InfoType;
  address: string;
  ref: RefObject<View | null>;
}

export default function PlaceInfoSection({
  info,
  address,
  ref,
  ...props
}: Props) {
  const { opening, phoneNumber, parking, pet } = info;
  return (
    <PlaceDetailSectionContainer
      ref={ref}
      title="이용 정보"
      className={`gap-3`}
      {...props}
    >
      <View className={`gap-3`}>
        <View className={`flex-row gap-2`}>
          <ClockMiniIcon />
          <CustomText font={opening ? "body2" : "body3"}>
            {opening || "영업 정보 미등록"}
          </CustomText>
        </View>
        {phoneNumber && (
          <View className={`flex-row gap-2`}>
            <CallMiniIcon />
            <CustomText font="body2">{phoneNumber}</CustomText>
          </View>
        )}
        <View className={`flex-row gap-2`}>
          <ParkingMiniIcon />
          <CustomText font={parking ? "body2" : "body3"}>
            {parking ? "주차 가능" : "주차 정보 미확인"}
          </CustomText>
        </View>
        {pet && (
          <View className={`flex-row gap-2`}>
            <PetMiniIcon />
            <CustomText font="body2">반려동물 동반 가능</CustomText>
          </View>
        )}
        <LocationMap address={address} />
        <CustomText font="body3" className={`text-text-muted`}>
          일부 정보는 제공되지 않을 수 있습니다.
        </CustomText>
      </View>
    </PlaceDetailSectionContainer>
  );
}

interface LocationMapProps extends ViewProps {
  address: string;
}

const LocationMap = ({ address }: LocationMapProps) => {
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
  );
};
