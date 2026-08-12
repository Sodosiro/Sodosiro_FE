import Header from "@/components/common/Header";
import MyReviewList from "@/components/mypage/review/MyReviewList";
import ReviewFilter from "@/components/placeDetail/review/ReviewFilter";
import { useMyReviewsQuery } from "@/hooks/query/useMyReviewsQuery";
import { useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyReviewScreen() {
  const [sortOption, setSortOption] = useState("최신순");
  const [onlyPhotoReview, setOnlyPhotoReview] = useState(false);

  const { data } = useMyReviewsQuery();

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
      <ScrollView contentContainerClassName="pb-8 px-5">
        <MyReviewList
          reviews={data?.pages?.flatMap((page) => page.data.reviews) ?? []}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
