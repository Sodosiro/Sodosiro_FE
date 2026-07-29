import { View } from "react-native";
import CustomText from "../common/CustomText";

export default function RouletteHeaderComponent({
  chance,
}: {
  chance: number;
}) {
  return (
    <View
      className={`px-3 py-2 flex-row gap-1 rounded-full bg-[rgba(255,255,255,0.6)]`}
    >
      <CustomText font="body3">남은 추천 횟수</CustomText>
      <CustomText font="body3">{chance}/5</CustomText>
    </View>
  );
}
