import { TransitRouteDetail, TransitRouteStep } from "@/api/course";
import { BusIcon, RightIcon, WalkIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import { Pressable, View } from "react-native";

const MIN_SEGMENT_FLEX = 0.4;

// 헬퍼 함수: 초 단위 시간을 분/시간 문구로 변환
const formatDuration = (seconds: number): string => {
  const minutes = Math.max(1, Math.round(seconds / 60)); // 최소 1분 보장
  if (minutes < 60) return `${minutes}분`;
  const hours = Math.floor(minutes / 60);
  const remainMinutes = minutes % 60;
  return remainMinutes > 0 ? `${hours}시간 ${remainMinutes}분` : `${hours}시간`;
};

// 헬퍼 함수: 미터 단위 거리를 m/km 문구로 변환
const formatDistance = (meters: number): string => {
  if (meters < 1000) return `${meters}m`;
  return `${(meters / 1000).toFixed(1)}km`;
};

// 헬퍼 함수: TransitRouteStep을 UI 표시용 속성으로 변환
const parseStepItem = (step: TransitRouteStep, index: number) => {
  const isBus =
    step.type?.toUpperCase().includes("BUS") ||
    (step.vehicleNames && step.vehicleNames.length > 0);
  const isWalk =
    step.type?.toUpperCase().includes("WALK") ||
    (!isBus && step.vehicleNames?.length === 0);

  let label = isWalk ? "도보" : "대중교통";
  if (isBus && step.vehicleNames && step.vehicleNames.length > 0) {
    label = `버스 ${step.vehicleNames.join(", ")}`;
  }

  const durationMinutes = Math.max(1, Math.round(step.timeSeconds / 60));

  return {
    id: `${step.type}-${index}-${step.distanceMeters}`,
    type: isBus ? ("bus" as const) : ("walk" as const),
    label,
    duration: formatDuration(step.timeSeconds),
    durationMinutes,
    distance: formatDistance(step.distanceMeters),
  };
};

type BusRouteSummaryCardProps = {
  routeDetail: TransitRouteDetail;
  onPressKakaoMap: () => void;
};

export default function BusRouteSummaryCard({
  routeDetail,
  onPressKakaoMap,
}: BusRouteSummaryCardProps) {
  // 요약 데이터 바인딩
  const totalDuration = formatDuration(routeDetail.totalTimeSeconds);
  const totalDistance = formatDistance(routeDetail.totalDistanceMeters);
  const fare = `${routeDetail?.fare?.toLocaleString()}원`;

  // steps 데이터 바인딩
  const formattedSteps = routeDetail.steps.map((step, index) =>
    parseStepItem(step, index),
  );

  if (!routeDetail.success) {
    return (
      <View className="bg-white rounded-2xl px-4 py-4 ml-8.5 mt-3 justify-center items-center">
        <CustomText font="body3" className="text-text-muted">
          이동 경로를 찾을 수 없어요.
        </CustomText>
      </View>
    );
  }

  return (
    <View className="bg-white rounded-2xl px-4 py-4 border border-border ml-8.5 mt-3 shrink-0">
      <CustomText font="title" className="text-text-primary">
        {totalDuration} · {totalDistance} {routeDetail?.fare ? `· ${fare}` : ""}
      </CustomText>

      {/* 구간별 비율 진행 바 */}
      <View className="flex-row h-1.5 w-full rounded-full overflow-hidden mt-2.5 mb-4 bg-border">
        {formattedSteps.map((step) => (
          <View
            key={step.id}
            className={`h-full ${step.type === "bus" ? "bg-[#2A71FB]" : "bg-border"}`}
            style={{
              flexGrow: Math.max(step.durationMinutes, MIN_SEGMENT_FLEX),
              flexBasis: 0,
            }}
          />
        ))}
      </View>

      <View className="gap-3">
        {formattedSteps.map((step) => (
          <View key={step.id} className="flex-row items-center">
            <View
              className={`w-6 h-6 rounded-full items-center justify-center mr-2 shrink-0 ${
                step.type === "bus" ? "bg-[#2A71FB]" : "bg-bg-subtle"
              }`}
            >
              {step.type === "bus" ? <BusIcon /> : <WalkIcon />}
            </View>

            <View className="flex-1 flex-row items-center flex-wrap">
              <CustomText
                font="body2"
                className="text-text-primary shrink"
                numberOfLines={1}
              >
                {step.label}
              </CustomText>
              <CustomText
                font="body2"
                className="text-text-muted ml-1.5 shrink-0"
              >
                · {step.duration} · {step.distance}
              </CustomText>
            </View>
          </View>
        ))}
      </View>

      <Pressable
        onPress={onPressKakaoMap}
        className="flex-row items-center justify-between pt-7"
      >
        <CustomText font="body2" className="text-text-muted">
          카카오맵에서 경로 더보기
        </CustomText>
        <RightIcon color={"#888888"} height={20} />
      </Pressable>
    </View>
  );
}
