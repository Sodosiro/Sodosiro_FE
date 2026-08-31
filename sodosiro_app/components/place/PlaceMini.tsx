import { RightIcon } from "@/assets/svgs";
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
  onPress?: (() => void) | ((id: number) => void);
};

export default function PlaceMini({
  id,
  imageUrl,
  title,
  desc,
  category,
  icon = <RightIcon color={"#777777"} />,
  onPress,
}: Props) {
  return (
    <Pressable
      className={`flex-row items-center flex-1 gap-3 min-h-14`}
      onPress={
        onPress
          ? () => onPress(id)
          : () =>
              router.push({
                pathname: "/place/[placeId]",
                params: { placeId: id },
              })
      }
    >
      <Image
        source={
          imageUrl
            ? { uri: imageUrl }
            : DEFAULT_IMAGES[NumberToCategory[category]]
        }
        className={`rounded-xl`}
        style={{ width: 52, height: 52 }}
        resizeMode="cover"
      />
      <View className={`flex-1 gap-0.5`}>
        <CustomText font="title" numberOfLines={1}>
          {title}
        </CustomText>
        <CustomText
          font="body3"
          className={`text-text-muted`}
          numberOfLines={1}
        >
          {desc}
        </CustomText>
      </View>
      {icon}
    </Pressable>
  );
}
