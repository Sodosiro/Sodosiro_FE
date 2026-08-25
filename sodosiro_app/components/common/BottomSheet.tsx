import { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Modal, Pressable, ScrollView, View } from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const SHEET_HEIGHT = SCREEN_HEIGHT * 0.8; // 화면 높이의 80% 고정

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  minHeight?: number;
};

export default function BottomSheet({ visible, onClose, children, minHeight }: Props) {
  const [modalVisible, setModalVisible] = useState(visible);
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      Animated.timing(translateY, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 250,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) setModalVisible(false);
      });
    }
  }, [visible]);

  // 바텀시트 올라올 때 배경도 함께 0 -> 0.5 opacity로 자연스럽게 페이드인
  const backdropOpacity = translateY.interpolate({
    inputRange: [0, SHEET_HEIGHT],
    outputRange: [0.5, 0], // 0.5는 검은색 50% 투명도 (취향에 따라 0.4 ~ 0.6으로 조절 가능)
    extrapolate: "clamp",
  });

  if (!modalVisible) return null;

  return (
    <Modal transparent visible={modalVisible} animationType="none" onRequestClose={onClose}>
      <View className="flex-1 justify-end">
        {/* Animated Background Dimm Overlay */}
        <AnimatedPressable
          style={{
            opacity: backdropOpacity,
          }}
          className="absolute inset-0 bg-black"
          onPress={onClose}
        />

        {/* 바텀시트 컨테이너 */}
        <Animated.View
          style={{
            maxHeight: SHEET_HEIGHT,
            minHeight: minHeight,
            transform: [{ translateY }],
          }}
          className="w-full rounded-t-[28px] bg-white flex-col"
        >
          {/* Handle bar */}
          <View className="mt-3 mb-2 items-center py-1">
            <View className="h-1 w-12 rounded-full bg-[#D9D9D9]" />
          </View>

          {/* 자식 요소 (Scrollable 영역) */}
          <ScrollView
            contentContainerStyle={{ paddingBottom: 24 }}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}
