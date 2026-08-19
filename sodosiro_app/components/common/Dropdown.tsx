import RotatingArrowIcon from "@/components/common/RotatingArrowIcon";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Animated, LayoutChangeEvent, Pressable, View } from "react-native";

const EXPAND_DURATION_MS = 250;

type DropdownProps = {
  isExpanded: boolean;
  onToggle?: (() => void) | undefined;
  /** 접었을 때도 항상 보이는 헤더 영역 (화살표 아이콘은 자동으로 오른쪽에 붙습니다) */
  header: ReactNode;
  /** 펼쳤을 때만 보이는 본문 영역 */
  children: ReactNode;
  disabled?: boolean;
};

// 헤더를 누르면 본문이 펼쳐지고 화살표가 회전하는 범용 드롭다운(아코디언) 컴포넌트
export default function Dropdown({
  isExpanded,
  onToggle,
  header,
  children,
  disabled = false,
}: DropdownProps) {
  const [contentHeight, setContentHeight] = useState(0);
  const animatedController = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedController, {
      toValue: isExpanded ? 1 : 0,
      duration: EXPAND_DURATION_MS,
      useNativeDriver: false, // height 애니메이션을 위해 false 설정
    }).start();
  }, [isExpanded, animatedController]);

  const bodyHeight = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight],
  });

  const bodyOpacity = animatedController.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1],
  });

  const handleLayout = (e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;
    if (height > 0 && contentHeight === 0) {
      setContentHeight(height);
    }
  };

  return (
    <View>
      <View className={`flex-row items-center flex-1`}>
        {header}
        {!disabled ? (
          <Pressable onPress={onToggle} className={`${disabled && `pointer-events-none`}`}>
            <RotatingArrowIcon isExpanded={isExpanded} />
          </Pressable>
        ) : undefined}
      </View>

      <Animated.View style={{ height: bodyHeight, overflow: "hidden" }}>
        <Animated.View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            opacity: bodyOpacity,
          }}
          onLayout={handleLayout}
        >
          {children}
        </Animated.View>
      </Animated.View>
    </View>
  );
}
