import { format } from "date-fns";

export function formatTimeAgo(date: Date, showDay = false): string {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < minute) {
    return "방금 전";
  }

  if (diff < hour) {
    return `${Math.floor(diff / minute)}분 전`;
  }

  if (diff < day) {
    return `${Math.floor(diff / hour)}시간 전`;
  }

  if (showDay) {
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  }

  return `${Math.floor(diff / day)}일 전`;
}

export function formatDate(startDate: Date, endDate: Date): string {
  return startDate === endDate
    ? `${format(startDate, "M/d")}`
    : `${format(startDate, "M/d")}~${format(endDate, "M/d")}`;
}
