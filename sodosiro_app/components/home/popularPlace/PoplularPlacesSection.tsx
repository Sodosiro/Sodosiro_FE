import { useState } from "react";
import { View } from "react-native";
import CategoryList from "../../common/CategoryList";
import SectionTitle from "../SectionTitle";
import PopularPlacesList from "./PopularPlacesList";

export default function PopularPlacesSection() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");

  return (
    <View className={`flex-col px-5 gap-3`}>
      <SectionTitle title={"지금 많이 찾는 장소"} onPress={() => {}} />
      <CategoryList
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <PopularPlacesList />
    </View>
  );
}
