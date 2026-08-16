import { DownIcon } from "@/assets/svgs";
import { Pressable } from "react-native";
import Animated from "react-native-reanimated";
import { Circle, Path } from "react-native-svg";

export const AnimatedView = Animated.View;
export const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
export const AnimatedDownIcon = Animated.createAnimatedComponent(DownIcon);
export const AnimatedPath = Animated.createAnimatedComponent(Path);
export const AnimatedCircle = Animated.createAnimatedComponent(Circle);
