import { InfoMiniIcon } from "@/assets/svgs";
import { AnimatedPressable } from "@/components/common/Animated";
import CustomText from "@/components/common/CustomText";
import { BADGE_BASE_CLASS } from "@/components/trip/badge/badgeStyles";
import { useEffect, useRef, useState } from "react";
import { Animated, Easing, Pressable, View } from "react-native";

const TOOLTIP_OPEN_DURATION = 220;
const TOOLTIP_CLOSE_DURATION = 160;
const TOOLTIP_SLIDE_DISTANCE = 8; // 내려오는 거리(px)

type EditToggleBadgeProps = {
  isEditing: boolean;
  infoTooltipText?: string;
  onPress: () => void;
};

// 우측 상단 "수정하기" / "확인" 토글 버튼.
// 수정 모드일 때만 정보 아이콘이 나타나고, 누르면 안내 툴팁이 슬라이드다운 됩니다.
export default function EditToggleBadge({
  isEditing,
  infoTooltipText = "일정을 꾹 눌러 끌면 순서를 바꿀 수 있어요.",
  onPress,
}: EditToggleBadgeProps) {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [shouldRenderTooltip, setShouldRenderTooltip] = useState(false);
  const tooltipAnim = useRef(new Animated.Value(0)).current;

  // 수정 모드가 꺼지면(정보 아이콘 자체가 사라지면) 툴팁도 같이 닫음
  useEffect(() => {
    if (!isEditing && tooltipVisible) {
      setTooltipVisible(false);
    }
  }, [isEditing, tooltipVisible]);

  // 툴팁 슬라이드다운 + 페이드 애니메이션
  useEffect(() => {
    if (tooltipVisible) {
      setShouldRenderTooltip(true);
      Animated.timing(tooltipAnim, {
        toValue: 1,
        duration: TOOLTIP_OPEN_DURATION,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(tooltipAnim, {
        toValue: 0,
        duration: TOOLTIP_CLOSE_DURATION,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) setShouldRenderTooltip(false);
      });
    }
  }, [tooltipVisible, tooltipAnim]);

  const tooltipOpacity = tooltipAnim;
  const tooltipTranslateY = tooltipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-TOOLTIP_SLIDE_DISTANCE, 0], // 버튼 쪽에서 아래로 내려오는 느낌
  });
  const tooltipScale = tooltipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.96, 1],
  });

  return (
    <AnimatedPressable className={`bg-white ${BADGE_BASE_CLASS}`} onPress={onPress}>
      <CustomText font="body3 tight" className="text-text-primary">
        {isEditing ? "확인" : "수정하기"}
      </CustomText>

      {isEditing && (
        <Pressable
          hitSlop={8}
          onPress={(e) => {
            e.stopPropagation();
            setTooltipVisible((prev) => !prev);
          }}
        >
          <InfoMiniIcon />
        </Pressable>
      )}

      {shouldRenderTooltip && (
        <Animated.View
          pointerEvents="box-none"
          style={{
            position: "absolute",
            top: 44,
            right: 0,
            zIndex: 30,
            opacity: tooltipOpacity,
            transform: [{ translateY: tooltipTranslateY }, { scale: tooltipScale }],
          }}
        >
          {/* 화살표 */}
          <View
            style={{
              position: "absolute",
              top: -6,
              right: 20,
              width: 12,
              height: 12,
              backgroundColor: "white",
              transform: [{ rotate: "45deg" }],
              shadowColor: "#000",
              shadowOffset: { width: 0, height: -1 },
              shadowOpacity: 0.06,
              shadowRadius: 2,
            }}
          />
          {/* 말풍선 */}
          <View
            className="bg-white rounded-2xl px-4 py-3"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.12,
              shadowRadius: 12,
              elevation: 8,
              width: 270,
            }}
          >
            <CustomText font="body2" className="text-text-primary">
              {infoTooltipText}
            </CustomText>
          </View>
        </Animated.View>
      )}
    </AnimatedPressable>
  );
}
