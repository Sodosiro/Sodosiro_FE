import CustomText from "@/components/common/CustomText";
import Spinner from "@/components/common/Spinner";
import { useLikePlacesQuery, usePlacesQuery } from "@/hooks/query/place";
import { spotItemToPlaceType } from "@/util/place/mapper";
import { useState } from "react";
import { View } from "react-native";
import CategoryList from "../common/category/CategoryList";
import TripConditionTabBar from "./TripConditionTabBar";
import TripPlacesList from "./TripPlacesList";

type TabType = "지금 많이 찾는 장소" | "저장한 장소";
type Props = {
  onSelectPlace?: (place: PlaceType) => void;
};

export default function TripConditionPlacesSection({ onSelectPlace }: Props) {
  const [currentTab, setCurrentTab] = useState<TabType>("지금 많이 찾는 장소");
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");

  // 1. 인기 장소 쿼리
  const popularQuery = usePlacesQuery(selectedCategory, "POPULAR", 5);

  // 2. 저장한 장소 쿼리
  const likeQuery = useLikePlacesQuery(selectedCategory, undefined, "RECENT");

  // 3. 현재 탭에 따른 데이터 및 로딩 상태 분기
  const isPopularTab = currentTab === "지금 많이 찾는 장소";
  const isPending = isPopularTab ? popularQuery.isPending : likeQuery.isPending;

  const places = isPopularTab
    ? popularQuery.data?.data.items
    : (likeQuery.data?.pages.flatMap((page) => page.data.content) ?? []);

  // 저장한 장소 탭이면서 데이터가 비어있는지 확인
  const isLikeTabEmpty = !isPopularTab && (!places || places.length === 0);

  return (
    <View className="flex-col px-5 gap-3">
      <TripConditionTabBar
        currentTab={currentTab}
        moveToSection={setCurrentTab}
      />
      <CategoryList
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {isPending ? (
        <View className="justify-center items-center h-91.5">
          <Spinner />
        </View>
      ) : isLikeTabEmpty ? (
        /* 저장한 장소가 없을 때 텍스트 표시 */
        <View className="justify-center items-center h-91.5 gap-2">
          <CustomText font="title">아직 저장한 장소가 없어요.</CustomText>
          <CustomText font="body2" className="text-gray-400">
            마음에 드는 장소를 저장하면 여기에서 선택할 수 있어요.
          </CustomText>
        </View>
      ) : (
        <TripPlacesList
          places={places}
          onSelectPlace={(spot) => onSelectPlace?.(spotItemToPlaceType(spot))}
        />
      )}
    </View>
  );
}
