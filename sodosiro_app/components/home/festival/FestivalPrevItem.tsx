import CustomText from "@/components/common/CustomText";
import { format } from "date-fns";
import { Image, View } from "react-native";
import DdayBadge from "./DdayBadge";

export default function FestivalPrevItem({
  festival,
}: {
  festival: FestivalType;
}) {
  const { imageSource, region, title, startDate, endDate } = festival;

  return (
    <View className={`gap-3`}>
      <View>
        <Image source={imageSource} className={`h-50 aspect-3/4 rounded-xl`} />
        <DdayBadge
          className={`absolute bottom-3 left-3`}
          startDate={startDate}
        />
      </View>
      <View className={`gap-0.5`}>
        <CustomText font="body3" className={`text-text-muted`}>
          {region}
        </CustomText>
        <CustomText font="title">{title}</CustomText>
        <CustomText font="body3" className={`text-text-muted`}>
          {format(startDate, "M/d")} ~ {format(endDate, "M/d")}
        </CustomText>
      </View>
    </View>
  );
}
