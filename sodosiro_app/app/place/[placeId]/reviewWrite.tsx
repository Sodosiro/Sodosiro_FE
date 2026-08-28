import { postReviewApi } from "@/api/review";
import CustomButton from "@/components/common/CustomButton";
import CustomText from "@/components/common/CustomText";
import Header from "@/components/common/Header";
import CreatingModal from "@/components/common/modal/CreatingModal";
import Rating from "@/components/placeDetail/review/write/Rating";
import ReviewForm from "@/components/placeDetail/review/write/ReviewForm";
import { invalidateQueries } from "@/util/query/invalidateQueries";
import { hasBatchim } from "@/util/word/word";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPicking, setIsPicking] = useState(false);

  const handleSubmit = async () => {
    if (rate === 0 || content.trim() === "" || isSubmitting || isPicking) {
      return;
    }
    try {
      setIsSubmitting(true);

      await postReviewApi(Number(placeId), rate, content.trim(), imageSources);

      await invalidateQueries([
        ["places"],
        ["search"],
        ["placeDetail", Number(placeId)],
        ["reviews", Number(placeId)],
        ["courseDetail"],
      ]);

      router.back();
    } catch (error) {
    } finally {
      setIsSubmitting(false);
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
          <Rating rate={rate} setRate={setRate} isPending={isSubmitting} />
        </View>
        <ReviewForm
          content={content}
          setContent={setContent}
          imageSources={imageSources}
          setImageSources={setImageSources}
          isPending={isSubmitting}
          isPicking={isPicking}
          setIsPicking={setIsPicking}
        />
      </ScrollView>
      <View className={`p-5 bg-bg`}>
        <CustomButton
          type="primary"
          title="등록하기"
          disabled={rate === 0 || content.trim() === "" || isPicking}
          loading={isSubmitting}
          onPress={handleSubmit}
        />
      </View>
      <CreatingModal
        isVisible={isSubmitting}
        title="댓글을 등록 중이에요!"
        description="잠시만 기다려주세요!"
      />
    </SafeAreaView>
  );
}
