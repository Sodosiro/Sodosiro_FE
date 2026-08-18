import CustomText from "@/components/common/CustomText";
import { differenceInCalendarDays } from "date-fns";
import { View } from "react-native";

interface Props {
  className?: string;
  startDate: Date;
  endDate: Date;
}

export default function DdayBadge({ className, startDate, endDate }: Props) {
  const today = new Date();

  const startDiff = differenceInCalendarDays(startDate, today);
  const endDiff = differenceInCalendarDays(endDate, today);

  const dDayText =
    startDiff > 0 ? `D-${startDiff}` : endDiff >= 0 ? "진행 중" : "종료";

  return (
    <View
      className={`${className} bg-white px-2.5 py-2 rounded-full self-start`}
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 0,
        elevation: 8,
      }}
    >
      <CustomText font="body3 tight" className="px-0.5">
        {dDayText}
      </CustomText>
    </View>
  );
}
