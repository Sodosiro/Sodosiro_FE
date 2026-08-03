import { CalendarMiniIcon, PinMiniIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";

import { View } from "react-native";
import ActionBadge from "../badge/ActionBadge";

type UpcomingTripCardProps = {
  trip: UpcomingTripCardType;
  onPress?: (tripId: string) => void;
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

export default function UpcomingTripCard({ trip, onPress }: UpcomingTripCardProps) {
  return (
    <View className="rounded-2xl border border-[#E5E5E5] bg-white px-5 py-4 mb-5">
      {/* D-Day Badge 적용 */}
      <ActionBadge isOngoing text={`D-${trip.dDay}`} onPress={() => {}} onLayout={() => {}} />

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
          onPress={() => onPress?.(trip.id)}
          onLayout={() => {}}
        />
      </View>
    </View>
  );
}
