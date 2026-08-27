import CustomText from "@/components/common/CustomText";
import { Image, View } from "react-native";

export default function NoFestival() {
  return (
    <View className={`rounded-xl items-center px-4 py-8 gap-3`}>
      <View className={`opacity-70`}>
        <Image source={require("@/assets/images/calendar.png")} />
      </View>
      <CustomText font="body2" className={`text-text-secondary`}>
        예정된 축제가 없어요
      </CustomText>
    </View>
  );
}
