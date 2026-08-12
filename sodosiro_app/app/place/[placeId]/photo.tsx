import Header from "@/components/common/Header";
import PhotoGrid from "@/components/placeDetail/review/photo/PhotoGrid";
import PhotoReviewModal from "@/components/placeDetail/review/photo/PhotoReviewModal";
import { useReviewsQuery } from "@/hooks/query/useReviewsQuery";
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

  const { data: photoReviewsData } = useReviewsQuery(
    Number(placeId),
    undefined,
    true,
  );

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <Header title={"포토"} />
      <PhotoGrid
        photoReviews={
          photoReviewsData?.pages.flatMap((page) => page.data.reviews) ?? []
        }
        onSelectPhoto={(photo) => {
          setSelectedReviewId(photo.reviewId);
          setSelectedImageUrl(photo.imageUrl);
          setVisible(true);
        }}
      />
      <PhotoReviewModal
        photoReviews={
          photoReviewsData?.pages.flatMap((page) => page.data.reviews) ?? []
        }
        visible={visible}
        setVisible={setVisible}
        initialReviewId={selectedReviewId}
        initialImageUrl={selectedImageUrl}
        onClose={() => setVisible(false)}
      />
    </SafeAreaView>
  );
}
