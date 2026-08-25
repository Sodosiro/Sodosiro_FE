import { BusIcon, RightIcon, WalkIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import { Pressable, View } from "react-native";

export type RouteStep = {
  id: string;
  type: "bus" | "walk";
  label: string; // "버스 504-1", "도보"
  duration: string; // "5분" (표시용)
  durationMinutes: number; // 5 (비율 계산용)
  distance: string; // "300m"
};

type OngoingRouteSummaryCardProps = {
  totalDuration: string;
  totalDistance: string;
  fare: string;
  steps: RouteStep[];
  onPressKakaoMap: () => void;
};

const MIN_SEGMENT_FLEX = 0.4; // 도보처럼 시간이 짧아도 바가 너무 안 보이지 않도록 최소 비율 보장

export default function OngoingRouteSummaryCard({
  totalDuration,
  totalDistance,
  fare,
  steps,
  onPressKakaoMap,
}: OngoingRouteSummaryCardProps) {
  return (
    <View className="bg-white rounded-2xl px-4 py-4 border border-[#D9D9D9] ml-8.5 mt-3">
      <CustomText font="title" className="text-text-primary">
        {totalDuration} · {totalDistance} · {fare}
      </CustomText>

      {/* 구간별 비율 진행 바 */}
      <View className="flex-row h-1.5 rounded-full overflow-hidden mt-2.5 mb-4">
        {steps.map((step) => (
          <View
            key={step.id}
            className={`h-full ${step.type === "bus" ? "bg-[#3B82F6]" : "bg-[#D9D9D9]"}`}
            style={{ flexGrow: Math.max(step.durationMinutes, MIN_SEGMENT_FLEX) }}
          />
        ))}
      </View>

      <View className="gap-2.5">
        {steps.map((step) => (
          <View key={step.id} className="flex-row items-center">
            <View
              className={`w-6 h-6 rounded-full items-center justify-center mr-2 ${
                step.type === "bus" ? "bg-[#3B82F6]" : "bg-bg-subtle"
              }`}
            >
              {step.type === "bus" ? <BusIcon /> : <WalkIcon />}
            </View>

            <CustomText font="body2" className="text-text-primary">
              {step.label}
            </CustomText>
            <CustomText font="body2" className="text-text-muted ml-1.5">
              · {step.duration} · {step.distance}
            </CustomText>
          </View>
        ))}
      </View>

      <View className="h-px my-3" />

      <Pressable onPress={onPressKakaoMap} className="flex-row items-center justify-between">
        <CustomText font="body2" className="text-text-muted">
          카카오맵에서 경로 더보기
        </CustomText>
        <RightIcon />
      </Pressable>
    </View>
  );
}
