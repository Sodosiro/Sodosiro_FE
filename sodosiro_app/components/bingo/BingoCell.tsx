import { BigCheckIcon, LockIcon } from "@/assets/svgs";
import { CELL_SIZE } from "@/constants/Bingo";
import { View } from "react-native";
import CustomText from "../common/CustomText";

type BingoItem = {
  position: number;
  title: string;
  completed: boolean;
};

export default function BingoCell({ bingoItem }: { bingoItem: BingoItem }) {
  return (
    <View
      style={{ width: CELL_SIZE, height: CELL_SIZE }}
      className={`px-2 gap-1 items-center justify-center rounded-xl border-2 ${bingoItem.completed ? `border-primary-dark bg-[#D4E393]` : `bg-bg-subtle border-bg-subtle`} `}
    >
      {bingoItem.completed ? (
        <BigCheckIcon width={24} height={24} />
      ) : (
        <LockIcon width={24} height={24} />
      )}
      <View className={`h-10 justify-center`}>
        <CustomText font="body3" className={`text-center`} numberOfLines={2}>
          {bingoItem.title}
        </CustomText>
      </View>
    </View>
  );
}
