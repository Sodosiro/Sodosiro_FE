import { StarIcon } from "@/assets/svgs";
import BottomActionBar from "@/components/common/BottomActionBar";
import CustomButton from "@/components/common/CustomButton";
import CustomText from "@/components/common/CustomText";
import Header from "@/components/common/Header";
import Spinner from "@/components/common/Spinner";
import PhotoPreview from "@/components/placeDetail/review/PhotoPreview";
import ReviewFilter from "@/components/placeDetail/review/ReviewFilter";
import ReviewList from "@/components/placeDetail/review/ReviewList";
import { useReviewsQuery } from "@/hooks/query/useReviewsQuery";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ReviewScreen() {
  const [sortOption, setSortOption] = useState<SortType>("RECENT");
  const [onlyPhotoReview, setOnlyPhotoReview] = useState(false);

  const { title, placeId } = useLocalSearchParams<{
    title: string;
    placeId: string;
  }>();

  const {
    data: reviewsData,
    isPending: isReviewsPending,
    isPlaceholderData,
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

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <Header title={"리뷰 전체보기"} />
      <View className={`gap-3 px-5`}>
        <View className={`flex-row gap-1 items-center`}>
          <StarIcon />
          <CustomText font="heading2">{avgRating}</CustomText>
          <CustomText font="body3" className={`text-text-muted`}>
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
        <View className={`flex-1 justify-center items-center min-h-30`}>
          <Spinner />
        </View>
      ) : (
        <ScrollView contentContainerClassName="pb-8 px-5">
          <PhotoPreview placeId={placeId} photoReviews={photoReviews} />
          <CustomText font="heading2">리뷰</CustomText>
          <ReviewList
            title={title}
            reviews={reviews}
            isPending={isReviewsPending}
          />
        </ScrollView>
      )}
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
                      placeId: placeId,
                      reviewId: myReviewId,
                      title: title,
                    },
                  })
              : () =>
                  router.push({
                    pathname: "/place/[placeId]/reviewWrite",
                    params: { placeId: placeId, title: title },
                  })
          }
        />
      </BottomActionBar>
    </SafeAreaView>
  );
}
