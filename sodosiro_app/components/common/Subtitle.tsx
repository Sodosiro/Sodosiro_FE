import { Text, View } from "react-native";

type Props = {
  title: string;
  description?: string;
};

export default function Subtitle({ title, description }: Props) {
  return (
    <View className="flex-row items-baseline gap-2">
      <Text className="text-[18px] font-bold text-[#1A1A1A]">{title}</Text>

      {description && <Text className="text-[14px] font-medium text-[#888888]">{description}</Text>}
    </View>
  );
}
