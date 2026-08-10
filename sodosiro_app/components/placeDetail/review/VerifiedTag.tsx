import CustomText from "@/components/common/CustomText";
import { tagStyle } from "@/styles/Tag";
import { View } from "react-native";

export default function VerifiedTag() {
  return (
    <View className={`${tagStyle} bg-primary-light`}>
      <CustomText font="body3 tight" className={`text-primary-dark`}>
        인증 리뷰
      </CustomText>
    </View>
  );
}
