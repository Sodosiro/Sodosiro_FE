import { useEffect, useRef } from "react";
import { Animated, Dimensions, Modal, Pressable, View } from "react-native";

const { height } = Dimensions.get("window");

type Props = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function BottomSheet({ visible, onClose, children }: Props) {
  const translateY = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: visible ? 0 : height,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  return (
    <Modal transparent visible={visible} animationType="none">
      <View className="flex-1 justify-end">
        <Pressable className="absolute inset-0 bg-black/40" onPress={onClose} />

        <Animated.View
          style={{
            transform: [{ translateY }],
          }}
          className="rounded-t-[28px] bg-white"
        >
          {/* Handle */}
          <View className="mt-2 mb-4 items-center">
            <View className="h-1 w-12 rounded-full bg-[#D9D9D9]" />
          </View>

          {children}
        </Animated.View>
      </View>
    </Modal>
  );
}
