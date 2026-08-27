import { SpotItem } from "@/api/course";
import CustomText from "@/components/common/CustomText";
import Spinner from "@/components/common/Spinner";
import { useLikePlacesQuery, usePlacesQuery } from "@/hooks/query/place";
import { spotItemToPlaceType } from "@/util/place/mapper";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetSpringConfigs,
  type BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { useCallback, useState, type RefObject } from "react";
import { View } from "react-native";
import TripConditionTabBar from "../TripConditionTabBar";
import TripPlacesList from "../TripPlacesList";
import CategoryList from "./CategoryList";

type TabType = "지금 많이 찾는 장소" | "저장한 장소";

type Props = {
  bottomSheetRef: RefObject<BottomSheetModal | null>;
  onSelectPlace?: (place: PlaceType) => void;
  sigunguCode: string;
  sigunguName: string;
};

export default function PlaceListBottomSheet({
  bottomSheetRef,
  onSelectPlace,
  sigunguCode,
  sigunguName,
}: Props) {
  const [currentTab, setCurrentTab] = useState<TabType>("지금 많이 찾는 장소");
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");

  const popularQuery = usePlacesQuery(selectedCategory, "POPULAR");
  const likeQuery = useLikePlacesQuery(selectedCategory, undefined, "RECENT");

  const isPopularTab = currentTab === "지금 많이 찾는 장소";
  const isPending = isPopularTab ? popularQuery.isPending : likeQuery.isPending;

  const places = isPopularTab
    ? popularQuery.data?.data.items
    : (likeQuery.data?.pages.flatMap((page) => page.data.content) ?? []);

  const isLikeTabEmpty = !isPopularTab && (!places || places.length === 0);

  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 100,
    stiffness: 400,
    mass: 1,
  });

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.5}
      />
    ),
    [],
  );

  const handlePlaceSelect = (spot: SpotItem) => {
    onSelectPlace?.(spotItemToPlaceType(spot));
    bottomSheetRef.current?.dismiss();
  };

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={[520]} // 520px 고정
      backdropComponent={renderBackdrop}
      animationConfigs={animationConfigs}
      backgroundStyle={{ backgroundColor: "white" }}
      handleIndicatorStyle={{
        backgroundColor: "#E6E6E6",
        width: 50,
        height: 5,
      }}
      enablePanDownToClose={true}
      enableDynamicSizing={false} // ★ 컨텐츠 크기에 따른 동적 확장 방지
    >
      {/* 일반 View로 레이아웃 구성 (h-full 사용) */}
      <View className="h-full px-5 pt-2 pb-6 flex-col">
        {/* 상단 헤더 & 카테고리 (자연스러운 간격 gap-3) */}
        <View className="gap-3 mb-3">
          <TripConditionTabBar
            currentTab={currentTab}
            moveToSection={setCurrentTab}
          />
          <CategoryList
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </View>

        {/* 하단 스크롤/상태 영역 (남은 공간을 모두 사용하되 과도한 여백이 생기지 않도록 처리) */}
        <View className="flex-1 min-h-0">
          {isPending ? (
            <View className="flex-1 justify-center items-center">
              <Spinner />
            </View>
          ) : isLikeTabEmpty ? (
            <View className="flex-1 justify-center items-center gap-2">
              <CustomText font="title">아직 저장한 장소가 없어요.</CustomText>
              <CustomText
                font="body2"
                className="text-gray-400"
              >
                마음에 드는 장소를 저장하면 여기에서 선택할 수 있어요.
              </CustomText>
            </View>
          ) : (
            <TripPlacesList
              places={places}
              sigunguName={sigunguName}
              onSelectPlace={handlePlaceSelect}
            />
          )}
        </View>
      </View>
    </BottomSheetModal>
  );
}
