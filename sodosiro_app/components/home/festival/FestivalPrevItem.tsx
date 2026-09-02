import CustomText from "@/components/common/CustomText";
import { getFestivalSeasonImage } from "@/util/festival/festival";
import { formatDate } from "@/util/time/time";
import { Image, Pressable, View } from "react-native";
import DdayBadge from "./DdayBadge";

export default function FestivalPrevItem({
  festival,
  onPress,
}: {
  festival: FestivalType;
  onPress?: (linkUrl: string) => Promise<void>;
}) {
  const { imageUrl, regionName, title, startDate, endDate, linkUrl } = festival;

  const imageSource = imageUrl
    ? { uri: imageUrl }
    : getFestivalSeasonImage(startDate);

  return (
    <Pressable
      className={`w-39 gap-3`}
      onPress={onPress ? () => onPress(linkUrl) : undefined}
    >
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
    </Pressable>
  );
}
