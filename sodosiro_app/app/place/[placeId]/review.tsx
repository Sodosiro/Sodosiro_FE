import { StarIcon } from "@/assets/svgs";
import BottomActionBar from "@/components/common/BottomActionBar";
import CustomButton from "@/components/common/CustomButton";
import CustomText from "@/components/common/CustomText";
import Header from "@/components/common/Header";
import Spinner from "@/components/common/Spinner";
import PhotoPreview from "@/components/placeDetail/review/PhotoPreview";
import Review from "@/components/placeDetail/review/Review";
import EmptyReview from "@/components/placeDetail/review/ReviewEmpty";
import ReviewFilter from "@/components/placeDetail/review/ReviewFilter";
import ReviewImageModal from "@/components/placeDetail/review/ReviewImageModal";
import { useReviewsQuery } from "@/hooks/query/review";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ReviewScreen() {
  const [sortOption, setSortOption] = useState<SortType>("RECENT");
  const [onlyPhotoReview, setOnlyPhotoReview] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[] | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const { title, placeId } = useLocalSearchParams<{
    title: string;
    placeId: string;
  }>();

  const {
    data: reviewsData,
    isPending: isReviewsPending,
    isPlaceholderData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useReviewsQuery(Number(placeId), sortOption, onlyPhotoReview);

  // 리뷰 포토 모아보기(5장)
  const { data: photoReviewsData } = useReviewsQuery(
    Number(placeId),
    undefined,
    true,
    5,
  );

  const { avgRating, totalCount, myReviewId } =
    reviewsData?.pages[0].data ?? {};

  const reviews = reviewsData?.pages.flatMap((page) => page.data.reviews) ?? [];

  const photoReviews =
    photoReviewsData?.pages.flatMap((page) => page.data.reviews) ?? [];

  const handleImageClick = (images: string[], index: number) => {
    setSelectedImages(images);
    setCarouselIndex(index);
    setIsModalVisible(true);
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <Header title="리뷰 전체보기" />

      {/* 평점 + 필터 */}
      <View className="gap-3 px-5">
        <View className="flex-row gap-1 items-center">
          <StarIcon />

          <CustomText font="heading2">{avgRating}</CustomText>

          <CustomText font="body3" className="text-text-muted">
            {"(" + totalCount + ")"}
          </CustomText>
        </View>

        <ReviewFilter
          sortOption={sortOption}
          setSortOption={setSortOption}
          onlyPhotoReview={onlyPhotoReview}
          setOnlyPhotoReview={setOnlyPhotoReview}
        />
      </View>

      {isReviewsPending || isPlaceholderData ? (
        <View className="flex-1 justify-center items-center min-h-30">
          <Spinner />
        </View>
      ) : (
        <FlatList
          data={reviews}
          keyExtractor={(item) => String(item.reviewId)}
          contentContainerClassName="px-5 pb-8"
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingNextPage ? (
              <View className="items-center py-4">
                <Spinner />
              </View>
            ) : null
          }
          ListHeaderComponent={
            <>
              <PhotoPreview placeId={placeId} photoReviews={photoReviews} />
              <CustomText font="heading2">리뷰</CustomText>
            </>
          }
          renderItem={({ item, index }) => (
            <Review
              review={item}
              isLast={reviews.length - 1 === index}
              handleImageClick={handleImageClick}
            />
          )}
          ListEmptyComponent={
            <EmptyReview title={title} showWriteButton={true} />
          }
        />
      )}

      {/* 리뷰 이미지 모달 */}
      <ReviewImageModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        images={selectedImages ?? []}
        defaultIndex={carouselIndex}
      />

      {/* 리뷰 작성 */}
      <BottomActionBar>
        <CustomButton
          type="primary"
          title={myReviewId ? "리뷰 수정하기" : "리뷰 작성하기"}
          stretch
          loading={isReviewsPending}
          onPress={
            myReviewId
              ? () =>
                  router.push({
                    pathname: "/place/[placeId]/[reviewId]",
                    params: {
                      placeId,
                      reviewId: myReviewId,
                      title,
                    },
                  })
              : () =>
                  router.push({
                    pathname: "/place/[placeId]/reviewWrite",
                    params: {
                      placeId,
                      title,
                    },
                  })
          }
        />
      </BottomActionBar>
    </SafeAreaView>
  );
}
