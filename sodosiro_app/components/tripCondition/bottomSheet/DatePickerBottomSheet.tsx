import BottomActionBar from "@/components/common/BottomActionBar";
import CustomButton from "@/components/common/CustomButton";
import CustomText from "@/components/common/CustomText";
import Subtitle from "@/components/common/Subtitle";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  useBottomSheetSpringConfigs,
  type BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import { Dimensions, Pressable, View } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DateRange } from "../TripConditionDatePickerButton";

const width = Dimensions.get("window").width;
// 달력 컨테이너 전체 너비 (좌우 패딩 20px씩 총 40px 제외)
const CALENDAR_WIDTH = width - 40;
const CELL_WIDTH = CALENDAR_WIDTH / 7;
const CELL_SIZE = 40;
const MAX_RANGE_DAYS = 7;

const getTodayString = () => {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const dateToString = (date?: Date | null): string | null => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) return null;
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

type Props = {
  bottomSheetRef: RefObject<BottomSheetModal | null>;
  disabled?: boolean;
  initialDateRange: DateRange;
  onConfirm: (start: string, end: string) => void;
};

export default function DatePickerBottomSheet({
  bottomSheetRef,
  disabled,
  initialDateRange,
  onConfirm,
}: Props) {
  const insets = useSafeAreaInsets();

  const months = Array.from({ length: 4 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() + i);
    date.setDate(1);

    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-01`;
  });
  const uniqueMonths = [...new Set(months)];
  const today = getTodayString();

  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const scrollRef = useRef<any>(null);
  const monthOffsets = useRef<Record<string, number>>({});

  const normalizeToMonthKey = (date?: Date): string | null => {
    const dateStr = dateToString(date);
    if (!dateStr) return null;
    return `${dateStr.slice(0, 7)}-01`;
  };

  const pendingScrollMonth = useRef<string | null>(
    normalizeToMonthKey(initialDateRange?.startDate ?? undefined),
  );
  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 100,
    stiffness: 400,
    mass: 1,
  });

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.5}
      />
    ),
    [],
  );

  const handleDayPress = useCallback(
    (day: DateData) => {
      const dateString = day.dateString;

      if (dateString < today) return;

      if (!startDate) {
        setStartDate(dateString);
        setEndDate(dateString);
        return;
      }

      if (dateString === startDate) {
        setEndDate(startDate);
        return;
      }

      if (dateString < startDate) {
        setStartDate(dateString);
        setEndDate(dateString);
        return;
      }

      const diffDays =
        (new Date(dateString).getTime() - new Date(startDate).getTime()) /
          (1000 * 60 * 60 * 24) +
        1;

      if (diffDays > MAX_RANGE_DAYS) {
        setStartDate(dateString);
        setEndDate(dateString);
        return;
      }

      setEndDate(dateString);
    },
    [startDate, today],
  );

  useEffect(() => {
    if (!initialDateRange?.startDate) {
      setStartDate(null);
      setEndDate(null);
      pendingScrollMonth.current = null;
      return;
    }

    const startStr = dateToString(initialDateRange.startDate);

    if (!startStr || startStr < today) {
      setStartDate(null);
      setEndDate(null);
      return;
    }

    const endStr = dateToString(initialDateRange.endDate) || startStr;

    const monthKey = `${startStr.slice(0, 7)}-01`;

    pendingScrollMonth.current = monthKey;

    setStartDate(startStr);
    setEndDate(endStr);
  }, [initialDateRange?.startDate, initialDateRange?.endDate, today]);

  useEffect(() => {
    if (!startDate) return;
    const monthKey = pendingScrollMonth.current;
    if (!monthKey) return;

    const offset = monthOffsets.current[monthKey];
    if (offset !== undefined) {
      requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({ y: offset, animated: true });
      });
      pendingScrollMonth.current = null;
    }
  }, [startDate]);

  const handleSheetChange = useCallback(
    (index: number) => {
      if (index < 0) return; // 닫힌 상태면 무시

      // 열릴 때마다 최신 initialStartDate 기준으로 다시 계산
      const monthKey =
        normalizeToMonthKey(initialDateRange?.startDate ?? undefined) ??
        pendingScrollMonth.current;
      if (!monthKey) return;

      const trySnap = () => {
        const offset = monthOffsets.current[monthKey];
        if (offset !== undefined) {
          requestAnimationFrame(() => {
            scrollRef.current?.scrollTo({ y: offset, animated: true });
          });
          pendingScrollMonth.current = null;
        } else {
          // 아직 onLayout이 안 끝났을 수 있으니 잠시 후 재시도
          pendingScrollMonth.current = monthKey;
        }
      };

      trySnap();
    },
    [initialDateRange?.startDate],
  );

  const handleConfirm = () => {
    if (startDate && endDate) {
      onConfirm(startDate, endDate);
      bottomSheetRef.current?.dismiss();
    }
  };

  const buttonTitle =
    startDate && endDate
      ? startDate === endDate
        ? `${formatDate(startDate)} 선택하기`
        : `${formatDate(startDate)} - ${formatDate(endDate, true)} 선택하기`
      : "일정을 선택해주세요";

  // 시스템 하단 네비게이션 바 높이를 고려한 전체 snapPoints 높이 조정
  const sheetHeight = 580 + insets.bottom;

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={[sheetHeight]}
      onChange={handleSheetChange}
      backdropComponent={renderBackdrop}
      animationConfigs={animationConfigs}
      backgroundStyle={{ backgroundColor: "white" }}
      handleIndicatorStyle={{
        backgroundColor: "#E6E6E6",
        width: 50,
        height: 5,
      }}
      enablePanDownToClose={true}
      enableDynamicSizing={false}
    >
      {/* 안드로이드 하단 버튼 영역 침범 방지를 위한 paddingBottom 적용 */}
      <View
        className="h-full flex-col "
        style={{ paddingBottom: insets.bottom }}
      >
        {/* 1. 상단 고정 헤더 */}
        <View className="px-5 pt-2 pb-3">
          <Subtitle title="여행 날짜를 선택해주세요." />
          <CustomText font="body3 tight" className="text-text-muted mt-1">
            최대 7일까지 선택할 수 있어요.
          </CustomText>
        </View>

        {/* 2. 중간 달력 수직 스크롤 영역 */}
        <BottomSheetScrollView
          ref={scrollRef}
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
        >
          {uniqueMonths.map((month, index) => (
            <View
              key={month}
              className={index === 0 ? "mt-2" : "mt-8"}
              onLayout={(e) => {
                const y = e.nativeEvent.layout.y;
                monthOffsets.current[month] = y;

                // startDate 유무와 무관하게, pendingScrollMonth만 체크
                if (pendingScrollMonth.current === month) {
                  requestAnimationFrame(() => {
                    scrollRef.current?.scrollTo({ y, animated: false });
                  });
                  pendingScrollMonth.current = null;
                }
              }}
            >
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
                headerStyle={{
                  paddingHorizontal: 0,
                  marginHorizontal: 0,
                  paddingVertical: 0,
                  marginVertical: 0,
                }}
                theme={{
                  backgroundColor: "#FFFFFF",
                  calendarBackground: "#FFFFFF",
                  textSectionTitleColor: "#777777",
                  textDayHeaderFontWeight: "500",
                  textDayHeaderFontSize: 15,
                  stylesheet: {
                    calendar: {
                      main: {
                        paddingLeft: 0,
                        paddingRight: 0,
                        week: {
                          marginTop: 0,
                          marginBottom: 0,
                          flexDirection: "row",
                          justifyContent: "space-around",
                        },
                      },
                      header: {
                        monthText: {
                          height: 0,
                          margin: 0,
                        },
                        week: {
                          marginTop: 8,
                          marginBottom: 8,
                          flexDirection: "row",
                          justifyContent: "space-around",
                          paddingHorizontal: 0,
                          marginHorizontal: 0,
                        },
                      },
                    },
                  },
                }}
                renderHeader={() => <View style={{ height: 0 }} />}
                dayComponent={({ date, state }: any) => {
                  if (!date) return <View style={{ width: CELL_WIDTH }} />;
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
        </BottomSheetScrollView>

        {/* 3. 하단 고정 버튼 바 */}
        <BottomActionBar>
          <CustomButton
            type="primary"
            title={buttonTitle}
            stretch
            size="medium"
            disabled={disabled || !startDate || !endDate}
            onPress={handleConfirm}
          />
        </BottomActionBar>
      </View>
    </BottomSheetModal>
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

  const textColor = isDisabled
    ? "#C9C9C9"
    : isEdge
      ? "#FFFFFF"
      : isWeekend
        ? "#E0483C"
        : "#1A1A1A";
  const CELL_SIZE = 40;
  const CELL_VERTICAL_PADDING = 4; // 기존 week margin(상하 8px)을 셀 높이로 대체
  return (
    <Pressable
      onPress={isDisabled ? undefined : onPress}
      disabled={isDisabled}
      style={{
        width: CELL_WIDTH,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 0,
        paddingHorizontal: 0,
      }}
    >
      <View
        style={{
          width: CELL_WIDTH,
          height: CELL_SIZE + CELL_VERTICAL_PADDING * 2,
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* 구간 연두색 배경 트랙 - 셀 빈틈없이 100% 꽉 차도록 설정 */}
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

        {/* 날짜 동그라미 원 */}
        <View
          style={{
            width: CELL_SIZE,
            height: CELL_SIZE,
            borderRadius: CELL_SIZE / 2,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: isEdge ? "#7E9432" : "transparent",
            zIndex: 1,
          }}
        >
          <CustomText
            font="body2"
            style={{
              fontWeight: "500",
              color: isToday && !isEdge ? "#A3BE3B" : textColor,
            }}
          >
            {date.day}
          </CustomText>
        </View>
        {isToday && !isEdge && (
          <CustomText
            font="body2"
            style={{
              color: "#A3BE3B",
              position: "absolute",
              bottom: -5,
              opacity: isToday ? 1 : 0,
              zIndex: 2,
            }}
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
