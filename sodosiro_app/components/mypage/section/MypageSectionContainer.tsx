import CustomText from "@/components/common/CustomText";
import { View } from "react-native";

export default function MypageSectionContainer({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View className={`px-5 gap-3`}>
      <CustomText font="heading2">{title}</CustomText>
      {children}
    </View>
  );
}
