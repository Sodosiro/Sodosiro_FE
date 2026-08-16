import Spinner from "@/components/common/Spinner";
import { usePlacesQuery } from "@/hooks/query/usePlacesQuery";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import CategoryList from "../../common/category/CategoryList";
import SectionTitle from "../SectionTitle";
import PopularPlacesList from "./PopularPlacesList";

export default function PopularPlacesSection() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");

  const { data, isPending } = usePlacesQuery(selectedCategory, "POPULAR", 5);

  const places = data?.data.items;

  return (
    <View className={`flex-col px-5 gap-3`}>
      <SectionTitle
        title={"지금 많이 찾는 장소"}
        onPress={() => {
          router.push("/(home)/popular");
        }}
      />
      <CategoryList
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      {isPending ? (
        <View className={`justify-center items-center h-91.5`}>
          <Spinner />
        </View>
      ) : (
        <PopularPlacesList places={places} />
      )}
    </View>
  );
}
