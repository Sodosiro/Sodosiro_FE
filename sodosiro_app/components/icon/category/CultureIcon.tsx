import { AnimatedPath } from "@/components/common/Animated";
import Svg from "react-native-svg";

export default function CultureIcon({ animatedProps }: AnimatedIconProps) {
  return (
    <Svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <AnimatedPath
        d="M7.45508 2.1001L9.28595 4.49842"
        animatedProps={animatedProps}
        strokeWidth={1.33}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <AnimatedPath
        d="M12.2467 3.63743L1.81917 6.66868L1.27354 5.21368C1.09167 4.5468 1.45542 3.87993 2.06167 3.69805L10.246 1.27305C10.9129 1.09118 11.5798 1.45493 11.7617 2.06118L12.2467 3.63743Z"
        animatedProps={animatedProps}
        strokeWidth={1.33}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <AnimatedPath
        d="M1.81836 6.66895H12.7309V11.5189C12.7309 11.8405 12.6031 12.1489 12.3757 12.3763C12.1483 12.6037 11.8399 12.7314 11.5184 12.7314H3.03086C2.70928 12.7314 2.40088 12.6037 2.17349 12.3763C1.9461 12.1489 1.81836 11.8405 1.81836 11.5189V6.66895Z"
        animatedProps={animatedProps}
        strokeWidth={1.33}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <AnimatedPath
        d="M3.74805 3.19824L5.62742 5.56201"
        animatedProps={animatedProps}
        strokeWidth={1.33}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
