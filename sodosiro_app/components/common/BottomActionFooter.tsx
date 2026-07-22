import { ReactNode } from "react";
import { View } from "react-native";

type Props = {
  children: ReactNode;
};

export default function BottomActionFooter({ children }: Props) {
  return (
    <View className="px-5 py-3 bg-white border-t-[0.5] border-border">
      <View className="flex-row gap-2">{children}</View>
    </View>
  );
}
