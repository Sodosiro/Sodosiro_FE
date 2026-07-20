import { Text, TextProps } from "react-native";

export default function CustomText({
  className,
  children,
  ...props
}: TextProps) {

  return (
    <Text className={`${className} text-text-primary font-pretendard`} {...props}>
      {children}
    </Text>
  )
}