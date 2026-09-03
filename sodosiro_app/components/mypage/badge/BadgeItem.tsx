import CustomText from "@/components/common/CustomText";
import { getBadgeImage } from "@/util/badge/badge";
import { formatRegionName } from "@/util/region/region";
import { Image, View } from "react-native";

export default function BadgeItem({
  badge,
  withText,
}: {
  badge: BadgeType;
  withText?: boolean;
}) {
  const imageSource = getBadgeImage(badge);

  const { width, height } = Image.resolveAssetSource(imageSource);

  return (
    <View className={`px-2.5 items-center`}>
      <View className={`items-center justify-center flex-1`}>
        <Image
          source={imageSource}
          style={{
            width: "100%",
            height: "100%",
            aspectRatio: width / height,
          }}
        />
      </View>
      {withText && (
        <CustomText font="body2">{formatRegionName(badge?.name)}</CustomText>
      )}
    </View>
  );
}
