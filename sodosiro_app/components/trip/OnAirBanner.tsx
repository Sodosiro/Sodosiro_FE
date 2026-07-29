import { OnAirIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import { View } from "react-native";

type OnAirBannerProps = {
  tripTitle: string;
};

export default function OnAirBanner({ tripTitle }: OnAirBannerProps) {
  return (
    <View className="flex-row items-center py-4 pl-5" style={{ backgroundColor: "#C4D96A" }}>
      <OnAirIcon />

      <CustomText font="body2" className="ml-1" style={{ fontWeight: "700" }}>
        진행중
      </CustomText>

      <CustomText font="body2" className="pl-1">
        · {tripTitle}
      </CustomText>
    </View>
  );
}
