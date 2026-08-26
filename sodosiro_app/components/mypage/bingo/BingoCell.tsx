import { BigCheckIcon, KeyIcon } from "@/assets/svgs";
import { AnimatedPressable } from "@/components/common/animated/Animated";
import CustomText from "@/components/common/CustomText";
import { CELL_SIZE } from "@/constants/Bingo";
import useSelectedAnimation from "@/hooks/useSelcetedAnimation";
import { PressableProps, View } from "react-native";

interface Props extends PressableProps {
  bingoItem: BingoItem;
}

export default function BingoCell({ bingoItem, onPress }: Props) {
  const { containerStyle, borderStyle } = useSelectedAnimation(
    bingoItem.completed,
    {
      background: ["#f5f5f5", "#d4e393"],
      border: ["#f5f5f5", "#7e9432"],
    },
  );

  return (
    <AnimatedPressable
      style={[
        { width: CELL_SIZE, height: CELL_SIZE },
        containerStyle,
        borderStyle,
      ]}
      className={`px-2.5 gap-3 items-center justify-center rounded-xl border-2`}
      onPress={onPress}
    >
      {bingoItem.completed ? (
        <BigCheckIcon width={24} height={24} />
      ) : (
        <KeyIcon width={24} height={24} />
      )}
      <View className={`justify-center`}>
        <CustomText font="body3" className={`text-center`} numberOfLines={1}>
          {bingoItem.title}
        </CustomText>
      </View>
    </AnimatedPressable>
  );
}
