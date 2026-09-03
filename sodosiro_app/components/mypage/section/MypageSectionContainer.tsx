import CustomText from "@/components/common/CustomText";
import { Pressable, View } from "react-native";

export default function MypageSectionContainer({
  title,
  children,
  rightIcon,
  onPress,
}: {
  title: string;
  children: React.ReactNode;
  rightIcon?: React.ReactNode;
  onPress?: () => void;
}) {
  return (
    <View className={`px-5 gap-3`}>
      <Pressable className={`flex-row`} onPress={onPress}>
        <CustomText font="heading2" className={`flex-1`}>
          {title}
        </CustomText>
        {rightIcon && rightIcon}
      </Pressable>
      {children}
    </View>
  );
}
