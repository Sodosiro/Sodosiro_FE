import AnimatedButton from "@/components/common/animated/AnimatedButton";
import BottomActionBar from "@/components/common/BottomActionBar";
import CustomButton from "@/components/common/CustomButton";
import CustomText from "@/components/common/CustomText";
import { Image } from "react-native";

type TimelineExportFooterProps = {
  onPressExport?: () => void;
  onConfirm?: () => void;
  isEditing: boolean;
};

// 타임라인 화면 하단 고정 액션 영역: 카카오맵 내보내기 + 여행 시작하기
export default function TimelineExportFooter({
  onPressExport,
  onConfirm,
  isEditing,
}: TimelineExportFooterProps) {
  return (
    <BottomActionBar>
      <AnimatedButton
        className="flex-row items-center justify-center px-4 gap-1 rounded-full"
        backgroundColor={["#FFFFFF", "#F5F5F5"]}
        onPress={onPressExport}
        disabled={isEditing}
      >
        <Image
          source={require("@/assets/images/kakaomap.png")}
          resizeMode="cover"
          style={{ width: 24, height: 24 }}
        />
        <CustomText font="body1" className={`ml-1 ${isEditing ? "text-text-muted" : ""}`}>
          내보내기
        </CustomText>
      </AnimatedButton>

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
