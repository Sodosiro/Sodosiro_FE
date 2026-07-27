import AnimatedButton from "@/components/common/AnimatedButton";
import BottomActionFooter from "@/components/common/BottomActionFooter";
import CustomButton from "@/components/common/CustomButton";
import CustomText from "@/components/common/CustomText";
import { Image } from "react-native";

type TimelineExportFooterProps = {
  onPressExport?: () => void;
  onPressStart?: () => void;
};

// 타임라인 화면 하단 고정 액션 영역: 카카오맵 내보내기 + 여행 시작하기
export default function TimelineExportFooter({
  onPressExport,
  onPressStart,
}: TimelineExportFooterProps) {
  return (
    <BottomActionFooter>
      <AnimatedButton
        className="flex-row items-center justify-center px-4 gap-1 rounded-full"
        backgroundColor={["#FFFFFF", "#F5F5F5"]}
        onPress={onPressExport}
      >
        <Image
          source={require("@/assets/images/kakaomap.png")}
          resizeMode="cover"
          style={{ width: 24, height: 24 }}
        />
        <CustomText font="body1" className="ml-1">
          내보내기
        </CustomText>
      </AnimatedButton>

      <CustomButton
        type="primary"
        title="이 일정대로 여행하기"
        stretch
        size="medium"
        onPress={onPressStart}
      />
    </BottomActionFooter>
  );
}
