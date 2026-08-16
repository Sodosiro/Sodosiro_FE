import { PinMiniIcon } from "@/assets/svgs";
import KeywordBadgeList from "@/components/common/keywordBadge/KeywordBadgeList";
import InfoChip from "@/components/place/InfoChip";
import Tag from "@/components/place/Tag";
import { DEFAULT_IMAGES } from "@/constants/Category";
import { NumberToCategory } from "@/util/place/category";
import { router } from "expo-router";
import { Image, Pressable, View } from "react-native";
import CustomText from "../../common/CustomText";
import RateChip from "../../place/RateChip";

export default function PopularPlaceItem({
  popularPlace,
}: {
  popularPlace: PlaceType;
}) {
  const {
    contentId,
    firstImage,
    title,
    region,
    avgRating,
    reviewCount,
    overview,
    category,
  } = popularPlace;

  const imageSource = firstImage
    ? { uri: firstImage }
    : DEFAULT_IMAGES[NumberToCategory[category]];

  return (
    <Pressable
      className={`gap-3 flex-row flex-1`}
      onPress={() =>
        router.push({
          pathname: "/place/[placeId]",
          params: { placeId: contentId },
        })
      }
    >
      <Image
        source={imageSource}
        className={`rounded-xl aspect-square overflow-hidden w-28 h-28`}
      />
      <View className={`flex-1 justify-between gap-1`}>
        <View className={`gap-1`}>
          <View className={`flex-row gap-1 items-center`}>
            <CustomText font="title" numberOfLines={1} className={`shrink`}>
              {title}
            </CustomText>
            <Tag category={NumberToCategory[category]} />
          </View>
          <View className={`gap-1.5`}>
            <View className={`flex-row gap-1`}>
              <RateChip
                rate={avgRating}
                reviewCount={reviewCount}
                noReviewCount
              />
              <InfoChip
                icon={<PinMiniIcon width={14} color={"#888888"} />}
                text={region}
              />
            </View>
            <CustomText
              font="body3"
              className={`text-text-muted`}
              numberOfLines={1}
            >
              {overview}
            </CustomText>
          </View>
        </View>
        <KeywordBadgeList keywords={[]} />
      </View>
    </Pressable>
  );
}
