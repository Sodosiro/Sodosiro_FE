import { PinMiniIcon } from "@/assets/svgs";
import KeywordBadgeList from "@/components/common/keywordBadge/KeywordBadgeList";
import InfoChip from "@/components/place/InfoChip";
import { Image, View } from "react-native";
import CustomText from "../../common/CustomText";
import RateChip from "../../place/RateChip";

export default function PopularPlaceItem({
  popularPlace,
}: {
  popularPlace: PopularPlaceType;
}) {
  const { imageSource, title, region, rate, reviewCount, keywords } =
    popularPlace;

  return (
    <View className={`gap-3 flex-row flex-1`}>
      <Image
        source={imageSource}
        className={`rounded-xl aspect-square overflow-hidden`}
      />
      <View className={`flex-1 justify-between gap-1`}>
        <View className={`gap-1.5`}>
          <CustomText font="title" numberOfLines={1}>
            {title}
          </CustomText>
          <InfoChip
            icon={<PinMiniIcon width={14} color={"#888888"} />}
            text={region}
          />
          <RateChip rate={rate} reviewCount={reviewCount} />
        </View>
        <KeywordBadgeList keywords={keywords} />
      </View>
    </View>
  );
}
