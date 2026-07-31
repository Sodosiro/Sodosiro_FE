import { View } from "react-native";
import CustomText from "../common/CustomText";

type Props = {
  icon: React.ReactNode;
  text: string;
};

export default function InfoChip({ icon, text }: Props) {
  return (
    <View className={`flex-row gap-1 items-center`}>
      {icon}
      <CustomText font="body2 tight" className={`text-text-muted`}>
        {text}
      </CustomText>
    </View>
  );
}
