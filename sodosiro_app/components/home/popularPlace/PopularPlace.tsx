import { Image, ImageSourcePropType, View } from "react-native";
import CustomText from "../../common/CustomText";
import { RightIcon } from "@/assets/svgs";

type Props = {
  id: number;
  index: number;
  imageSource: ImageSourcePropType;
  title: string;
  desc: string;
};

export default function PopularPlace({
  id,
  index,
  imageSource,
  title,
  desc,
}: Props) {
  return (
    <View className={`flex-row items-center justify-between`}>
      <CustomText className={`w-4 text-body3 text-text-muted`}>
        {index + 1}
      </CustomText>
      <View className={`flex-row items-center flex-1 gap-3`}>
        <Image
          source={imageSource}
          className={`rounded-xl`}
          style={{ width: 52, height: 52 }}
          resizeMode="cover"
        />
        <View className={`flex-1 gap-0.5`}>
          <CustomText className={`text-title`} numberOfLines={1}>
            {title}
          </CustomText>
          <CustomText
            className={`text-body3 text-text-muted`}
            numberOfLines={1}
          >
            {desc}
          </CustomText>
        </View>
      </View>
      <RightIcon />
    </View>
  );
}
