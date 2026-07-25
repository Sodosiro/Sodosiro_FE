import { RightIcon } from "@/assets/svgs";
import { router } from "expo-router";
import type { ImageSourcePropType } from "react-native";
import { Image, Pressable, View } from "react-native";
import CustomText from "../CustomText";

type Props = {
  imageSource: ImageSourcePropType | string;
  title: string;
  desc: string;
};

export default function PlaceMini({ imageSource, title, desc }: Props) {
  return (
    <Pressable
      className={`flex-row items-center flex-1 gap-3`}
      onPress={() =>
        router.push({ pathname: "/place/[placeId]", params: { placeId: "1" } })
      }
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
      <RightIcon color={"#777777"} />
    </Pressable>
  );
}
