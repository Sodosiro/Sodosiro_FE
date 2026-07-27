import { DownIcon } from "@/assets/svgs";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";

const ROTATE_DURATION_MS = 250;

type RotatingArrowIconProps = {
  isExpanded: boolean;
};

// 펼침/접힘 상태에 따라 180도 회전하는 화살표 아이콘
export default function RotatingArrowIcon({ isExpanded }: RotatingArrowIconProps) {
  const rotateAnim = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: ROTATE_DURATION_MS,
      useNativeDriver: true,
    }).start();
  }, [isExpanded, rotateAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <Animated.View style={{ transform: [{ rotate: spin }] }}>
      <DownIcon />
    </Animated.View>
  );
}
