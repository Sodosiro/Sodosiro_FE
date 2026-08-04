import AnimatedButton from "@/components/common/animated/AnimatedButton";
import CustomText from "@/components/common/CustomText";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { View } from "react-native";

export default function EmptyReview({ title }: { title: string }) {
  const { placeId } = useLocalSearchParams<{ placeId: string }>();

  return (
    <View className={`pt-4 gap-5 items-center`}>
      <View className={`gap-2 items-center`}>
        <CustomText font="title">아직 등록된 리뷰가 없어요.</CustomText>
        <CustomText font="body3" className={`text-text-secondary`}>
          첫번째 리뷰를 남겨보세요!
        </CustomText>
      </View>
      <AnimatedButton
        backgroundColor={["#F5F5F5", "#E2E2E8"]}
        className={`border border-border rounded-full px-4 py-3`}
        onPress={() =>
          router.push({
            pathname: "/place/[placeId]/reviewWrite",
            params: { placeId: placeId, title: title },
          })
        }
      >
        <CustomText font="body3 tight">리뷰 쓰기</CustomText>
      </AnimatedButton>
    </View>
  );
}
