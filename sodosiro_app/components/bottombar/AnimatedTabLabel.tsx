import useSelectedAnimation from "@/hooks/useSelcetedAnimation";
import { View } from "react-native";
import Animated from "react-native-reanimated";

export default function AnimatedTabLabel({
  focused,
  title,
}: {
  focused: boolean;
  title: string;
}) {
  const { textStyle } = useSelectedAnimation(focused, {
    color: ["#888888", "#1a1a1a"],
  });

  return (
    <View>
      <Animated.Text
        className={`${focused ? `text-body2-tight` : `text-body3-tight`} font-pretendard`}
        style={textStyle}
        numberOfLines={1}
      >
        {title}
      </Animated.Text>
    </View>
  );
}
