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
  sigunguCode: string;
  sigunguName: string;
};

export default function TripConditionPlacesSection({
  onSelectPlace,
  sigunguCode,
  sigunguName,
}: Props) {
  const [currentTab, setCurrentTab] = useState<TabType>("지금 많이 찾는 장소");
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");

  const popularQuery = usePlacesQuery(selectedCategory, "POPULAR", 5);
  // const popularQuery = usePlacesQuery(selectedCategory, "POPULAR", 5, sigunguCode); // 시군구 코드로 조회시 검색결과가 적음.
  const likeQuery = useLikePlacesQuery(selectedCategory, undefined, "RECENT");

  const isPopularTab = currentTab === "지금 많이 찾는 장소";
  const isPending = isPopularTab ? popularQuery.isPending : likeQuery.isPending;

  const places = isPopularTab
    ? popularQuery.data?.data.items
    : (likeQuery.data?.pages.flatMap((page) => page.data.content) ?? []);

  const isLikeTabEmpty = !isPopularTab && (!places || places.length === 0);

  console.log("popularQuery", popularQuery.data?.data.items);

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
          onSelectPlace={(spot) => onSelectPlace?.(spotItemToPlaceType(spot))}
        />
      )}
    </View>
  );
}
