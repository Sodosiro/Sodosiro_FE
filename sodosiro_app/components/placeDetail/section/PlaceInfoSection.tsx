import {
  CallMiniIcon,
  ClockMiniIcon,
  ParkingMiniIcon,
  PetMiniIcon,
} from "@/assets/svgs";
import type { RefObject } from "react";
import type { ViewProps } from "react-native";
import { View } from "react-native";
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
  ref: RefObject<View | null>;
}

export default function PlaceInfoSection({ info, ref, ...props }: Props) {
  const { opening, phoneNumber, parking, pet } = info;
  return (
    <PlaceDetailSectionContainer ref={ref} title="이용 정보" {...props}>
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
        <CustomText font="body3" className={`text-text-muted`}>
          일부 정보는 제공되지 않을 수 있습니다.
        </CustomText>
      </View>
    </PlaceDetailSectionContainer>
  );
}
