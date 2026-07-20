import { Text, TextProps } from "react-native";

export default function CustomText({
  className,
  children,
  ...props
}: TextProps) {

  return (
    <Text className={`${className} text-[#1A1A1A] font-pretendard`} {...props}>
      {children}
    </Text>
  )
}