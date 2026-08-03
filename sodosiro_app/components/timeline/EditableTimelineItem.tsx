import CustomText from "@/components/common/CustomText";
import { CategoryMap } from "@/util/place/category";
import { useEffect, useRef } from "react";
import { Animated, Easing, Pressable, View } from "react-native";

const MOUNT_ANIM_DURATION = 220;

type EditableTimelineItemProps = {
  place: PlaceType;
  isLast: boolean;
  onLongPress?: () => void;
  order: number;
  isActive?: boolean;
};

// 일정 하나(장소)를 나타내는 항목. 헤더(순서/제목/카테고리)는 항상 보이고,
// 본문(설명/평점/액션 버튼)은 Dropdown을 통해 펼침/접힘 됩니다.
export default function EditableTimelineItem({
  place,
  isLast,
  onLongPress,
  order,
  isActive = false,
}: EditableTimelineItemProps) {
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
      className={`px-4 py-3 ${isLast ? "" : "border-b border-[#EDEDED]"}`}
      style={{
        opacity: Animated.multiply(mountAnim, isActive ? 0.85 : 1),
        transform: [
          { scale: mountAnim.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1] }) },
        ],
      }}
    >
      <Pressable onLongPress={onLongPress} className="flex-row items-center">
        <View className="w-6 h-6 rounded-xl bg-[#1A1A1A] items-center justify-center mr-2.5">
          <CustomText font="body3" className="text-white">
            {order}
          </CustomText>
        </View>

        <CustomText font="body1" numberOfLines={1} className="flex-shrink">
          {place.title}
        </CustomText>

        <View className="ml-1.5 px-1.5 py-1.5 rounded-md bg-bg-subtle">
          <CustomText font="body2 tight">{CategoryMap[place.category]}</CustomText>
        </View>
        <View className="flex-1" />
      </Pressable>
    </Animated.View>
  );
}
