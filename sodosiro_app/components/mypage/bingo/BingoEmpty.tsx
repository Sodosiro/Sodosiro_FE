import { LockIcon } from "@/assets/svgs";
import CustomButton from "@/components/common/CustomButton";
import CustomText from "@/components/common/CustomText";
import { View } from "react-native";

export default function BingoEmpty() {
  return (
    <View className={`flex-1 gap-6 justify-center items-center`}>
      <LockIcon />
      <View className={`gap-3 items-center`}>
        <CustomText font="heading2">
          여행 일정이 있어야 빙고가 시작돼요.
        </CustomText>
        <CustomText font="body3" className={`text-text-muted`}>
          여행 일정을 만들어보세요.
        </CustomText>
      </View>
      <View>
        <CustomButton type="primary" size="small" title="새 일정 만들기" />
      </View>
    </View>
  );
}
