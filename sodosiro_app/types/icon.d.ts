import { AnimatedCircle, AnimatedPath } from "@/components/common/Animated";
import { SvgProps } from "react-native-svg";

declare global {
  interface AnimatedIconProps extends SvgProps {
    animatedStroke?: AnimatedStroke;
    animatedFill?: AnimatedFill;
  }
}

declare global {
  type AnimatedStroke = React.ComponentProps<
    typeof AnimatedPath
  >["animatedProps"];
}

declare global {
  type AnimatedFill = React.ComponentProps<
    typeof AnimatedCircle | AnimatedPath
  >["animatedProps"];
}
