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
      className={`${className} px-2.5 py-2 justify-center self-start rounded-full border border-primary bg-primary-light min-h-8`}
    >
      <CustomText font="body2 tight" className={`text-primary-dark`}>
        {title}
      </CustomText>
    </View>
  );
}
