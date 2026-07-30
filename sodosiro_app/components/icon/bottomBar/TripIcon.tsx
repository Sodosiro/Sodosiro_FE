import { AnimatedPath } from "@/components/common/Animated";
import Svg from "react-native-svg";

export default function TripIcon({ animatedProps }: AnimatedIconProps) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <AnimatedPath
        d="M6 8.50049C7.38071 8.50049 8.5 7.3812 8.5 6.00049C8.5 4.61978 7.38071 3.50049 6 3.50049C4.61929 3.50049 3.5 4.61978 3.5 6.00049C3.5 7.3812 4.61929 8.50049 6 8.50049Z"
        animatedProps={animatedProps}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <AnimatedPath
        d="M18.002 20.5C19.3827 20.5 20.502 19.3807 20.502 18C20.502 16.6193 19.3827 15.5 18.002 15.5C16.6212 15.5 15.502 16.6193 15.502 18C15.502 19.3807 16.6212 20.5 18.002 20.5Z"
        animatedProps={animatedProps}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <AnimatedPath
        d="M8.5 6H15C15.7956 6 16.5587 6.31607 17.1213 6.87868C17.6839 7.44129 18 8.20435 18 9C18 9.79565 17.6839 10.5587 17.1213 11.1213C16.5587 11.6839 15.7956 12 15 12H9C8.20435 12 7.44129 12.3161 6.87868 12.8787C6.31607 13.4413 6 14.2044 6 15C6 15.7956 6.31607 16.5587 6.87868 17.1213C7.44129 17.6839 8.20435 18 9 18H15.5"
        animatedProps={animatedProps}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
