import { StarIcon } from "@/assets/svgs";
import BottomActionBar from "@/components/common/BottomActionBar";
import CustomButton from "@/components/common/CustomButton";
import CustomText from "@/components/common/CustomText";
import Header from "@/components/common/Header";
import PhotoPreview from "@/components/placeDetail/review/PhotoPreview";
import ReviewFilter from "@/components/placeDetail/review/ReviewFilter";
import ReviewList from "@/components/placeDetail/review/ReviewList";
import { useReviewsQuery } from "@/hooks/query/useReviewsQuery";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ReviewScreen() {
  const [sortOption, setSortOption] = useState("최신순");
  const [onlyPhotoReview, setOnlyPhotoReview] = useState(false);

  const { title, placeId } = useLocalSearchParams<{
    title: string;
    placeId: string;
  }>();

  const { data, isPending } = useReviewsQuery(Number(placeId));

  const reviews = data?.pages.flatMap((page) => page.data.reivews) ?? [];

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
          <CustomText font="heading2">
            {data?.pages[0].data.avgRating}
          </CustomText>
          <CustomText font="body3" className={`text-text-muted`}>
            {"(" + data?.pages[0].data.totalCount + ")"}
          </CustomText>
        </View>

        <ReviewFilter
          sortOption={sortOption}
          setSortOption={setSortOption}
          onlyPhotoReview={onlyPhotoReview}
          setOnlyPhotoReview={setOnlyPhotoReview}
        />
      </View>
      <ScrollView contentContainerClassName="pb-8 px-5">
        <PhotoPreview />
        <CustomText font="heading2">리뷰</CustomText>
        <ReviewList
          title={title}
          reviews={data?.pages.flatMap((page) => page.data.reviews) ?? []}
        />
      </ScrollView>
      <BottomActionBar>
        <CustomButton
          type="primary"
          title={"리뷰 작성하기"}
          stretch
          onPress={() =>
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
