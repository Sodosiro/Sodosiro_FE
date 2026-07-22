import { useCallback, useState } from "react";
import { Dimensions, Pressable, ScrollView, View } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import BottomActionFooter from "../common/BottomActionFooter";
import CustomButton from "../common/CustomButton";
import CustomText from "../common/CustomText";
import Subtitle from "../common/Subtitle";

const width = Dimensions.get("window").width;
const CELL_SIZE = 40;
const MAX_RANGE_DAYS = 7;

const getTodayString = () => {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

type Props = {
  disabled?: boolean;
  onConfirm: (start: string, end: string) => void;
};

export default function DatePickerSheet({ disabled, onConfirm }: Props) {
  // 현재로부터 3달뒤까지
  const months = Array.from({ length: 4 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() + i);
    date.setDate(1);

    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-01`;
  });
  const today = getTodayString();

  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const handleDayPress = useCallback(
    (day: DateData) => {
      const dateString = day.dateString;
      if (dateString < today) return; // 과거 날짜 방어

      // 선택 없음 or 이미 구간 완성됨 -> 새로 시작
      if (!startDate || (startDate && endDate)) {
        setStartDate(dateString);
        setEndDate(null);
        return;
      }

      // 시작일을 다시 탭 -> 당일치기 확정
      if (dateString === startDate) {
        setEndDate(dateString);
        return;
      }

      // 시작일보다 이전 날짜 선택 -> 시작일 갱신
      if (dateString < startDate) {
        setStartDate(dateString);
        setEndDate(null);
        return;
      }

      const diffDays =
        (new Date(dateString).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24) +
        1;

      // 7일 초과 시 새로 시작
      if (diffDays > MAX_RANGE_DAYS) {
        setStartDate(dateString);
        setEndDate(null);
        return;
      }

      setEndDate(dateString);
    },
    [startDate, endDate, today],
  );

  const buttonTitle =
    startDate && endDate
      ? startDate === endDate
        ? `${formatDate(startDate)} 선택하기`
        : `${formatDate(startDate)} - ${formatDate(endDate, true)} 선택하기`
      : "일정을 선택해주세요";

  return (
    <View>
      <View className="px-5 py-5">
        <Subtitle title="여행 날짜를 선택해주세요." />
        <CustomText font="body3 tight" className="text-text-muted mt-2">
          최대 7일까지 선택할 수 있어요.
        </CustomText>
        <ScrollView className="h-[380px]" showsVerticalScrollIndicator={false}>
          {months.map((month) => (
            <View key={month} className={`mt-8`}>
              <Subtitle title={formatMonthTitle(month)} />
              <Calendar
                key={month}
                current={month}
                minDate={today}
                hideExtraDays
                firstDay={0}
                hideArrows
                disableArrowLeft
                disableArrowRight
                disableMonthChange
                onDayPress={handleDayPress}
                style={{ margin: 0, padding: 0 }}
                headerStyle={{ paddingHorizontal: 0, marginHorizontal: 0 }}
                theme={{
                  backgroundColor: "#FFFFFF",
                  calendarBackground: "#FFFFFF",
                  textSectionTitleColor: "#777777",
                  textDayHeaderFontWeight: "500",
                  textDayHeaderFontSize: 15,
                  stylesheet: {
                    calendar: {
                      header: {
                        week: {
                          flexDirection: "row",
                          justifyContent: "space-between",
                        },
                      },
                    },
                  },
                }}
                renderHeader={() => <View style={{ height: 0 }} />}

                dayComponent={({ date, state }: any) => {
                  if (!date) return <View style={{ width: width / 7 }} />;
                  return (
                    <DayCell
                      date={date}
                      state={state}
                      startDate={startDate}
                      endDate={endDate}
                      onPress={() => handleDayPress(date)}
                    />
                  );
                }}
              />
            </View>
          ))}
        </ScrollView>
      </View>

      <BottomActionFooter>
        <CustomButton
          type="primary"
          title={buttonTitle}
          stretch
          size="medium"
          disabled={disabled || !startDate || !endDate}
          onPress={() => startDate && endDate && onConfirm(startDate, endDate)}
        />
      </BottomActionFooter>
    </View>
  );
}

type DayCellProps = {
  date: DateData;
  state?: string;
  startDate: string | null;
  endDate: string | null;
  onPress: () => void;
};

function DayCell({ date, state, startDate, endDate, onPress }: DayCellProps) {
  const dateString = date.dateString;
  const isDisabled = state === "disabled";
  const isStart = dateString === startDate;
  const isEnd = dateString === endDate;
  const isSingleDay = !!startDate && startDate === endDate && isStart;
  const hasRange = !!startDate && !!endDate && startDate !== endDate;
  const isMiddle = hasRange && dateString > startDate! && dateString < endDate!;
  const isEdge = isStart || isEnd;

  const day = new Date(dateString).getDay(); // 0: 일, 6: 토
  const isWeekend = day === 0 || day === 6;
  const isToday = state === "today";

  const cellWidth = width / 7;

  const textColor = isDisabled ? "#C9C9C9" : isEdge ? "#FFFFFF" : isWeekend ? "#E0483C" : "#1A1A1A";

  return (
    <Pressable
      onPress={isDisabled ? undefined : onPress}
      disabled={isDisabled}
      style={{
        width: cellWidth,
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <View
        style={{
          width: cellWidth,
          height: CELL_SIZE,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* 구간 배경 트랙 (당일치기는 트랙 없음) */}
        {hasRange && !isSingleDay && (isMiddle || isStart || isEnd) && (
          <View
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: isStart ? "50%" : 0,
              right: isEnd ? "50%" : 0,
              backgroundColor: "#EDF1D9",
            }}
          />
        )}

        {/* 날짜 원 */}
        <View
          style={{
            width: CELL_SIZE,
            height: CELL_SIZE,
            borderRadius: CELL_SIZE / 2,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: isEdge ? "#7E9432" : "transparent",
          }}
        >
          <CustomText
            font="body2"
            style={{ fontWeight: "500", color: isToday && !isEdge ? "#A3BE3B" : textColor }}
          >
            {date.day}
          </CustomText>
        </View>
        {isToday && !isEdge && (
          <CustomText
            font="body2"
            style={{ color: "#A3BE3B", position: "absolute", bottom: -5, opacity: isToday ? 1 : 0 }}
          >
            오늘
          </CustomText>
        )}
      </View>
    </Pressable>
  );
}

function formatDate(dateString: string, shortMonth = false) {
  const [y, m, d] = dateString.split("-");
  return shortMonth ? `${m}.${d}` : `${y}.${m}.${d}`;
}

function formatMonthTitle(monthString: string) {
  const [y, m] = monthString.split("-");
  return `${y}년 ${Number(m)}월`;
}
