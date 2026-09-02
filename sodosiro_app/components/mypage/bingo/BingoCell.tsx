import { LockIcon } from "@/assets/svgs";
import { AnimatedPressable } from "@/components/common/animated/Animated";
import CustomText from "@/components/common/CustomText";
import { CELL_SIZE } from "@/constants/Bingo";
import useSelectedAnimation from "@/hooks/useSelcetedAnimation";
import { getBingoSeasonImage } from "@/util/bingo/bingoSeason";
import { Image, PressableProps, View } from "react-native";

interface Props extends PressableProps {
  bingoItem: BingoItem;
  season: BingoSeasonType;
}

export default function BingoCell({ bingoItem, season, onPress }: Props) {
  const { containerStyle, borderStyle } = useSelectedAnimation(
    bingoItem.completed,
    {
      background: ["#f5f5f5", "transparent"],
      border: ["#88888888", "#7e9432dd"],
    },
  );

  const imageSource = bingoItem.firstImage
    ? { uri: bingoItem.firstImage }
    : getBingoSeasonImage(season);

  return (
    <AnimatedPressable
      style={[
        { width: CELL_SIZE, height: CELL_SIZE },
        borderStyle,
        containerStyle,
      ]}
      className={`gap-3 items-center justify-center rounded-xl border-2 overflow-hidden`}
      onPress={onPress}
    >
      <View className={`w-full h-full absolute items-center justify-center`}>
        {bingoItem.completed ? (
          <>
            <View className={`w-full h-full bg-black`} />
            <Image
              source={imageSource}
              className={`w-full h-full absolute opacity-70`}
              resizeMode="cover"
            />
          </>
        ) : (
          <LockIcon opacity={0.3} />
        )}
      </View>
      <View className={`justify-center px-2.5`}>
        <CustomText
          font="body3"
          className={`text-center ${bingoItem.completed && `text-white`}`}
          numberOfLines={2}
        >
          {bingoItem.title}
        </CustomText>
      </View>
    </AnimatedPressable>
  );
}
