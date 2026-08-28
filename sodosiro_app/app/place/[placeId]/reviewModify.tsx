import { patchReviewApi } from "@/api/review";
import CustomButton from "@/components/common/CustomButton";
import CustomText from "@/components/common/CustomText";
import Header from "@/components/common/Header";
import CreatingModal from "@/components/common/modal/CreatingModal";
import Spinner from "@/components/common/Spinner";
import Rating from "@/components/placeDetail/review/write/Rating";
import ReviewForm from "@/components/placeDetail/review/write/ReviewForm";
import { useMyReviewQuery } from "@/hooks/query/review";
import { invalidateQueries } from "@/util/query/invalidateQueries";
import { hasBatchim } from "@/util/word/word";
import { ImagePickerAsset } from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ImageType = {
  imageUrl: string;
  displayOrder: number;
};

export default function ReviewModifyScreen() {
  const { placeId, reviewId, title } = useLocalSearchParams<{
    placeId: string;
    reviewId: string;
    title: string;
  }>();

  const { data, isPending: isGetReviewPending } = useMyReviewQuery(
    Number(reviewId),
  );

  const { body, rating, images } = data?.data ?? {};

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

      const keepImageUrls = imageSources
        .filter((image) =>
          images?.some(
            (existingImage: ImageType) => existingImage.imageUrl === image.uri,
          ),
        )
        .map((image) => image.uri);

      const newImages = imageSources.filter(
        (image) =>
          !images?.some(
            (existingImage: ImageType) => existingImage.imageUrl === image.uri,
          ),
      );

      await patchReviewApi(
        Number(reviewId),
        rate,
        content.trim(),
        newImages,
        keepImageUrls,
      );

      await invalidateQueries([
        ["placeDetail", Number(placeId)],
        ["reviews", Number(placeId)],
        ["myReview", Number(reviewId)],
        ["myReviews"],
        ["courseDetail"],
      ]);

      router.back();
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  const isImagesUnchanged =
    imageSources.length === (images?.length ?? 0) &&
    imageSources.every(
      (image, index) => image.uri === images?.[index]?.imageUrl,
    );

  useEffect(() => {
    if (!data?.data) return;

    setContent(body);
    setRate(rating);
    setImageSources(
      images.map((image: { imageUrl: string; displayOrder: number }) => ({
        uri: image.imageUrl,
        mimeType: "image/jpeg",
        type: "image",
      })),
    );
  }, [data]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <Header title="리뷰 수정하기" />

      {isGetReviewPending ? (
        <View className={`flex-1 justify-center items-center`}>
          <Spinner />
        </View>
      ) : (
        <>
          <ScrollView contentContainerClassName={`pt-4.5 px-5 gap-8 grow`}>
            <View className={`gap-3`}>
              <CustomText font="heading2">
                {title}
                <Text className={`text-text-muted`}>
                  {particle} 어떠셨나요?
                </Text>
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
        </>
      )}
      <View className={`p-5 bg-bg`}>
        <CustomButton
          type="primary"
          title="수정하기"
          disabled={
            rate === 0 ||
            content?.trim() === "" ||
            isPicking ||
            isGetReviewPending ||
            (body === content && rating === rate && isImagesUnchanged)
          }
          loading={isSubmitting}
          onPress={handleSubmit}
        />
      </View>
      <CreatingModal
        isVisible={isSubmitting}
        title="댓글을 수정 중이에요!"
        description="잠시만 기다려주세요!"
      />
    </SafeAreaView>
  );
}
