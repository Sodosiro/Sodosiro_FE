import EmptyState from "@/components/common/EmptyState";
import Spinner from "@/components/common/Spinner";
import { usePlacesQuery } from "@/hooks/query/place";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import CategoryList from "../../common/category/CategoryList";
import SectionTitle from "../SectionTitle";
import PopularPlacesList from "./PopularPlacesList";

export default function PopularPlacesSection() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");

  const { data, isPending, isError, refetch } = usePlacesQuery(
    selectedCategory,
    "POPULAR",
    5,
  );

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
      ) : isError ? (
        <View className={`py-10 flex-1`}>
          <EmptyState
            title="장소를 불러오지 못했어요."
            description="네트워크 상태를 확인하고 다시 시도해주세요"
            actionLabel="다시 시도"
            onPressAction={() => refetch()}
          />
        </View>
      ) : (
        <PopularPlacesList places={places} />
      )}
    </View>
  );
}
