import { useState } from "react";
import { View } from "react-native";
import CategoryList from "../common/category/CategoryList";
import TripConditionTabBar from "./TripConditionTabBar";
import TripPlacesList from "./TripPlacesList";
type TabType = "지금 많이 찾는 장소" | "좋아요한 장소";
type Props = {
  onSelectPlace?: (place: PopularPlaceType) => void;
};

export default function TripPlacesSection({ onSelectPlace }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");
  const [currentTab, setCurrentTab] = useState<TabType>("지금 많이 찾는 장소");
  return (
    <View className={`flex-col px-5 gap-3`}>
      <TripConditionTabBar currentTab={currentTab} moveToSection={setCurrentTab} />
      <CategoryList selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <TripPlacesList
        onSelectPlace={(place) => {
          onSelectPlace?.(place);
        }}
      />
    </View>
  );
}
