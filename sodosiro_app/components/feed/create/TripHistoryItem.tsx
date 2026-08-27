import {
  AnimatedCircle,
  AnimatedPressable,
} from "@/components/common/animated/Animated";
import CustomText from "@/components/common/CustomText";
import useSelectedAnimation from "@/hooks/useSelcetedAnimation";
import { formatDate } from "@/util/time/time";
import { Dispatch, SetStateAction } from "react";
import { View } from "react-native";
import Svg from "react-native-svg";

export default function TripHistoryItem({
  historyItem,
  selectedCourseId,
  setSelectedCourseId,
}: {
  historyItem: CourseType;
  selectedCourseId: number | undefined;
  setSelectedCourseId: Dispatch<SetStateAction<number | undefined>>;
}) {
  const { courseId: historyId, title, startDate, endDate } = historyItem ?? {};

  const { containerStyle, borderStyle, strokeStyle, fillStyle } =
    useSelectedAnimation(historyId === selectedCourseId, {
      background: ["transparent", "#F3F8DE"],
      border: ["#d9d9d9", "#A9C92D"],
      stroke: ["#d9d9d9", "#A9C92D"],
      fill: ["transparent", "#A9C92D"],
    });

  return (
    <AnimatedPressable
      className={`flex-row rounded-xl gap-4 border p-3 items-center justify-between`}
      style={[containerStyle, borderStyle]}
      onPress={() => setSelectedCourseId(historyId)}
    >
      <View className={`gap-1`}>
        <CustomText font="title">{title}</CustomText>
        <CustomText font="body3" className={`text-text-muted`}>
          {formatDate(startDate, endDate)}
        </CustomText>
      </View>
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
    </AnimatedPressable>
  );
}
