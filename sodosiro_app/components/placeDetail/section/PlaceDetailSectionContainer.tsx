import CustomText from "@/components/common/CustomText";
import type { RefObject } from "react";
import { View } from "react-native";

export default function PlaceDetailSectionContainer({
  ref,
  title,
  children,
  className,
  rightComponent,
  ...props
}: {
  ref: RefObject<View | null>;
  title: string;
  rightComponent?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <View ref={ref} className={`px-5 pt-8 ${className}`} {...props}>
      <View className={`flex-row items-center justify-between`}>
        <CustomText font="heading2">{title}</CustomText>
        {rightComponent}
      </View>
      {children}
    </View>
  );
}
