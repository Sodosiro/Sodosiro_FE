import { CalendarIcon } from '@/assets/svgs';
import { Pressable, Text } from 'react-native';

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
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
}

export default function DatePickerButton({ dateRange, placeholder = '여행 일정을 선택해주세요.', disabled = false, onPress }: Props) {
  const { startDate, endDate } = dateRange;

  const hasValue = startDate && endDate;

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
        ${disabled ? 'opacity-40' : ''}
      `}
    >
      <Text className={`text-base ${hasValue ? 'text-[#1A1A1A] font-medium' : 'text-text-muted'}`}>{hasValue ? `${formatDate(startDate)} ~ ${formatDate(endDate)}` : placeholder}</Text>

      <CalendarIcon color="#888888" />
    </Pressable>
  );
}
