import {
  AnimatedCircle,
  AnimatedPressable,
  AnimatedView,
} from "@/components/common/animated/Animated";
import CustomText from "@/components/common/CustomText";
import { DEFAULT_IMAGES } from "@/constants/Category";
import useSelectedAnimation from "@/hooks/useSelcetedAnimation";
import { NumberToCategory } from "@/util/place/category";
import { Dispatch, SetStateAction } from "react";
import { Image, View } from "react-native";
import Svg from "react-native-svg";

export default function TripHistoryPlaceItem({
  place,
  selectedPlace,
  setSelectedPlace,
  alreadyPosted,
}: {
  place: TripSpotType;
  selectedPlace?: TripSpotType | null;
  setSelectedPlace?: Dispatch<SetStateAction<TripSpotType | null>>;
  alreadyPosted: boolean;
}) {
  const { contentId, title, category, firstImage } = place ?? {};
  const { containerStyle, borderStyle, strokeStyle, fillStyle } =
    useSelectedAnimation(contentId === selectedPlace?.contentId, {
      background: ["transparent", "#F3F8DE"],
      border: ["#d9d9d9", "#A9C92D"],
      stroke: ["#d9d9d9", "#A9C92D"],
      fill: ["transparent", "#A9C92D"],
    });

  const imageSource = firstImage
    ? { uri: firstImage }
    : DEFAULT_IMAGES[NumberToCategory[category]];

  return (
    <AnimatedPressable
      className={`flex-row rounded-xl gap-4 border p-2 pr-4 items-center justify-between ${alreadyPosted && `opacity-50`}`}
      style={[containerStyle, borderStyle]}
      onPress={
        setSelectedPlace && !alreadyPosted
          ? () => setSelectedPlace(place)
          : undefined
      }
    >
      <View className={`flex-row gap-3 items-center`}>
        <AnimatedView
          className={`size-13 rounded-xl border overflow-hidden`}
          style={borderStyle}
        >
          <Image source={imageSource} className={`size-13`} />
        </AnimatedView>
        <CustomText font="title" className={`shrink`}>
          {title}
        </CustomText>
      </View>
      {setSelectedPlace && (
        <Svg width={24} height={24} viewBox="0 0 24 24">
          <AnimatedCircle
            cx={12}
            cy={12}
            r={10}
            animatedProps={strokeStyle}
            fill="transparent"
            strokeWidth={2}
          />
          <AnimatedCircle cx={12} cy={12} r={6} animatedProps={fillStyle} />
        </Svg>
      )}
    </AnimatedPressable>
  );
}
