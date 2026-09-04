import BottomActionBar from "@/components/common/BottomActionBar";
import CustomButton from "@/components/common/CustomButton";

type TimelineExportFooterProps = {
  onConfirm?: () => void;
  isEditing: boolean;
};

// 타임라인 화면 하단 고정 액션 영역: 카카오맵 내보내기 + 여행 시작하기
export default function TimelineExportFooter({
  onConfirm,
  isEditing,
}: TimelineExportFooterProps) {
  return (
    <BottomActionBar>
      <CustomButton
        type="primary"
        title="이 일정대로 여행하기"
        stretch
        size="medium"
        disabled={isEditing}
        onPress={onConfirm}
      />
    </BottomActionBar>
  );
}
