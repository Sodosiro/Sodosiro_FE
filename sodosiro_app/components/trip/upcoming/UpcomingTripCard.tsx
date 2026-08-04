import { CalendarMiniIcon, PinMiniIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import { memo } from "react";
import { View } from "react-native";
import ActionBadge from "../badge/ActionBadge";

type UpcomingTripCardProps = {
  trip: UpcomingTripCardType;
  onPress: () => void;
};

type UpcomingTripCardType = {
  id: string;
  dDay: number;
  title: string;
  region: string;
  startDate: string;
  nights: number;
  locationText: string;
};

function UpcomingTripCard({
  trip,
  onPress,
}: UpcomingTripCardProps) {
  return (
    <View className="rounded-2xl border border-[#E5E5E5] bg-white px-5 py-4 mb-5">
      {/* D-Day Badge 적용 */}
      <View
        className={`flex-row items-center self-start px-3.5 py-1.5 min-h-9 rounded-full bg-primary`}
      >
        <CustomText font="body3 tight">D-{trip.dDay}</CustomText>
      </View>

      {/* 제목 */}
      <View className="flex-row items-center mt-2">
        <CustomText font="title">{trip.title}</CustomText>

        <View className="ml-2 rounded-md bg-[#F5F5F5] px-2 py-1">
          <CustomText font="body3">{trip.region}</CustomText>
        </View>
      </View>

      {/* 날짜 */}
      <View className="flex-row items-center mt-2">
        <CalendarMiniIcon color={"#1A1A1A"} />

        <CustomText font="body2" className="ml-2">
          {trip.startDate} · 무박 {trip.nights}일
        </CustomText>
      </View>

      {/* 장소 */}
      <View className="flex-row items-center mt-2">
        <PinMiniIcon color={"#444444"} />

        <CustomText font="body2" className="ml-2">
          {trip.locationText}
        </CustomText>
      </View>

      {/* Divider */}
      <View className="h-px bg-[#E5E5E5] my-3" />

      {/* Button */}
      <View>
        <ActionBadge
          bgWhite
          text={`여행 보기`}
          onPress={() => onPress()}
          onLayout={() => {}}
        />
      </View>
    </View>
  );
}

export default memo(UpcomingTripCard);
