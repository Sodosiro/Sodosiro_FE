import { HeartCircle, HeartCircleStroke, StarIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import { CategoryMap } from "@/util/place/category";
import { useState } from "react";
import { Image, View } from "react-native";

export default function Place({ place }: { place: PlaceType }) {
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
          <View className={`px-1.5 py-1 bg-bg-subtle rounded-sm`}>
            <CustomText font="body3 tight">
              {CategoryMap[place.category]}
            </CustomText>
          </View>
        </View>
        <View className={`gap-0.5`}>
          <CustomText
            font="body3"
            className={`text-text-muted`}
            numberOfLines={1}
          >
            {place.desc}
          </CustomText>
          <View className={`flex-row items-center gap-0.5`}>
            <StarIcon />
            <CustomText font="body2">{place.rate}</CustomText>
            <CustomText font="body3" className={`text-[#666666]`}>
              {"("}
              {place.review}
              {")"}
            </CustomText>
          </View>
        </View>
        <CustomText font="body2" className={`text-primary-dark`}>
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
