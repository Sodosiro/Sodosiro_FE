import { PinMiniIcon } from "@/assets/svgs";
import KeywordBadgeList from "@/components/common/keywordBadge/KeywordBadgeList";
import InfoChip from "@/components/place/InfoChip";
import Tag from "@/components/place/Tag";
import { DEFAULT_IMAGES } from "@/constants/Category";
import { NumberToCategory } from "@/util/place/category";
import { router } from "expo-router";
import { useState } from "react";
import { Image, LayoutChangeEvent, Pressable, View } from "react-native";
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
    tags,
  } = popularPlace;

  const [contentHeight, setContentHeight] = useState(0);

  const imageSource = firstImage
    ? { uri: firstImage }
    : DEFAULT_IMAGES[NumberToCategory[category]];

  const handleRoute = () => {
    router.push({
      pathname: "/place/[placeId]",
      params: { placeId: contentId },
    });
  };

  const handleContentLayout = (event: LayoutChangeEvent) => {
    const height = event.nativeEvent.layout.height;
    console.log(height);
    if (height !== contentHeight) {
      setContentHeight(height);
    }
  };

  return (
    <View className={`gap-3 flex-row items-stretch`}>
      <Pressable
        onPress={handleRoute}
        className={`rounded-xl overflow-hidden`}
        style={{ width: contentHeight, height: contentHeight }}
      >
        <Image
          source={imageSource}
          className={`w-full h-full`}
          resizeMode="cover"
        />
      </Pressable>

      <View className={`flex-1 gap-2`} onLayout={handleContentLayout}>
        <Pressable className={`gap-1`} onPress={handleRoute}>
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
        </Pressable>
        <KeywordBadgeList keywords={tags?.slice(0, 3) ?? []} />
      </View>
    </View>
  );
}
