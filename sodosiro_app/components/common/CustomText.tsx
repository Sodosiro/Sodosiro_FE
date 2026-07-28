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
import { Text } from "react-native";

interface Props extends TextProps {
  font: TypoType;
}

export default function CustomText({
  className,
  children,
  font,
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
    <Text
      className={`${className} ${ClassMap[font]} text-[#1A1A1A]`}
      {...props}
    >
      {children}
    </Text>
  );
}
