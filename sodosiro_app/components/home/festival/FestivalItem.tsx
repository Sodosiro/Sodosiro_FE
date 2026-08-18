import { CalendarMiniIcon, PinMiniIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import KeywordBadgeList from "@/components/common/keywordBadge/KeywordBadgeList";
import InfoChip from "@/components/place/InfoChip";
import { getSeasonImage } from "@/util/festival/festival";
import { formatDate } from "@/util/time/time";
import { Image, View } from "react-native";
import DdayBadge from "./DdayBadge";

export default function FestivalItem({ festival }: { festival: FestivalType }) {
  const {
    imageUrl,
    regionName,
    title,
    description,
    startDate,
    endDate,
    keywords,
  } = festival;

  const imageSource = imageUrl ? { uri: imageUrl } : getSeasonImage(startDate);

  return (
    <View className={`flex-row gap-3`}>
      <View>
        <Image source={imageSource} className={`h-50 aspect-3/4 rounded-xl `} />
        <DdayBadge
          className={`absolute bottom-3 left-3`}
          startDate={startDate}
          endDate={endDate}
        />
      </View>
      <View className={`gap-3 flex-1 py-1`}>
        <CustomText font="title">{title}</CustomText>
        <View className={`gap-2`}>
          <InfoChip
            icon={<PinMiniIcon width={14} color={"#888888"} />}
            text={regionName}
          />
          <InfoChip
            icon={<CalendarMiniIcon width={14} color={"#888888"} />}
            text={`${formatDate(startDate, endDate)}`}
          />
        </View>
        <View className={`flex-1 flex-row`}>
          <CustomText
            font="body3"
            className={`text-text-muted flex-1`}
            numberOfLines={2}
          >
            {description}
          </CustomText>
        </View>
        <View>
          <KeywordBadgeList keywords={keywords} />
        </View>
      </View>
    </View>
  );
}
