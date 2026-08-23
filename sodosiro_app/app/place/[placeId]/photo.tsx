import Header from "@/components/common/Header";
import PhotoGrid from "@/components/placeDetail/review/photo/PhotoGrid";
import PhotoReviewModal from "@/components/placeDetail/review/photo/PhotoReviewModal";
import { useReviewsQuery } from "@/hooks/query/review";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PhotoScreen() {
  const [visible, setVisible] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  const { placeId } = useLocalSearchParams<{
    placeId: string;
  }>();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useReviewsQuery(Number(placeId), undefined, true);

  const photoReviews = data?.pages.flatMap((page) => page.data.reviews) ?? [];

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <Header title={"포토"} />
      <PhotoGrid
        photoReviews={photoReviews}
        onSelectPhoto={(photo) => {
          setSelectedReviewId(photo.reviewId);
          setSelectedImageUrl(photo.imageUrl);
          setVisible(true);
        }}
        onLoadMore={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        isFetchingNextPage={isFetchingNextPage}
      />
      <PhotoReviewModal
        photoReviews={photoReviews}
        visible={visible}
        setVisible={setVisible}
        initialReviewId={selectedReviewId}
        initialImageUrl={selectedImageUrl}
        onClose={() => setVisible(false)}
        onLoadMore={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </SafeAreaView>
  );
}
