import { InfoMiniIcon, WhiteBigCheckIcon, XIcon } from "@/assets/svgs";
import { useEffect, useRef, useState } from "react";
import { Animated, Easing, LayoutChangeEvent, Pressable, View } from "react-native";
import CustomText from "../common/CustomText";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const PADDING_RIGHT_DEFAULT = 16; // px-4
const PADDING_RIGHT_REMOVABLE = 12; // pr-3
const ICON_SIZE = 24; // XIcon 실제 크기에 맞춰 조정
const TRANSITION_DURATION = 260;

const TOOLTIP_OPEN_DURATION = 220;
const TOOLTIP_CLOSE_DURATION = 160;
const TOOLTIP_SLIDE_DISTANCE = 8; // 내려오는 거리(px)

type Props = {
  disabled?: boolean;
  selected?: boolean;
  bgWhite?: boolean;
  removable?: boolean;
  isEditButton?: boolean;
  isEditing?: boolean;
  isAuthCompleted?: boolean;
  isOngoing?: boolean;
  infoTooltipText?: string;
  text: string;
  onPress: () => void;
  onDelete?: () => void;
  onLayout: (e: LayoutChangeEvent) => void;
};

export default function Badge({
  disabled = false,
  selected = false,
  bgWhite = false,
  removable = false,
  isEditButton = false,
  isEditing = false,
  isAuthCompleted = false,
  isOngoing = false,
  infoTooltipText = "일정을 꾹 눌러 끌면 순서를 바꿀 수 있어요.",
  text,
  onPress,
  onDelete,
  onLayout,
}: Props) {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [shouldRenderTooltip, setShouldRenderTooltip] = useState(false);
  const [shouldRenderDelete, setShouldRenderDelete] = useState(removable);

  const expandAnim = useRef(new Animated.Value(removable ? 1 : 0)).current;
  const tooltipAnim = useRef(new Animated.Value(0)).current;

  const showInfoIcon = isEditing && isEditButton;

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

  // 정보 아이콘 자체가 사라지는 상황(수정모드 종료 등)이면 툴팁도 같이 닫음
  useEffect(() => {
    if (!showInfoIcon && tooltipVisible) {
      setTooltipVisible(false);
    }
  }, [showInfoIcon, tooltipVisible]);

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

  const paddingRight = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [PADDING_RIGHT_DEFAULT, PADDING_RIGHT_REMOVABLE],
  });

  const iconWidth = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, ICON_SIZE],
  });

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
    <AnimatedPressable
      className={`${isOngoing ? `bg-[#c4d96a]` : selected ? `bg-[#1A1A1A]` : disabled ? `bg-btn-disabled` : bgWhite || isEditButton ? `bg-white` : `bg-bg-muted`} flex-row items-center self-start pl-4 py-1.5 h-9 gap-1 rounded-full border border-border`}
      style={{ paddingRight }}
      disabled={disabled}
      onPress={onPress}
      onLayout={onLayout}
    >
      {isAuthCompleted && <WhiteBigCheckIcon />}
      <CustomText
        font="body3 tight"
        className={`${isOngoing ? `text-text-primary` : selected ? `text-white` : disabled ? `text-text-muted` : `text-text-primary`}`}
      >
        {text}
      </CustomText>

      {shouldRenderDelete && (
        <Animated.View
          style={{
            width: iconWidth,
            opacity: expandAnim,
            overflow: "hidden",
          }}
        >
          <Pressable
            hitSlop={8}
            onPress={(e) => {
              e.stopPropagation();
              onDelete?.();
            }}
          >
            <XIcon />
          </Pressable>
        </Animated.View>
      )}

      {showInfoIcon && (
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
