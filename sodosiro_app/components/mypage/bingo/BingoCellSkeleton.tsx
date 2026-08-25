import { KeyIcon } from "@/assets/svgs";
import { SkeletonLine } from "@/components/common/skeleton/SkeletonLine";
import { CELL_SIZE } from "@/constants/Bingo";
import { Pressable, View } from "react-native";

export default function BingoCellSkeleton() {
  return (
    <Pressable
      style={{ width: CELL_SIZE, height: CELL_SIZE }}
      className={`px-2.5 gap-3 items-center justify-center rounded-xl border-2 bg-bg-subtle border-bg-subtle`}
    >
      <KeyIcon width={24} height={24} />
      <View className={`w-full justify-center`}>
        <SkeletonLine font="body3" />
      </View>
    </Pressable>
  );
}
