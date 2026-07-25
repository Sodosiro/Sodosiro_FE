import CustomText from "@/components/common/CustomText";
import { Image, View } from "react-native";

export default function AIRecommend({ reason }: { reason: string }) {
  return (
    <View className="flex-row px-4 py-3 gap-2 bg-primary-light">
      <Image className="size-6" source={require("@/assets/images/ai.png")} />
      <View className="gap-1">
        <CustomText font="body1" className="text-primary-dark">
          AI 추천 이유
        </CustomText>
        <CustomText font="body2" className="text-text-secondary">
          {reason}
        </CustomText>
      </View>
    </View>
  );
}
