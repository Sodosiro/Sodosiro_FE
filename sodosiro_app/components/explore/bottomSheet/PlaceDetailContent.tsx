import { AnimatedView } from "@/components/common/animated/Animated";
import EmptyState from "@/components/common/EmptyState";
import { ExpandableTextRef } from "@/components/common/ExpandableText";
import Spinner from "@/components/common/Spinner";
import AIRecommend from "@/components/placeDetail/placeOverview/AIRecommend";
import PlaceInfo from "@/components/placeDetail/placeOverview/PlaceInfo";
import PlaceTabBar from "@/components/placeDetail/PlaceTabBar";
import PlaceInfoSection from "@/components/placeDetail/section/PlaceInfoSection";
import RecommendSection from "@/components/placeDetail/section/RecommendSection";
import ReviewSection from "@/components/placeDetail/section/ReviewSection";
import { usePlaceDetailQuery } from "@/hooks/query/place";
import { usePlaceDetailTab } from "@/hooks/usePlaceDetailTab";
import { useExploreStore } from "@/stores/useExploreStore";
import { NumberToCategory } from "@/util/place/category";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { FadeIn } from "react-native-reanimated";
import ImageList from "./ImageList";

export default function PlaceDetailContent({
  placeId,
  handleLike,
  isLikePending,
}: {
  placeId: number | null;
  handleLike: (contentId: number) => Promise<void>;
  isLikePending: boolean;
}) {
  const [placeInfoHeight, setPlaceInfoHeight] = useState(0);
  const expandableTextRef = useRef<ExpandableTextRef>(null);
  const setSelectedPlaceId = useExploreStore(
    (state) => state.setSelectedPlaceId,
  );
  const placeInfoRef = useRef<View>(null);

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

  const {
    data: response,
    isPending,
    isError,
    refetch,
  } = usePlaceDetailQuery(placeId as number);

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
    popularity,
    relatedSpots,
    liked,
  } = placeDetail ?? {};

  useEffect(() => {
    if (placeId === null) return;

    scrollRef.current?.scrollTo({
      y: 0,
      animated: false,
    });
  }, [placeId]);

  if (isPending || !placeDetail || isError) {
    return (
      <View className={`h-80`}>
        {isError ? (
          <EmptyState
            title="지역 정보를 불러오지 못했어요."
            description="네트워크 상태를 확인하고 다시 시도해주세요"
            actionLabel="다시 시도"
            onPressAction={() => refetch()}
          />
        ) : (
          <View className={`flex-1 justify-center items-center`}>
            <Spinner />
          </View>
        )}
      </View>
    );
  }

  return (
    <BottomSheetScrollView
      ref={scrollRef}
      className="flex-1"
      style={{ flex: 1 }}
      stickyHeaderIndices={[3]}
      onScroll={handleScroll}
    >
      {/* 장소 정보 */}
      <View
        ref={placeInfoRef}
        onLayout={(e) => {
          if (
            expandableTextRef.current?.collapsedHeight.value ===
            expandableTextRef.current?.animatedHeight.value
          ) {
            setPlaceInfoHeight(e.nativeEvent.layout.height);
          }
        }}
      >
        <PlaceInfo
          contentId={contentId as number}
          category={NumberToCategory[category as CategoryNumber]}
          title={title}
          rankTag={popularity?.rankTag as string}
          overview={overview}
          avgRating={avgRating}
          reviewCount={reviewCount}
          expandableTextRef={expandableTextRef}
          liked={liked}
          handleLike={handleLike}
          isLikePending={isLikePending}
        />
      </View>

      {/* 이미지 */}
      {placeInfoHeight === 0 ? (
        <View className={`min-h-80`} />
      ) : (
        <AnimatedView entering={FadeIn}>
          <ImageList
            placeId={contentId as number}
            images={images?.length > 0 ? images.slice(0, 10) : firstImage || []}
            height={336 - placeInfoHeight - 38}
          />
        </AnimatedView>
      )}

      {/* AI 한 줄 요약 */}
      <AIRecommend
        contentId={Number(placeId)}
        aiRecommendation={aiRecommendation}
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
      <RecommendSection
        ref={recommendRef}
        recommendPlaces={relatedSpots}
        onLayout={(e) => handleOnLayout(e, "함께 추천")}
        handlePlaceMini={(id: number) => setSelectedPlaceId(id)}
      />
    </BottomSheetScrollView>
  );
}
