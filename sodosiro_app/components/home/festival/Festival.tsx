import CustomText from "@/components/common/CustomText";
import { format } from "date-fns";
import type { ImageSourcePropType } from "react-native";
import { Image, View } from "react-native";
import FestivalBadge from "./FestivalBadge";

type Props = {
  id: number;
  imageSource: ImageSourcePropType;
  region: string;
  title: string;
  startDate: Date;
  endDate: Date;
};

export default function Festival({
  id,
  imageSource,
  region,
  title,
  startDate,
  endDate,
}: Props) {
  return (
    <View className={`gap-3`}>
      <View>
        <Image source={imageSource} className={`aspect-3/4 rounded-xl`} />
        <FestivalBadge
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
