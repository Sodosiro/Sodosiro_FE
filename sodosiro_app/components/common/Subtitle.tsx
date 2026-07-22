import { View } from "react-native";
import CustomText from "./CustomText";

type Props = {
  title: string;
  description?: string;
};

export default function Subtitle({ title, description }: Props) {
  return (
    <View className="flex-row items-baseline gap-2">
      <CustomText font="heading2" className={`text-text-primary`}>
        {title}
      </CustomText>
      {description && (
        <CustomText font="body2" className={`text-text-muted`}>
          {description}
        </CustomText>
      )}
    </View>
  );
}
