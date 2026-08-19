import RotatingArrowIcon from "@/components/common/RotatingArrowIcon";
import { ReactNode } from "react";
import { Pressable, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

type DropdownProps = {
  isExpanded: boolean;
  onToggle?: (() => void) | undefined;
  header: ReactNode;
  children: ReactNode;
  disabled?: boolean;
};

export default function Dropdown({
  isExpanded,
  onToggle,
  header,
  children,
  disabled = false,
}: DropdownProps) {
  return (
    <View className="question_section w-full bg-white">
      <View className="flex-row items-center justify-between min-h-[26px] w-full flex-shrink-0 z-10 bg-white">
        <View className="flex-1 mr-2 min-w-0 overflow-hidden">{header}</View>

        {!disabled ? (
          <Pressable
            onPress={onToggle}
            className={`p-1 flex-shrink-0 ${disabled ? "pointer-events-none" : ""}`}
            hitSlop={8}
          >
            <RotatingArrowIcon isExpanded={isExpanded} />
          </Pressable>
        ) : null}
      </View>

      {isExpanded && (
        <Animated.View
          key="dropdown_animated_content"
          entering={FadeInDown.duration(150)}
          className="w-full bg-white overflow-hidden z-0"
        >
          {children}
        </Animated.View>
      )}
    </View>
  );
}
