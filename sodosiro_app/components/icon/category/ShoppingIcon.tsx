import { AnimatedPath } from "@/components/common/Animated";
import Svg, { ClipPath, Defs, G, Rect } from "react-native-svg";

export default function ShoppingIcon({ animatedProps }: AnimatedIconProps) {
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <Defs>
        <ClipPath id="clip0">
          <Rect width="16" height="16" />
        </ClipPath>
      </Defs>

      <G clipPath="url(#clip0)">
        <AnimatedPath
          d="M5.33659 14.6663C5.70478 14.6663 6.00326 14.3679 6.00326 13.9997C6.00326 13.6315 5.70478 13.333 5.33659 13.333C4.9684 13.333 4.66992 13.6315 4.66992 13.9997C4.66992 14.3679 4.9684 14.6663 5.33659 14.6663Z"
          animatedProps={animatedProps}
          strokeWidth={1.33333}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <AnimatedPath
          d="M12.6667 14.6663C13.0349 14.6663 13.3333 14.3679 13.3333 13.9997C13.3333 13.6315 13.0349 13.333 12.6667 13.333C12.2985 13.333 12 13.6315 12 13.9997C12 14.3679 12.2985 14.6663 12.6667 14.6663Z"
          animatedProps={animatedProps}
          strokeWidth={1.33333}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <AnimatedPath
          d="M1.37109 1.3667H2.70443L4.47776 9.6467C4.54281 9.94994 4.71154 10.221 4.9549 10.4133C5.19826 10.6055 5.50103 10.7069 5.81109 10.7H12.3311C12.6345 10.6995 12.9287 10.5956 13.1651 10.4053C13.4015 10.215 13.5659 9.94972 13.6311 9.65336L14.7311 4.70003H3.41776"
          animatedProps={animatedProps}
          strokeWidth={1.33333}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
}
