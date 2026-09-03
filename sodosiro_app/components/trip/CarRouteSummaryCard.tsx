import { CarRouteLeg } from "@/api/course";
import { RightIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import { Pressable, View } from "react-native";

type CarRouteSummaryCardProps = {
  carRouteLeg: CarRouteLeg;
  onPressKakaoMap: () => void;
};

export default function CarRouteSummaryCard({
  carRouteLeg,
  onPressKakaoMap,
}: CarRouteSummaryCardProps) {
  if (!carRouteLeg.success) {
    return (
      <View className="bg-white rounded-2xl px-4 py-4 ml-8.5 mt-3 justify-center items-center">
        <CustomText font="body3" className="text-text-muted">
          이동 경로를 찾을 수 없어요.
        </CustomText>
      </View>
    );
  }

  return (
    <View className="bg-white rounded-2xl px-4 py-3 border border-border ml-8.5 mt-3 gap-4">
      <View className={`gap-2`}>
        <View className="flex-row items-center gap-1">
          <CustomText font="title" className="text-text-primary">
            {Math.max(1, Math.round(carRouteLeg.durationSeconds / 60))}분
          </CustomText>
          <CustomText font="body3" className="text-text-muted">
            · {Number((carRouteLeg.distanceMeters / 1000).toFixed(1))}km
          </CustomText>
        </View>

        <View className="flex-row items-center gap-1">
          <CustomText font="title" className="text-text-primary">
            통행료
          </CustomText>
          <CustomText font="body3" className="text-text-muted">
            · {carRouteLeg.tollFare?.toLocaleString()}원
          </CustomText>
        </View>

        <View className="flex-row items-center gap-1">
          <CustomText font="title" className="text-text-primary">
            주유비
          </CustomText>
          <CustomText font="body3" className="text-text-muted">
            · {carRouteLeg.estimatedFuelCost?.toLocaleString()}원
          </CustomText>
        </View>
      </View>

      <Pressable
        onPress={onPressKakaoMap}
        className="flex-row items-center justify-between"
      >
        <CustomText font="body2" className="text-text-muted">
          카카오맵에서 경로 더보기
        </CustomText>
        <RightIcon color={"#888888"} width={20} />
      </Pressable>
    </View>
  );
}
