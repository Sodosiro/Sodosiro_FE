import { InfoMiniIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import { ReactNode, useEffect, useRef } from "react";
import { Animated } from "react-native";

type ToastProps = {
  visible: boolean;
  message: string;
  icon?: ReactNode;
  bottomOffset?: number;
};

const FADE_DURATION_MS = 200;

export default function Toast({
  visible,
  message,
  icon = <InfoMiniIcon />,
  bottomOffset = 90,
}: ToastProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: visible ? 1 : 0,
        duration: FADE_DURATION_MS,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: visible ? 0 : 8,
        duration: FADE_DURATION_MS,
        useNativeDriver: true,
      }),
    ]).start();
  }, [visible, opacity, translateY]);

  return (
    <Animated.View
      pointerEvents="none"
      style={{
        position: "absolute",
        left: 16,
        right: 16,
        bottom: bottomOffset + 10,
        opacity,
        transform: [{ translateY }],
        backgroundColor: "rgba(26, 26, 26, 0.92)",
      }}
      className="flex-row items-center gap-2 rounded-2xl px-4 py-3.5"
    >
      {icon}
      <CustomText font="body2" className="text-white flex-shrink">
        {message}
      </CustomText>
    </Animated.View>
  );
}
