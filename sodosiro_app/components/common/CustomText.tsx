import {
  Body1Class,
  Body2Class,
  Body2TightClass,
  Body3Class,
  Body3Review,
  Body3TightClass,
  DisplayClass,
  Heading1Class,
  Heading2Class,
  TitleClass,
  TitleTightClass,
} from "@/styles/Typography";
import type { TextProps } from "react-native";
import Animated from "react-native-reanimated";
import { AnimatedStyleHandle } from "react-native-reanimated/lib/typescript/hook/commonTypes";

interface Props extends TextProps {
  font: TypoType;
  animatedStyle?: AnimatedStyleHandle<{
    color: string;
  }>;
}

export default function CustomText({
  className,
  children,
  font,
  animatedStyle,
  ...props
}: Props) {
  const ClassMap = {
    display: DisplayClass,
    heading1: Heading1Class,
    heading2: Heading2Class,
    title: TitleClass,
    "title tight": TitleTightClass,
    body1: Body1Class,
    body2: Body2Class,
    "body2 tight": Body2TightClass,
    body3: Body3Class,
    "body3 review": Body3Review,
    "body3 tight": Body3TightClass,
  };

  return (
    <Animated.Text
      className={`${className} ${ClassMap[font]} text-[#1A1A1A]`}
      style={animatedStyle || undefined}
      {...props}
    >
      {children}
    </Animated.Text>
  );
}
