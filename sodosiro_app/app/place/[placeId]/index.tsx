import CustomCarousel from "@/components/common/CustomCarousel";
import Header from "@/components/common/Header";
import Spinner from "@/components/common/Spinner";
import PlaceDetailBottomBar from "@/components/placeDetail/PlaceDetailBottomBar";
import AIRecommend from "@/components/placeDetail/placeOverview/AIRecommend";
import PlaceInfo from "@/components/placeDetail/placeOverview/PlaceInfo";
import PlaceTabBar from "@/components/placeDetail/PlaceTabBar";
import PlaceInfoSection from "@/components/placeDetail/section/PlaceInfoSection";
import RecommedSection from "@/components/placeDetail/section/RecommendSection";
import ReviewSection from "@/components/placeDetail/section/ReviewSection";
import { usePlaceDetailQuery } from "@/hooks/query/place";
import { usePlaceDetailTab } from "@/hooks/usePlaceDetailTab";
import { NumberToCategory } from "@/util/place/category";
import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PlaceDetailScreen() {
  const {
    scrollRef,
    infoRef,
    reviewRef,
    recommendRef,
    currentTab,
    moveToSection,
    handleScroll,
    handleOnLayout,
  } = usePlaceDetailTab();

  const { placeId } = useLocalSearchParams<{
    placeId: string;
  }>();

  const { data: response, isPending } = usePlaceDetailQuery(Number(placeId));

  const placeDetail = response?.data;

  const {
    contentId,
    title,
    images,
    firstImage,
    aiRecommendation,
    category,
    overview,
    avgRating,
    reviewCount,
    latestReviews,
    liked,
    popularity,
    mapX,
    mapY,
    relatedSpots,
  } = placeDetail ?? {};

  if (isPending || !placeDetail) {
    return (
      <SafeAreaView
        style={{
          backgroundColor: "white",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spinner />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <Header title="장소 상세보기" />

      <ScrollView
        ref={scrollRef}
        className="flex-1"
        style={{ flex: 1 }}
        stickyHeaderIndices={[3]}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* 캐러셀 */}
        <CustomCarousel
          images={
            images?.length > 0
              ? images
              : firstImage || require("@/assets/images/no_image.png")
          }
        />

        {/* AI 추천 이유 */}
        <AIRecommend
          contentId={Number(placeId)}
          aiRecommendation={aiRecommendation}
        />

        {/* 장소 정보 */}
        <PlaceInfo
          category={NumberToCategory[category as CategoryNumber]}
          title={title}
          rankTag={popularity?.rankTag as string}
          overview={overview}
          avgRating={avgRating}
          reviewCount={reviewCount}
        />

        {/* 탭 바 */}
        <PlaceTabBar currentTab={currentTab} moveToSection={moveToSection} />

        {/* 이용 정보 */}
        <PlaceInfoSection
          ref={infoRef}
          placeDetail={placeDetail}
          onLayout={(e) => handleOnLayout(e, "이용 정보")}
        />

        {/* 리뷰 */}
        <ReviewSection
          ref={reviewRef}
          contentId={contentId}
          title={title}
          reviews={latestReviews}
          onLayout={(e) => handleOnLayout(e, "리뷰")}
          isPending={isPending}
        />

        {/* 함께 추천 */}
        <RecommedSection
          ref={recommendRef}
          recommendPlaces={relatedSpots}
          onLayout={(e) => handleOnLayout(e, "함께 추천")}
        />
      </ScrollView>

      {/* 하단 액션 바 */}
      <PlaceDetailBottomBar
        contentId={contentId}
        liked={liked}
        title={title}
        mapX={mapX}
        mapY={mapY}
      />
    </SafeAreaView>
  );
}
