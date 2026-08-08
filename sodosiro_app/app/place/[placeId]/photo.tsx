import Header from "@/components/common/Header";
import PhotoGrid from "@/components/placeDetail/review/photo/PhotoGrid";
import PhotoReviewModal from "@/components/placeDetail/review/photo/PhotoReviewModal";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PhotoScreen() {
  const [visible, setVisible] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <Header title={"포토"} />
      <PhotoGrid
        onSelectPhoto={(photo) => {
          setSelectedReviewId(photo.reviewId);
          setSelectedImageUrl(photo.imageUrl);
          setVisible(true);
        }}
      />
      <PhotoReviewModal
        visible={visible}
        setVisible={setVisible}
        initialReviewId={selectedReviewId}
        initialImageUrl={selectedImageUrl}
        onClose={() => setVisible(false)}
      />
    </SafeAreaView>
  );
}
