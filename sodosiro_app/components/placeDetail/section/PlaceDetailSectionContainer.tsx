import CustomText from "@/components/common/CustomText";
import type { RefObject } from "react";
import { View } from "react-native";

export default function PlaceDetailSectionContainer({
  ref,
  title,
  children,
  className,
  ...props
}: {
  ref: RefObject<View | null>;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <View ref={ref} className={`px-5 pt-8 gap-3 ${className}`} {...props}>
      <CustomText font="heading2">{title}</CustomText>
      {children}
    </View>
  );
}
