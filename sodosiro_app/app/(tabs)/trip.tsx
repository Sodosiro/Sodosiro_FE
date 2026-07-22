import CustomButton from "@/components/common/CustomButton";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function TripScreen() {
  const router = useRouter();
  const handlePressCondition = () => {
    router.push("/trip/condition");
  };
  const handlePressTimeline = () => {
    router.push("/trip/timeline");
  };
  return (
    <SafeAreaView className={`flex-1`}>
      {/* {임시} */}
      <View className={`px-4 py-4`}>
        <CustomButton type="primary" title="4-1 AI 입력 화면" onPress={handlePressCondition} />
      </View>
      <View className={`px-4 py-4`}>
        <CustomButton type="primary" title="5-1 동선 지도 타임라인" onPress={handlePressTimeline} />
      </View>
    </SafeAreaView>
  );
}
