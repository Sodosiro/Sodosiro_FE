import { NavigationIcon } from "@/assets/svgs";
import BottomActionBar from "@/components/common/BottomActionBar";
import CustomButton from "@/components/common/CustomButton";
import CustomCarousel from "@/components/common/CustomCarousel";
import Header from "@/components/common/Header";
import FavoriteIcon from "@/components/icon/FavoriteIcon";
import AIRecommend from "@/components/placeDetail/placeOverview/AIRecommend";
import PlaceInfo from "@/components/placeDetail/placeOverview/PlaceInfo";
import PlaceTabBar from "@/components/placeDetail/PlaceTabBar";
import PlaceInfoSection from "@/components/placeDetail/section/PlaceInfoSection";
import RecommedSection from "@/components/placeDetail/section/RecommendSection";
import ReviewSection from "@/components/placeDetail/section/ReviewSection";
import { usePlaceDetailTab } from "@/hooks/usePlaceDetailTab";
import useSelectedAnimation from "@/hooks/useSelcetedAnimation";
import { PLACE_DETAIL } from "@/mocks/places";
import { useState } from "react";
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

  const [isFavorite, setIsFavorite] = useState(PLACE_DETAIL.heart);

  const { fillStyle } = useSelectedAnimation(isFavorite, {
    fill: ["transparent", "#C4D96A"],
  });

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
        <CustomCarousel images={PLACE_DETAIL.images} />

        {/* AI 추천 이유 */}
        <AIRecommend reason={PLACE_DETAIL.reason} />

        {/* 장소 정보 */}
        <PlaceInfo
          category={PLACE_DETAIL.category}
          title={PLACE_DETAIL.title}
          desc={PLACE_DETAIL.overview}
          rate={PLACE_DETAIL.rate}
          reviewCount={PLACE_DETAIL.reviewCount}
        />

        {/* 탭 바 */}
        <PlaceTabBar currentTab={currentTab} moveToSection={moveToSection} />

        {/* 이용 정보 */}
        <PlaceInfoSection
          ref={infoRef}
          address={PLACE_DETAIL.addr1}
          info={PLACE_DETAIL.info}
          onLayout={(e) => handleOnLayout(e, "이용 정보")}
        />

        {/* 리뷰 */}
        <ReviewSection
          ref={reviewRef}
          title={PLACE_DETAIL.title}
          reviews={PLACE_DETAIL.reviews}
          onLayout={(e) => handleOnLayout(e, "리뷰")}
        />

        {/* 함께 추천 */}
        <RecommedSection
          ref={recommendRef}
          recommendPlaces={PLACE_DETAIL.recommendPlaces}
          onLayout={(e) => handleOnLayout(e, "함께 추천")}
        />
      </ScrollView>

      {/* 하단 액션 바 */}
      <BottomActionBar>
        <>
          <CustomButton
            type="tertiary"
            title="좋아요"
            Icon={<FavoriteIcon height={14} animatedFill={fillStyle} />}
            onPress={() => setIsFavorite(!isFavorite)}
          />
          <CustomButton
            stretch
            type="primary"
            size="medium"
            title="길찾기"
            Icon={<NavigationIcon height={20} />}
          />
        </>
      </BottomActionBar>
    </SafeAreaView>
  );
}
