import CustomText from "@/components/common/CustomText";
import { tagStyle } from "@/styles/Tag";
import { View } from "react-native";

export default function VerifiedTag({ text }: { text: string }) {
  return (
    <View className={`${tagStyle} bg-primary-light`}>
      <CustomText font="body3 tight" className={`text-primary-dark`}>
        {text}
      </CustomText>
    </View>
  );
}
