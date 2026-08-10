import { HeartCircle, HeartCircleStroke } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import CategoryTag from "@/components/place/CategoryTag";
import RateChip from "@/components/place/RateChip";
import { DEFAULT_IMAGES } from "@/constants/Bingo";
import { NumberToCategory } from "@/util/place/category";
import { router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, View } from "react-native";

export default function PlaceItem({
  place,
  onPress = () => {},
}: {
  place: PlaceType;
  onPress?: (placeId: number) => void;
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Pressable
      className={`px-5 py-3 gap-3 flex-row`}
      onPress={() => onPress(place.contentId)}
    >
      <Image
        source={
          place.firstImage
            ? { uri: place.firstImage }
            : DEFAULT_IMAGES[NumberToCategory[place.category]]
        }
        className={`w-22.5 aspect-square rounded-xl`}
      />
      <View className={`gap-1.25 flex-1 justify-start py-0.5`}>
        <View className={`gap-0.5`}>
          <View className={`flex-row gap-1 items-center justify-start`}>
            <CustomText font="title" numberOfLines={1}>
              {place.title}
            </CustomText>
            <CategoryTag category={NumberToCategory[place.category]} />
          </View>
          <CustomText
            font="body3"
            className={`text-text-muted`}
            numberOfLines={1}
          >
            {place.overview || place.title}
          </CustomText>
        </View>
        {!!place.reviewCount && (
          <RateChip rate={place.avgRating} reviewCount={place.reviewCount} />
        )}
        <CustomText
          font="body2"
          className={`text-primary-dark self-start`}
          onPress={() =>
            router.push({
              pathname: "/place/[placeId]",
              params: { placeId: "1" },
            })
          }
        >
          상세보기
        </CustomText>
      </View>
      {isFavorite ? (
        <HeartCircle onPress={() => setIsFavorite(!isFavorite)} />
      ) : (
        <HeartCircleStroke onPress={() => setIsFavorite(!isFavorite)} />
      )}
    </Pressable>
  );
}
