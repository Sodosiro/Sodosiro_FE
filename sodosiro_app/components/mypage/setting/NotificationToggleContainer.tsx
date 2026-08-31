import Toggle from "@/components/common/Toggle";
import { ReactNode } from "react";
import { View } from "react-native";

export default function NotificationToggleContainer({
  toggle,
  onPress,
  children,
  disabled,
}: {
  toggle: boolean;
  onPress: () => void;
  children: ReactNode;
  disabled?: boolean;
}) {
  return (
    <View className="flex-row gap-2 py-3 items-center">
      {children}
      <Toggle toggle={toggle} onPress={onPress} disabled={disabled} />
    </View>
  );
}
