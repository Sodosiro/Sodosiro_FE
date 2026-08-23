import { deleteReviewApi } from "@/api/review";
import CustomText from "@/components/common/CustomText";
import DeleteModal from "@/components/common/modal/DeleteModal";
import Spinner from "@/components/common/Spinner";
import ReviewImageModal from "@/components/placeDetail/review/ReviewImageModal";
import { queryClient } from "@/lib/queryClient";
import { useState } from "react";
import { FlatList, View } from "react-native";
import MyReview from "./MyReview";

interface MyReviewListProps {
  reviews: MyReviewType[];
  onLoadMore: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export default function MyReviewList({
  reviews,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
}: MyReviewListProps) {
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

    setDeleteReviewId(null);
    setIsDeleteModalVisible(false);
  };

  return reviews?.length > 0 ? (
    <>
      <FlatList
        data={reviews}
        keyExtractor={(item) => String(item.reviewId)}
        className={`pb-8 px-5`}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            onLoadMore();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? (
            <View className="py-4 items-center">
              <Spinner />
            </View>
          ) : null
        }
        renderItem={({ item, index }) => (
          <MyReview
            review={item}
            isLast={reviews.length - 1 === index}
            handleImageClick={handleImageClick}
            setIsDeleteModalVisible={setIsDeleteModalVisible}
            setDeleteReviewId={setDeleteReviewId}
          />
        )}
        ListEmptyComponent={<View className="flex-1" />}
      />

      <ReviewImageModal
        isModalVisible={isPhotoModalVisible}
        setIsModalVisible={setIsPhotoModalVisible}
        images={selectedImages ?? []}
        defaultIndex={carouselIndex}
      />

      <DeleteModal
        body="선택한 리뷰를 삭제할까요?"
        isDeleteModalVisible={isDeleteModalVisible}
        onCancel={() => {
          setDeleteReviewId(null);
          setIsDeleteModalVisible(false);
        }}
        handleConfirmDelete={() => {
          if (deleteReviewId !== null) {
            handleConfirmDelete(deleteReviewId);
          }
        }}
      />
    </>
  ) : (
    <View className={`flex-1 justify-center items-center`}>
      <CustomText font="body1" className={`text-text-muted pb-10`}>
        작성한 리뷰가 없어요.
      </CustomText>
    </View>
  );
}
