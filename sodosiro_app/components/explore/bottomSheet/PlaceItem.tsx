import CustomText from "@/components/common/CustomText";
import FavoriteCircleIcon from "@/components/icon/favorite/FavoriteCircleIcon";
import RateChip from "@/components/place/RateChip";
import Tag from "@/components/place/Tag";
import { DEFAULT_IMAGES } from "@/constants/Bingo";
import useSelectedAnimation from "@/hooks/useSelcetedAnimation";
import { NumberToCategory } from "@/util/place/category";
import { router } from "expo-router";
import { Image, Pressable, View } from "react-native";

export default function PlaceItem({
  place,
  handleLike,
  onPress = () => {},
}: {
  place: PlaceType;
  handleLike: (contentId: number) => Promise<void>;
  onPress?: (placeId: number) => void;
}) {
  const handleLikeToggle = async () => {
    await handleLike(place?.contentId);
  };

  const { fillStyle } = useSelectedAnimation(place?.liked, {
    fill: ["transparent", "#444444"],
  });

  return (
    <Pressable
      className={`px-5 py-3 gap-3 flex-row`}
      onPress={() => onPress(place?.contentId)}
    >
      <Image
        source={
          place?.firstImage
            ? { uri: place.firstImage }
            : DEFAULT_IMAGES[NumberToCategory[place?.category]]
        }
        className={`w-22.5 aspect-square rounded-xl`}
      />
      <View className={`gap-1.25 flex-1 justify-start py-0.5`}>
        <View className={`gap-0.5`}>
          <View className={`flex-row gap-1 items-center justify-start`}>
            <CustomText font="title" numberOfLines={1}>
              {place?.title}
            </CustomText>
            <Tag category={NumberToCategory[place?.category]} />
          </View>
          <CustomText
            font="body3"
            className={`text-text-muted`}
            numberOfLines={1}
          >
            {place?.overview || place?.title}
          </CustomText>
        </View>
        {!!place?.reviewCount && (
          <RateChip rate={place?.avgRating} reviewCount={place?.reviewCount} />
        )}
        <CustomText
          font="body2"
          className={`text-primary-dark self-start`}
          onPress={() =>
            router.push({
              pathname: "/place/[placeId]",
              params: { placeId: place?.contentId },
            })
          }
        >
          상세보기
        </CustomText>
      </View>
      <Pressable onPress={handleLikeToggle}>
        <FavoriteCircleIcon animatedFill={fillStyle} />
      </Pressable>
    </Pressable>
  );
}
