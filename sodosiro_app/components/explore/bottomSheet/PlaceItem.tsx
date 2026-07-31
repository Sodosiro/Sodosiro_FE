import { HeartCircle, HeartCircleStroke } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import CategoryTag from "@/components/place/CategoryTag";
import RateChip from "@/components/place/RateChip";
import { router } from "expo-router";
import { useState } from "react";
import { Image, View } from "react-native";

export default function PlaceItem({ place }: { place: PlaceType }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <View className={`px-5 py-3 gap-3 flex-row`}>
      <Image
        source={place.imageSource}
        className={`w-22.5 aspect-square rounded-xl`}
      />
      <View className={`gap-1 flex-1 justify-center`}>
        <View className={`flex-row gap-1 items-center justify-start`}>
          <CustomText font="title" numberOfLines={1}>
            {place.title}
          </CustomText>
          <CategoryTag category={place.category} />
        </View>
        <View className={`gap-0.5`}>
          <CustomText
            font="body3"
            className={`text-text-muted`}
            numberOfLines={1}
          >
            {place.desc}
          </CustomText>
          <View className={`flex-row gap-1`}>
            <CustomText font="body3" className={`text-text-secondary`}>
              영업 중
            </CustomText>
            <RateChip rate={place.rate} reviewCount={place.reviewCount} />
          </View>
        </View>
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
    </View>
  );
}
