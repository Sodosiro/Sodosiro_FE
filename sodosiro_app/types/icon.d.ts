import { AnimatedPath } from "@/components/common/Animated";
import { SvgProps } from "react-native-svg";

declare global {
  interface AnimatedIconProps extends SvgProps {
    animatedProps: AnimatedProps;
  }
}

declare global {
  type AnimatedProps = React.ComponentProps<
    typeof AnimatedPath
  >["animatedProps"];
}
