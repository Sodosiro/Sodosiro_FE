import { RightIcon } from "@/assets/svgs";
import { router } from "expo-router";
import type { ImageSourcePropType } from "react-native";
import { Image, Pressable, View } from "react-native";
import CustomText from "../common/CustomText";

type Props = {
  id: number;
  imageSource: ImageSourcePropType | string;
  title: string;
  desc: string;
  icon?: React.ReactNode;
  onPress?: () => void;
};

export default function PlaceMini({
  id,
  imageSource,
  title,
  desc,
  icon = <RightIcon color={"#777777"} />,
  onPress = () =>
    router.push({ pathname: "/place/[placeId]", params: { placeId: id } }),
}: Props) {
  return (
    <Pressable
      className={`flex-row items-center flex-1 gap-3`}
      onPress={onPress}
    >
      <Image
        source={
          typeof imageSource === "string" ? { uri: imageSource } : imageSource
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
