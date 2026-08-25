import { ActivityIndicator, Modal, StyleProp, View, ViewStyle } from "react-native";

type DimmedLoadingProps = {
  visible: boolean;
  color?: string;
  size?: "small" | "large";
};

export default function DimmedLoading({
  visible,
  color = "white",
  size = "large",
}: DimmedLoadingProps) {
  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={overlayStyle}>
        <ActivityIndicator size={size} color={color} />
      </View>
    </Modal>
  );
}

const overlayStyle: StyleProp<ViewStyle> = {
  flex: 1,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  justifyContent: "center",
  alignItems: "center",
};
