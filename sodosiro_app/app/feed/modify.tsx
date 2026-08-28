import { patchFeedApi } from "@/api/feed";
import CustomButton from "@/components/common/CustomButton";
import Header from "@/components/common/Header";
import CreatingModal from "@/components/common/modal/CreatingModal";
import Spinner from "@/components/common/Spinner";
import CreateFeedStepContent from "@/components/feed/create/step/CreateFeedStepContent";
import { useFeedQuery } from "@/hooks/query/feed";
import { invalidateQueries } from "@/util/query/invalidateQueries";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ModifyFeedScreen() {
  const [place, setPlace] = useState<TripSpotType | null>(null);
  const [text, setText] = useState("");
  const [imageSources, setImageSources] = useState<
    ImagePicker.ImagePickerAsset[]
  >([]);
  const [isPicking, setIsPicking] = useState(false);

  const { feedId } = useLocalSearchParams<{
    feedId: string;
  }>();

  const { data: feedData, isPending: isFeedPending } = useFeedQuery(
    Number(feedId),
  );

  const { body, images } = feedData?.data ?? {};

  const [isSubmitting, setIsSubmitting] = useState(false);

  const isImagesUnchanged =
    imageSources.length === (images?.length ?? 0) &&
    imageSources.every(
      (image, index) => image.uri === images?.[index]?.imageUrl,
    );

  useEffect(() => {
    if (!feedData?.data) return;

    const feed = feedData.data;
    setText(feed.body);
    setPlace({
      contentId: feed.spot.contentId,
      title: feed.spot.title,
      // 카테고리 추후 수정 필요
      category: 1,
      firstImage: feed.spot.firstImage,
      alreadyPosted: false,
    });
    setImageSources(
      feed.images.map((image: { imageUrl: string }) => ({
        uri: image.imageUrl,
        mimeType: "image/jpeg",
        type: "image",
      })),
    );
  }, [feedData]);

  const handleSubmit = async () => {
    if (
      text.trim() === "" ||
      isFeedPending ||
      isPicking ||
      imageSources?.length === 0 ||
      !place
    ) {
      return;
    }
    try {
      setIsSubmitting(true);
      const keepImageUrls = imageSources
        .filter((image) =>
          images?.some(
            (existingImage: { imageUrl: string }) =>
              existingImage.imageUrl === image.uri,
          ),
        )
        .map((image) => image.uri);

      const newImages = imageSources.filter(
        (image) =>
          !images?.some(
            (existingImage: { imageUrl: string }) =>
              existingImage.imageUrl === image.uri,
          ),
      );

      await patchFeedApi(Number(feedId), text.trim(), keepImageUrls, newImages);

      await invalidateQueries([["feeds"], ["feed"]]);

      router.back();
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Header title="피드 수정하기" />

      {isFeedPending ? (
        <View className={`flex-1 justify-center items-center`}>
          <Spinner />
        </View>
      ) : (
        <CreateFeedStepContent
          selectedPlace={place}
          text={text}
          setText={setText}
          images={imageSources}
          setImages={setImageSources}
          isPicking={isPicking}
          isPending={isFeedPending || isSubmitting}
          setIsPicking={setIsPicking}
        />
      )}
      <View className="px-5 py-3">
        <CustomButton
          type="primary"
          title={"수정하기"}
          disabled={
            (body === text && isImagesUnchanged) ||
            imageSources?.length === 0 ||
            isPicking
          }
          loading={isSubmitting}
          onPress={handleSubmit}
        />
      </View>

      <CreatingModal
        isVisible={isSubmitting}
        title="피드를 수정 중이에요!"
        description="잠시만 기다려주세요!"
      />
    </SafeAreaView>
  );
}
