import { deleteReviewApi } from "@/api/review";
import DeleteModal from "@/components/common/modal/DeleteModal";
import ReviewImageModal from "@/components/placeDetail/review/ReviewImageModal";
import { queryClient } from "@/lib/queryClient";
import { useState } from "react";
import { View } from "react-native";
import MyReview from "./MyReview";

export default function MyReviewList({ reviews }: { reviews: MyReviewType[] }) {
  const [isPhotoModalVisible, setIsPhotoModalVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[] | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteReviewId, setDeleteReviewId] = useState<number | null>(null);

  const handleImageClick = (images: string[], index: number) => {
    setSelectedImages(images);
    setCarouselIndex(index);
    setIsPhotoModalVisible(true);
  };

  const handleConfirmDelete = async (reviewId: number) => {
    await deleteReviewApi(reviewId);
    await queryClient.invalidateQueries({
      queryKey: ["myReviews"],
    });
    setIsDeleteModalVisible(false);
  };

  return (
    <>
      {reviews?.length > 0 ? (
        reviews?.map((review, index) => (
          <MyReview
            key={review?.reviewId}
            review={review}
            isLast={reviews.length - 1 === index}
            handleImageClick={handleImageClick}
            setIsDeleteModalVisible={setIsDeleteModalVisible}
            setDeleteReviewId={setDeleteReviewId}
          />
        ))
      ) : (
        <View className={`flex-1`}></View>
      )}
      <ReviewImageModal
        isModalVisible={isPhotoModalVisible}
        setIsModalVisible={setIsPhotoModalVisible}
        images={selectedImages as string[]}
        defaultIndex={carouselIndex}
      />
      <DeleteModal
        body={"선택한 리뷰를 삭제할까요?"}
        isDeleteModalVisible={isDeleteModalVisible}
        onCancel={() => {
          setDeleteReviewId(null);
          setIsDeleteModalVisible(false);
        }}
        handleConfirmDelete={() =>
          handleConfirmDelete(deleteReviewId as number)
        }
      />
    </>
  );
}
