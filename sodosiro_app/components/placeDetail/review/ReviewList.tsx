import { useState } from "react";
import Review from "./Review";
import EmptyReview from "./ReviewEmpty";
import ReviewImageModal from "./ReviewImageModal";

export default function ReviewList({
  title,
  reviews,
  prev = false,
}: {
  title: string;
  reviews: ReviewType[];
  prev?: boolean;
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[] | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const handleImageClick = (images: string[], index: number) => {
    setSelectedImages(images);
    setCarouselIndex(index);
    setIsModalVisible(true);
  };

  return (
    <>
      {reviews?.length > 0 ? (
        reviews?.map((review, index) => (
          <Review
            key={review?.reviewId}
            review={review}
            isLast={reviews.length - 1 === index}
            prev={prev}
            handleImageClick={handleImageClick}
          />
        ))
      ) : (
        <EmptyReview title={title} showWriteButton={prev} />
      )}
      <ReviewImageModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        images={selectedImages as string[]}
        defaultIndex={carouselIndex}
      />
    </>
  );
}
