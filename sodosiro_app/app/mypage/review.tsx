import Header from "@/components/common/Header";
import Spinner from "@/components/common/Spinner";
import MyReviewList from "@/components/mypage/review/MyReviewList";
import ReviewFilter from "@/components/placeDetail/review/ReviewFilter";
import { useMyReviewsQuery } from "@/hooks/query/review";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyReviewScreen() {
  const [sortOption, setSortOption] = useState<SortType>("RECENT");
  const [onlyPhotoReview, setOnlyPhotoReview] = useState(false);

  const { data, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMyReviewsQuery(sortOption, onlyPhotoReview);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Header title="내 리뷰" />

      <View className={`px-5`}>
        <ReviewFilter
          sortOption={sortOption}
          setSortOption={setSortOption}
          onlyPhotoReview={onlyPhotoReview}
          setOnlyPhotoReview={setOnlyPhotoReview}
        />
      </View>
      {isPending ? (
        <View className={`flex-1 justify-center items-center`}>
          <Spinner />
        </View>
      ) : (
        <MyReviewList
          reviews={data?.pages?.flatMap((page) => page.data.reviews) ?? []}
          onLoadMore={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </SafeAreaView>
  );
}
