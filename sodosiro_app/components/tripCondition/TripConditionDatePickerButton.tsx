import { CalendarIcon } from "@/assets/svgs";
import { DAY_OF_WEEKNAMES } from "@/constants/Trip";
import { Pressable, Text } from "react-native";

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

type Props = {
  dateRange: DateRange;
  placeholder?: string;
  disabled?: boolean;
  onPress?: () => void;
};

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const weekDay = DAY_OF_WEEKNAMES[date.getDay()];

  return `${year}.${month}.${day} (${weekDay})`;
}

export default function TripConditionDatePickerButton({
  dateRange,
  placeholder = "여행 일정을 선택해주세요.",
  disabled = false,
  onPress,
}: Props) {
  const { startDate, endDate } = dateRange;

  const hasValue = startDate && endDate;
  const isOneDay = startDate && endDate === null;

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      className={`
        flex-row
        items-center
        justify-between
        rounded-full
        border
        border-border
        bg-[#F5F5F5]
        px-5
        py-4
        ${disabled ? "opacity-50" : ""}
      `}
    >
      <Text
        className={`text-base ${hasValue || isOneDay ? "text-[#1A1A1A] font-medium" : "text-text-muted"}`}
      >
        {hasValue && !isOneDay
          ? `${formatDate(startDate)} ~ ${formatDate(endDate)}`
          : isOneDay
            ? `${formatDate(startDate)}`
            : placeholder}
      </Text>

      <CalendarIcon color="#888888" />
    </Pressable>
  );
}
