import { DownIcon } from "@/assets/svgs";
import { Pressable } from "react-native";
import Animated from "react-native-reanimated";

export const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
export const AnimatedDownIcon = Animated.createAnimatedComponent(DownIcon);
