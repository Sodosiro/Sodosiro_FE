import { DownIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import RateChip from "@/components/place/RateChip";
import Tag from "@/components/place/Tag";
import { useState } from "react";
import { Pressable, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const ANIMATION_DURATION = 300;

export default function PlaceInfo({
  category,
  title,
  rankTag,
  overview,
  avgRating,
  reviewCount,
}: {
  category: CategoryType;
  title: string;
  rankTag: string;
  overview: string;
  avgRating: number;
  reviewCount: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLimited, setIsLimited] = useState(true);
  const [isOverflow, setIsOverflow] = useState(false);

  const collapsedHeight = useSharedValue(0);
  const expandedHeight = useSharedValue(0);
  const animatedHeight = useSharedValue(0);

  const containerStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: withTiming(isExpanded ? "-180deg" : "0deg", {
          duration: ANIMATION_DURATION,
        }),
      },
    ],
  }));

  const handleToggle = () => {
    if (isExpanded) {
      setIsExpanded(false);

      animatedHeight.value = withTiming(collapsedHeight.value, {
        duration: ANIMATION_DURATION,
      });

      setTimeout(() => {
        setIsLimited(true);
      }, ANIMATION_DURATION);
    } else {
      setIsLimited(false);
      setIsExpanded(true);

      animatedHeight.value = withTiming(expandedHeight.value, {
        duration: ANIMATION_DURATION,
      });
    }
  };

  return (
    <View className="px-5 py-4 gap-1">
      <View className="flex-row gap-1">
        <Tag category={category} />
        {rankTag && <Tag rankTag={rankTag} />}
      </View>

      <CustomText font="heading1">{title}</CustomText>

      <View className="gap-2 items-start">
        <View className="w-full">
          <View className="absolute opacity-0" pointerEvents="none">
            <CustomText
              font="body3"
              className="text-text-muted pr-6"
              onTextLayout={(event) => {
                const lines = event.nativeEvent.lines;

                if (lines.length === 0) return;

                const lineHeight = lines[0].height;

                const expanded = lines.length * lineHeight;
                const collapsed = Math.min(lines.length, 3) * lineHeight;

                expandedHeight.value = expanded;
                collapsedHeight.value = collapsed;

                if (animatedHeight.value === 0) {
                  animatedHeight.value = collapsed;
                }

                setIsOverflow(lines.length > 3);
              }}
            >
              {overview}
            </CustomText>
          </View>

          {/* 실제 텍스트 */}
          <Animated.View className="overflow-hidden" style={containerStyle}>
            <CustomText
              font="body3"
              className="text-text-muted pr-6"
              numberOfLines={isLimited ? 3 : undefined}
            >
              {overview}
            </CustomText>
          </Animated.View>

          {/* 3줄 초과일 때만 버튼 */}
          {isOverflow && (
            <Pressable
              className="absolute right-0 top-0"
              hitSlop={8}
              onPress={handleToggle}
            >
              <Animated.View style={iconStyle}>
                <DownIcon width={16} />
              </Animated.View>
            </Pressable>
          )}
        </View>

        <RateChip rate={avgRating} reviewCount={reviewCount} />
      </View>
    </View>
  );
}
