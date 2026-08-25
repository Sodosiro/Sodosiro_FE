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

/**
 * D-Day 계산 함수
 */
export function calculateDDay(startDateStr: string): number {
  if (!startDateStr) return 0;
  const [sYear, sMonth, sDay] = startDateStr.split("-").map(Number);
  const today = new Date();

  const start = new Date(sYear, sMonth - 1, sDay);
  const current = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const diffTime = start.getTime() - current.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * 박/일 계산 함수
 * @param startDateStr - 예: "2026-09-03"
 * @param endDateStr - 예: "2026-09-04"
 * @returns 예: "1박 2일" or "당일치기"
 */
export function formatNightsAndDays(startDateStr: string, endDateStr: string): string {
  if (!startDateStr || !endDateStr) return "";
  const [sYear, sMonth, sDay] = startDateStr.split("-").map(Number);
  const [eYear, eMonth, eDay] = endDateStr.split("-").map(Number);

  const start = new Date(sYear, sMonth - 1, sDay);
  const end = new Date(eYear, eMonth - 1, eDay);

  const diffDays = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) {
    return "당일치기";
  }

  const nights = diffDays;
  const days = diffDays + 1;
  return `${nights}박 ${days}일`;
}
