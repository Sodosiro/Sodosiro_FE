import { XMiniIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import { BADGE_BASE_CLASS } from "@/components/trip/badge/badgeStyles";
import { useEffect, useRef, useState } from "react";
import { Animated, Easing, LayoutChangeEvent, Pressable } from "react-native";

const PADDING_RIGHT_DEFAULT = 16; // px-4
const PADDING_RIGHT_REMOVABLE = 12; // pr-3
const ICON_SIZE = 16;
const TRANSITION_DURATION = 260;

type DayBadgeProps = {
  text: string;
  selected?: boolean;
  disabled?: boolean;
  removable?: boolean;
  onPress: () => void;
  onLongPress?: () => void; // 롱터치 이벤트 추가
  onDelete?: () => void;
  onLayout: (e: LayoutChangeEvent) => void;
};

// 상단 "N일차" 탭 뱃지
export default function DayBadge({
  text,
  selected = false,
  disabled = false,
  removable = false,
  onPress,
  onLongPress,
  onDelete,
  onLayout,
}: DayBadgeProps) {
  const [shouldRenderDelete, setShouldRenderDelete] = useState(removable);
  const expandAnim = useRef(new Animated.Value(removable ? 1 : 0)).current;

  // X아이콘 펼침 애니메이션
  useEffect(() => {
    if (removable) {
      setShouldRenderDelete(true);
    }

    Animated.timing(expandAnim, {
      toValue: removable ? 1 : 0,
      duration: TRANSITION_DURATION,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished && !removable) {
        setShouldRenderDelete(false);
      }
    });
  }, [removable, expandAnim]);

  const paddingRight = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [PADDING_RIGHT_DEFAULT, PADDING_RIGHT_REMOVABLE],
  });

  const iconWidth = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, ICON_SIZE],
  });

  return (
    // 뱃지 외곽 형태 및 레이아웃 유지 (기존 BADGE_BASE_CLASS 완벽 유지)
    <Animated.View
      className={`${selected ? "bg-text-primary" : disabled ? "bg-btn-disabled" : "bg-bg-muted"} ${BADGE_BASE_CLASS}`}
      style={{ paddingRight }}
      onLayout={onLayout}
    >
      {/* 텍스트 영역: 부모의 높이와 정렬을 그대로 채우도록 설정 */}
      <Pressable
        disabled={disabled}
        onPress={onPress}
        onLongPress={onLongPress}
        delayLongPress={100}
        className="flex-row items-center h-full"
      >
        <CustomText
          font="body3 tight"
          className={selected ? "text-white" : disabled ? "text-text-muted" : "text-text-primary"}
        >
          {text}
        </CustomText>
      </Pressable>

      {/* X 버튼 영역 */}
      {shouldRenderDelete && (
        <Animated.View
          className="justify-center items-center h-full"
          style={{ width: iconWidth, opacity: expandAnim, overflow: "hidden" }}
        >
          <Pressable
            disabled={disabled}
            hitSlop={{ top: 8, bottom: 8, left: 4, right: 8 }}
            onPress={onDelete}
            className="items-center justify-center h-full pl-1"
          >
            <XMiniIcon />
          </Pressable>
        </Animated.View>
      )}
    </Animated.View>
  );
}
