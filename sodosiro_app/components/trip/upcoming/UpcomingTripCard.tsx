import { CourseSummaryItem } from "@/api/course";
import { CalendarMiniIcon, PinMiniIcon, TrashIcon } from "@/assets/svgs";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import CustomText from "@/components/common/CustomText";
import { SODOSI_LIST } from "@/constants/Sodosi";
import { useDeleteCourseMutation } from "@/hooks/mutation/course";
import { calculateDDay, formatNightsAndDays } from "@/util/date/date";
import { memo, useState } from "react";
import { Pressable, View } from "react-native";
import ActionBadge from "../badge/ActionBadge";

type UpcomingTripCardProps = {
  course: CourseSummaryItem;
  onPress: () => void;
  onDeleteSuccess?: () => void; // 삭제 성공 후 부모 컴포넌트에 알릴 콜백 (선택)
};

function UpcomingTripCard({
  course,
  onPress,
  onDeleteSuccess,
}: UpcomingTripCardProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { mutateAsync: deleteCourse } = useDeleteCourseMutation();

  const SODOSI = SODOSI_LIST.find(
    (sodosi) => String(sodosi.sigunguCode) == course.sigunguCode,
  );

  const dDay = calculateDDay(course?.startDate);
  const nightDayText = formatNightsAndDays(course?.startDate, course?.endDate);

  // 삭제 모달 열기
  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  // 삭제 진행 (Confirm 버튼)
  const handleDeleteConfirm = async () => {
    try {
      await deleteCourse(course.courseId);
      setIsDeleteModalOpen(false);
      onDeleteSuccess?.();
    } catch (error) {
      console.error("코스 삭제 실패:", error);
    }
  };

  return (
    <>
      <View className="rounded-2xl border border-[#E5E5E5] bg-white px-5 py-4 mb-5">
        <View className="flex-row justify-between">
          <View className="flex-row gap-2 items-center">
            {/* D-Day Badge */}
            <View className="flex-row items-center self-start px-3.5 py-1.5 min-h-9 rounded-full bg-primary">
              <CustomText font="body3 tight">
                {dDay === 0
                  ? "D-Day"
                  : dDay > 0
                    ? `D-${dDay}`
                    : `D+${Math.abs(dDay)}`}
              </CustomText>
            </View>
            {/* 임시저장된 코스 */}
            {!course.isConfirmed && (
              <View className="flex-row items-center px-1 py-1 min-h-7 rounded bg-[#F5F5F5]">
                <CustomText font="body3 tight">임시저장된 코스</CustomText>
              </View>
            )}
          </View>
          {/* 삭제하기 버튼 */}
          <Pressable onPress={handleOpenDeleteModal} hitSlop={8}>
            <TrashIcon color={"#888888"} />
          </Pressable>
        </View>

        {/* 제목 */}
        <View className="flex-row items-center mt-2 gap-1">
          <CustomText font="title">{course.title}</CustomText>
          <View className="flex-row items-center px-1.5 py-1.5 min-h-7 rounded bg-[#F5F5F5]">
            <CustomText font="body3 tight">{SODOSI?.name}</CustomText>
          </View>
        </View>

        {/* 날짜 */}
        <View className="flex-row items-center mt-2">
          <CalendarMiniIcon color={"#1A1A1A"} />

          <CustomText font="body2" className="ml-2">
            {course.startDate} · {nightDayText}
          </CustomText>
        </View>

        {/* 장소 */}
        <View className="flex-row items-center mt-2">
          <PinMiniIcon color={"#444444"} />

          <CustomText font="body2" className="ml-2">
            {course.displayName}
          </CustomText>
        </View>

        {/* Divider */}
        <View className="h-px bg-[#E5E5E5] my-3" />

        {/* Button */}
        <View className="flex-row">
          <ActionBadge
            text={course.isConfirmed ? "여행 보기" : "이어서 만들기"}
            onPress={onPress}
            onLayout={() => {}}
          />
        </View>
      </View>

      {/* 삭제 확인 모달 */}
      <ConfirmDialog
        visible={isDeleteModalOpen}
        title="이 일정을 삭제할까요?"
        cancelText="취소"
        confirmText="삭제하기"
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}

export default memo(UpcomingTripCard);
