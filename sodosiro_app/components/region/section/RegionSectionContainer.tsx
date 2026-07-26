import { View } from "react-native";
import CustomText from "../../common/CustomText";

export default function RegionSectionContainer({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View className={`gap-3 flex-1`}>
      <CustomText font="heading2">{title}</CustomText>
      {children}
    </View>
  );
}
