// @/utils/date.ts
import { CourseDayItem } from "@/api/course";
import { DAY_OF_WEEKNAMES } from "@/constants/Trip";

/**
 * YYYY-MM-DD 날짜 문자열을 'M/D(요일)' 형태로 변환
 * @param dateString - 예: "2026-09-03"
 * @returns 예: "9/3(목)"
 */
export function formatDateWithDay(dateString: string): string {
  if (!dateString) return "";

  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const dayOfWeek = DAY_OF_WEEKNAMES[date.getDay()];

  return `${month}/${day}(${dayOfWeek})`;
}

/**
 * CourseDayItem 배열을 받아 전체 여행 기간 날짜 텍스트 반환
 * - 1개: "9/3(목)"
 * - 여러 개: "9/3(목) ~ 9/5(토)"
 */
export function formatCoursePeriod(days: CourseDayItem[]): string {
  if (!days || days.length === 0) return "";

  const firstDate = formatDateWithDay(days[0].date);

  // 일차가 1개인 경우 단일 날짜만 반환
  if (days.length === 1) {
    return firstDate;
  }

  // 여러 개일 경우 첫 날과 마지막 날을 조합하여 반환
  const lastDate = formatDateWithDay(days[days.length - 1].date);
  return `${firstDate} ~ ${lastDate}`;
}
