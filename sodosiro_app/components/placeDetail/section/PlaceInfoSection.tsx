import {
  CallMiniIcon,
  ClockMiniIcon,
  DownIcon,
  ParkingMiniIcon,
  PinMiniIcon,
  RightIcon,
} from "@/assets/svgs";
import { useRef, useState, type RefObject } from "react";
import type { ViewProps } from "react-native";
import { Linking, Pressable, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import CustomText from "../../common/CustomText";
import PlaceDetailSectionContainer from "./PlaceDetailSectionContainer";

type PlaceDetailType = {
  contentId: number;
  title: string;
  mapY: number;
  mapX: number;
  category: CategoryNumber;
  liked: boolean;
  isPopular: boolean;
  usetime: string;
  restdate: string;
  infocenter: string;
  parking: boolean;
  addr1: string;
  addr2: string;
};

interface Props extends ViewProps {
  placeDetail: PlaceDetailType;
  ref: RefObject<View | null>;
}

export default function PlaceInfoSection({
  ref,
  placeDetail,
  ...props
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);

  const height = useSharedValue(0);
  const arrowRotation = useSharedValue(0);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);

    height.value = withTiming(isOpen ? 0 : contentHeight, {
      duration: 250,
    });
    arrowRotation.value = withTiming(isOpen ? 0 : -180, {
      duration: 250,
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
    opacity: contentHeight === 0 ? 0 : height.value / contentHeight,
  }));

  const arrowAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${arrowRotation.value}deg`,
      },
    ],
  }));

  const { usetime, restdate, infocenter, parking, addr1, addr2 } = placeDetail;

  return (
    <PlaceDetailSectionContainer
      ref={ref}
      title="이용 정보"
      className={`gap-3`}
      {...props}
    >
      <View className={`gap-3`}>
        <Pressable onPress={usetime ? handleToggle : undefined}>
          <View className={`flex-row gap-1 items-center`}>
            <View className={`flex-row gap-2 items-center`}>
              <ClockMiniIcon color={usetime ? `#444444` : `#888888`} />
              <CustomText
                font={usetime ? "body2" : "body3"}
                className={`${!usetime && `text-text-muted`}`}
              >
                {usetime ? "상세 정보 확인" : "영업 정보 미등록"}
              </CustomText>
            </View>
            {usetime && (
              <Animated.View style={arrowAnimatedStyle}>
                <DownIcon width={16} height={16} />
              </Animated.View>
            )}
          </View>
          {usetime && (
            <>
              <Animated.View style={animatedStyle} className="overflow-hidden">
                <View className="pl-6.5 pt-2 gap-2">
                  <CustomText font="body2">{usetime}</CustomText>
                  {restdate && <CustomText font="body2">{restdate}</CustomText>}
                </View>
              </Animated.View>
              <View
                className="absolute opacity-0"
                pointerEvents="none"
                onLayout={(event) => {
                  setContentHeight(event.nativeEvent.layout.height);
                }}
              >
                <View className="pl-6.5 pt-2 gap-3">
                  <CustomText font="body2">{usetime}</CustomText>
                  {restdate && <CustomText font="body2">{restdate}</CustomText>}
                </View>
              </View>
            </>
          )}
        </Pressable>

        {infocenter && (
          <View className={`flex-row gap-2 shrink items-center`}>
            <CallMiniIcon />
            <CustomText font="body2" className={`shrink`}>
              {infocenter.replaceAll("/", " / ")}
            </CustomText>
          </View>
        )}
        <View className={`flex-row gap-2 items-center`}>
          <ParkingMiniIcon color={parking ? `#444444` : `#888888`} />
          <CustomText
            font={parking ? "body2" : "body3"}
            className={`${!parking && `text-text-muted`}`}
          >
            {parking ? "주차 가능" : "주차 정보 미확인"}
          </CustomText>
        </View>
        <LocationMap
          address={[addr1, addr2].filter(Boolean).join(" ")}
          placeDetail={placeDetail}
        />
        <CustomText font="body3" className={`text-text-muted`}>
          일부 정보는 제공되지 않을 수 있습니다.
        </CustomText>
      </View>
    </PlaceDetailSectionContainer>
  );
}

interface LocationMapProps extends ViewProps {
  address: string;
  placeDetail: {
    contentId: number;
    title: string;
    mapY: number;
    mapX: number;
    category: CategoryNumber;
    liked: boolean;
    isPopular: boolean;
  };
}

const LocationMap = ({ address, placeDetail }: LocationMapProps) => {
  const webViewRef = useRef<React.ComponentRef<typeof WebView>>(null);
  const handleMessage = (event: WebViewMessageEvent) => {
    const data = JSON.parse(event.nativeEvent.data);

    if (data.type === "MAP_READY") {
      webViewRef.current?.postMessage(
        JSON.stringify({
          type: "SET_PLACE",
          place: placeDetail,
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
        applicationNameForUserAgent="SodosiroAppWebView"
      />
      <View className={`p-4 gap-1`}>
        <View className={`flex-row gap-1 items-center`}>
          <PinMiniIcon color={"#444444"} height={14} />
          <CustomText font="body2" numberOfLines={1} className={`shrink`}>
            {address}
          </CustomText>
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
