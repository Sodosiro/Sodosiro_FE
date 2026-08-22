import CustomText from "@/components/common/CustomText";

export default function NotificationDay({ date }: { date: Date }) {
  const today = new Date();

  const target = new Date(date);

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  let text: string;

  if (isSameDay(target, today)) {
    text = "오늘";
  } else if (isSameDay(target, yesterday)) {
    text = "어제";
  } else {
    text = `${target.getMonth() + 1}월 ${target.getDate()}일`;
  }

  return (
    <CustomText font="body2" className={`text-text-muted pt-5`}>
      {text}
    </CustomText>
  );
}
