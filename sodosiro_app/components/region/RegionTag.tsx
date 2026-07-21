import { View } from "react-native";
import CustomText from "../common/CustomText";

export default function RegionTag({ title }: { title: string }) {
  return (
    <View
      className={`px-3 py-1.5 self-start rounded-full border border-primary bg-primary-light`}
    >
      <CustomText font="body2 tight" className={`text-primary-dark`}>
        {title}
      </CustomText>
    </View>
  );
}
