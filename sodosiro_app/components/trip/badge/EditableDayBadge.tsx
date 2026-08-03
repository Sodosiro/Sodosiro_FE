import { XMiniIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import { BADGE_BASE_CLASS } from "@/components/trip/badge/badgeStyles";
import { useEffect, useRef } from "react";
import { Animated, Easing, Pressable } from "react-native";

const MOUNT_ANIM_DURATION = 220;

type EditableDayBadgeProps = {
  text: string;
  isActive?: boolean; // 현재 드래그 중인 아이템인지
  onLongPress?: () => void; // 드래그 시작 트리거
  onDelete?: () => void;
};

// 수정 모드 전용 "N일차" 뱃지 - 삭제(X)와 드래그 정렬만 담당.
// 폭은 항상 고정이며, 등장 시 opacity/scale만 애니메이션 (레이아웃에 영향 없음 -> 드래그 안정성 확보)
export default function EditableDayBadge({
  text,
  isActive = false,
  onLongPress,
  onDelete,
}: EditableDayBadgeProps) {
  const mountAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(mountAnim, {
      toValue: 1,
      duration: MOUNT_ANIM_DURATION,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [mountAnim]);

  return (
    <Animated.View
      className={`bg-bg-muted ${BADGE_BASE_CLASS} pr-3`}
      style={{
        opacity: Animated.multiply(mountAnim, isActive ? 0.85 : 1),
        transform: [
          { scale: mountAnim.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1] }) },
        ],
      }}
    >
      <Pressable
        onLongPress={onLongPress}
        delayLongPress={100}
        className="flex-row items-center h-full"
      >
        <CustomText font="body3 tight" className="text-text-primary">
          {text}
        </CustomText>
      </Pressable>

      <Pressable
        hitSlop={{ top: 8, bottom: 8, left: 4, right: 8 }}
        onPress={onDelete}
        className="items-center justify-center h-full pl-1"
      >
        <XMiniIcon />
      </Pressable>
    </Animated.View>
  );
}
