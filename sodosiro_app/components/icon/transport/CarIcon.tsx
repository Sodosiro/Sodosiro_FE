import { AnimatedPath } from "@/components/common/animated/Animated";
import Svg from "react-native-svg";

export default function CarIcon({ animatedStroke }: AnimatedIconProps) {
  return (
    <Svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <AnimatedPath
        d="M25.3327 22.6668H27.9993C28.7993 22.6668 29.3327 22.1335 29.3327 21.3335V17.3335C29.3327 16.1335 28.3993 15.0668 27.3327 14.8002C24.9327 14.1335 21.3327 13.3335 21.3327 13.3335C21.3327 13.3335 19.5993 11.4668 18.3993 10.2668C17.7327 9.7335 16.9327 9.3335 15.9993 9.3335H6.66602C5.86602 9.3335 5.19935 9.86683 4.79935 10.5335L2.93268 14.4002C2.75612 14.9151 2.66602 15.4558 2.66602 16.0002V21.3335C2.66602 22.1335 3.19935 22.6668 3.99935 22.6668H6.66602"
        animatedProps={animatedStroke}
        strokeWidth={2.66667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <AnimatedPath
        d="M9.33268 25.3333C10.8054 25.3333 11.9993 24.1394 11.9993 22.6667C11.9993 21.1939 10.8054 20 9.33268 20C7.85992 20 6.66602 21.1939 6.66602 22.6667C6.66602 24.1394 7.85992 25.3333 9.33268 25.3333Z"
        animatedProps={animatedStroke}
        strokeWidth={2.66667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <AnimatedPath
        d="M12 22.667H20"
        animatedProps={animatedStroke}
        strokeWidth={2.66667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <AnimatedPath
        d="M22.6667 25.3333C24.1394 25.3333 25.3333 24.1394 25.3333 22.6667C25.3333 21.1939 24.1394 20 22.6667 20C21.1939 20 20 21.1939 20 22.6667C20 24.1394 21.1939 25.3333 22.6667 25.3333Z"
        animatedProps={animatedStroke}
        strokeWidth={2.66667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
