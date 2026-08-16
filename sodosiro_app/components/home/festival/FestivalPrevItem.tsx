import CustomText from "@/components/common/CustomText";
import { getSeasonImage } from "@/util/festival/festival";
import { formatDate } from "@/util/time/time";
import { Image, View } from "react-native";
import DdayBadge from "./DdayBadge";

export default function FestivalPrevItem({
  festival,
}: {
  festival: FestivalType;
}) {
  const { imageUrl, regionName, title, startDate, endDate } = festival;

  const imageSource = imageUrl ? { uri: imageUrl } : getSeasonImage(startDate);

  return (
    <View className={`w-39 gap-3`}>
      <View>
        <Image source={imageSource} className={`h-52 aspect-3/4 rounded-xl`} />
        <DdayBadge
          className={`absolute bottom-3 left-3`}
          startDate={startDate}
          endDate={endDate}
        />
      </View>
      <View className={`gap-0.5`}>
        <CustomText font="body3" className={`text-text-muted`}>
          {regionName}
        </CustomText>
        <CustomText font="title" className={`w-full`} numberOfLines={1}>
          {title}
        </CustomText>
        <CustomText font="body3" className={`text-text-muted`}>
          {formatDate(startDate, endDate)}
        </CustomText>
      </View>
    </View>
  );
}
