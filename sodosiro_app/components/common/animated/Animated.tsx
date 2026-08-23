import { DownIcon } from "@/assets/svgs";
import { Pressable } from "react-native";
import Animated from "react-native-reanimated";
import { Circle, G, Path } from "react-native-svg";

export const AnimatedView = Animated.View;
export const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
export const AnimatedDownIcon = Animated.createAnimatedComponent(DownIcon);
export const AnimatedPath = Animated.createAnimatedComponent(Path);
export const AnimatedG = Animated.createAnimatedComponent(G);
export const AnimatedCircle = Animated.createAnimatedComponent(Circle);
