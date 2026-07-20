import { View } from "react-native";
import CustomText from "../../common/CustomText";
import { RightIcon } from "@/assets/svgs";
import { useState } from "react";
import CategoryList from "./CategoryList";
import PopularPlacesList from "./PopularPlacesList";
import SectionTitle from "../SectionTitle";

export default function PopularPlacesSection() {

  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");

  return (
    <View className={`flex-col px-5 gap-3`}>
      <SectionTitle title={'지금 많이 찾는 장소'} onPress={() => {}}/>
      <CategoryList selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <PopularPlacesList />
    </View>
  )
}