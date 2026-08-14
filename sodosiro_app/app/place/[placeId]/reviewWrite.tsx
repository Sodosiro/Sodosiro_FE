import { postReviewApi } from "@/api/review";
import CustomButton from "@/components/common/CustomButton";
import CustomText from "@/components/common/CustomText";
import Header from "@/components/common/Header";
import Rating from "@/components/placeDetail/review/write/Rating";
import ReviewForm from "@/components/placeDetail/review/write/ReviewForm";
import { invalidateQueries } from "@/util/query/invalidateQueries";
import { hasBatchim } from "@/util/word/word";
import axios from "axios";
import { ImagePickerAsset } from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ReviewWriteScreen() {
  const { placeId, title } = useLocalSearchParams<{
    placeId: string;
    title: string;
  }>();
  const particle = hasBatchim(title) ? "은" : "는";
  const [content, setContent] = useState("");
  const [imageSources, setImageSources] = useState<ImagePickerAsset[]>([]);
  const [rate, setRate] = useState(0);
  const [isPending, setIsPending] = useState(false);
  const [isPicking, setIsPicking] = useState(false);

  const handleSubmit = async () => {
    if (rate === 0 || content.trim() === "" || isPending || isPicking) {
      return;
    }
    try {
      setIsPending(true);

      await postReviewApi(Number(placeId), rate, content.trim(), imageSources);

      await invalidateQueries([
        ["placeDetail", Number(placeId)],
        ["reviews", Number(placeId)],
      ]);

      router.back();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("status:", error.response?.status);
        console.log("data:", error.response?.data);
      }
      console.error("[postReviewApi] 리뷰 등록 실패:", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <Header title="리뷰 작성하기" />
      <ScrollView contentContainerClassName={`pt-4.5 px-5 gap-8 grow`}>
        <View className={`gap-3`}>
          <CustomText font="heading2">
            {title}
            <Text className={`text-text-muted`}>{particle} 어떠셨나요?</Text>
          </CustomText>
          <Rating rate={rate} setRate={setRate} isPending={isPending} />
        </View>
        <ReviewForm
          content={content}
          setContent={setContent}
          imageSources={imageSources}
          setImageSources={setImageSources}
          isPending={isPending}
          isPicking={isPicking}
          setIsPicking={setIsPicking}
        />
      </ScrollView>
      <View className={`p-5 bg-bg`}>
        <CustomButton
          type="primary"
          title="등록하기"
          disabled={rate === 0 || content.trim() === "" || isPicking}
          loading={isPending}
          onPress={handleSubmit}
        />
      </View>
    </SafeAreaView>
  );
}
