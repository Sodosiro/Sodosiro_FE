import { RefreshIcon } from "@/assets/svgs"; // 재설정 아이콘 경로 확인 필요
import CustomButton from "@/components/common/CustomButton"; // 경로 확인 필요
import AnimatedButton from "../common/AnimatedButton";
import BottomActionFooter from "../common/BottomActionFooter";
import CustomText from "../common/CustomText";

type Props = {
  onReset: () => void;
  onSubmit: () => void;
  disabled?: boolean;
};

export default function TripConditionFooter({ onReset, onSubmit, disabled = false }: Props) {
  return (
    <BottomActionFooter>
      <AnimatedButton
        className={`flex-row items-center justify-center px-4 gap-1 rounded-full`}
        backgroundColor={["#FFFFFF", "#F5F5F5"]}
      >
        <RefreshIcon width={16} />
        <CustomText font="body1">재설정</CustomText>
      </AnimatedButton>
      <CustomButton
        type="primary"
        title="일정 짜기"
        stretch
        size="medium"
        disabled={disabled}
        onPress={onSubmit}
      />
    </BottomActionFooter>
  );
}
