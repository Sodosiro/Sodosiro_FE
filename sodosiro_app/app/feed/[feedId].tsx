import { getFeedApi, patchFeedApi } from "@/api/feed";
import CustomButton from "@/components/common/CustomButton";
import Header from "@/components/common/Header";
import Spinner from "@/components/common/Spinner";
import CreateFeedStepContent from "@/components/feed/create/step/CreateFeedStepContent";
import { invalidateQueries } from "@/util/query/invalidateQueries";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ModifyFeedScreen() {
  const router = useRouter();
  const [place, setPlace] = useState<TripSpotType | null>(null);
  const [text, setText] = useState("");
  const [imageSources, setImageSources] = useState<
    ImagePicker.ImagePickerAsset[]
  >([]);
  const [isPicking, setIsPicking] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const { feedId } = useLocalSearchParams<{
    feedId: string;
  }>();

  const { data } = useQuery({
    queryKey: ["feed", Number(feedId)],
    queryFn: () => getFeedApi(Number(feedId)),
    enabled: !!feedId,
  });

  const { body, images } = data?.data ?? {};

  const isImagesUnchanged =
    imageSources.length === (images?.length ?? 0) &&
    imageSources.every(
      (image, index) => image.uri === images?.[index]?.imageUrl,
    );

  useEffect(() => {
    if (!data?.data) return;

    const feed = data.data;
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
  }, [data]);

  const handleSubmit = async () => {
    if (
      text.trim() === "" ||
      isPending ||
      isPicking ||
      imageSources?.length === 0 ||
      !place
    ) {
      return;
    }
    try {
      setIsPending(true);

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

      router.push("/mypage/feed");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("status:", error.response?.status);
        console.log("data:", error.response?.data);
      }
      console.error("[postReviewApi] 피드 수정 실패:", error);
    } finally {
      setIsPending(false);
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

      {isPending ? (
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
          isPending={isPending}
          setIsPicking={setIsPicking}
        />
      )}
      <View className="px-5 py-3">
        <CustomButton
          type="primary"
          title={"수정하기"}
          disabled={
            (body === text && isImagesUnchanged) || imageSources?.length === 0
          }
          loading={isPending}
          onPress={handleSubmit}
        />
      </View>
    </SafeAreaView>
  );
}
