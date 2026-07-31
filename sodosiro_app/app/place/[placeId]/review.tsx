import { StarIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import Header from "@/components/common/Header";
import ReviewFilter from "@/components/placeDetail/review/ReviewFilter";
import ReviewList from "@/components/placeDetail/review/ReviewList";
import { PLACE_DETAIL } from "@/mocks/places";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ReviewScreen() {
  const [sortOption, setSortOption] = useState("최신순");
  const [onlyPhotoReview, setOnlyPhotoReview] = useState(false);

  const { title } = useLocalSearchParams<{
    title: string;
  }>();

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
          <CustomText font="heading2">{PLACE_DETAIL.rate}</CustomText>
          <CustomText font="body3" className={`text-text-muted`}>
            {"(" + PLACE_DETAIL.reviewCount + ")"}
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
        <CustomText font="heading2">리뷰</CustomText>

        <ReviewList title={title} reviews={PLACE_DETAIL.reviews} />
      </ScrollView>
    </SafeAreaView>
  );
}
