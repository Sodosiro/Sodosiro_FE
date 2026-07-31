import CustomText from "@/components/common/CustomText";
import { differenceInCalendarDays } from "date-fns";
import { View } from "react-native";

type Props = {
  className?: string;
  startDate: Date;
};

export default function DdayBadge({ className, startDate }: Props) {
  const today = new Date();
  const dDay = differenceInCalendarDays(startDate, today);
  const dDayText = dDay > 0 ? `D-${dDay}` : "D-Day";

  return (
    <View
      className={`${className} bg-white px-2.5 py-2 rounded-full self-start`}
    >
      <CustomText font="body3 tight" className={`px-0.5`}>
        {dDayText}
      </CustomText>
    </View>
  );
}
