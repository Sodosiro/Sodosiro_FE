import { View } from "react-native";
import { differenceInCalendarDays } from "date-fns";
import CustomText from "@/components/common/CustomText";

type Props = {
  className?: string;
  startDate: Date;
};

export default function FestivalBadge({ className, startDate }: Props) {
  const today = new Date();
  const dDay = differenceInCalendarDays(startDate, today);
  const dDayText = dDay > 0 ? `D-${dDay}` : "D-Day";

  return (
    <View className={`${className} bg-white px-3 py-2 rounded-full`}>
      <CustomText font="body3 tight">{dDayText}</CustomText>
    </View>
  );
}
