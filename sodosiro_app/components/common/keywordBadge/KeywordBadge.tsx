import { View } from "react-native";
import CustomText from "../CustomText";

export default function KeywordBadge({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <View
      className={`${className} px-3 py-2 self-start rounded-full border border-primary bg-primary-light`}
    >
      <CustomText font="body2 tight" className={`text-primary-dark`}>
        {title}
      </CustomText>
    </View>
  );
}
