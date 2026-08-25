import { RightIcon } from "@/assets/svgs";
import RateChip from "@/components/place/RateChip";
import { DEFAULT_IMAGES } from "@/constants/Category";
import { NumberToCategory } from "@/util/place/category";
import { router } from "expo-router";
import { Image, Pressable, View } from "react-native";
import CustomText from "../common/CustomText";

type Props = {
  id: number;
  imageUrl?: string | null;
  title: string;
  desc: string;
  category: CategoryNumber;
  icon?: React.ReactNode;
  avgRating?: number;
  onPress?: () => void;
};

export default function TripPlaceMini({
  id,
  imageUrl,
  title,
  desc,
  category,
  avgRating,
  icon = <RightIcon color={"#777777"} />,
  onPress = () => router.push({ pathname: "/place/[placeId]", params: { placeId: id } }),
}: Props) {
  return (
    <Pressable className={`flex-row items-center flex-1 gap-3 min-h-14`} onPress={onPress}>
      <Image
        source={imageUrl ? { uri: imageUrl } : DEFAULT_IMAGES[NumberToCategory[category]]}
        className={`rounded-xl`}
        style={{ width: 52, height: 52 }}
        resizeMode="cover"
      />
      <View className={`flex-1 gap-0.5`}>
        <CustomText font="title" numberOfLines={1}>
          {title}
        </CustomText>
        <CustomText font="body3" className={`text-text-muted`} numberOfLines={1}>
          {desc}
        </CustomText>
        {Number(avgRating) > 0 && (
          <RateChip rate={avgRating} reviewCount={0} noReviewCount={true} />
        )}
      </View>
      {icon}
    </Pressable>
  );
}
