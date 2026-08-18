import CategoryList from "@/components/common/category/CategoryList";
import CustomText from "@/components/common/CustomText";
import Header from "@/components/common/Header";
import Spinner from "@/components/common/Spinner";
import PopularPlaceItem from "@/components/home/popularPlace/PopularPlaceItem";
import { usePlacesQuery } from "@/hooks/query/usePlacesQuery";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PopularPlaceScreen() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");

  const { data, isPending } = usePlacesQuery(selectedCategory, "POPULAR");

  const places = data?.data.items;

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <Header title="지금 많이 찾는 장소" />
      <View className={`flex-1 bg-bg w-full`}>
        <View className="pb-2.5 px-5">
          <CategoryList
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </View>
        {isPending ? (
          <View className={`flex-1 justify-center items-center`}>
            <Spinner />
          </View>
        ) : (
          <ScrollView contentContainerClassName="bg-bg px-5">
            {places?.map((place: PlaceType, index: number) => (
              <View
                key={place.contentId}
                className={`flex-row items-center py-3`}
              >
                <CustomText font="body3" className={`min-w-5 text-text-muted`}>
                  {index + 1}
                </CustomText>
                <PopularPlaceItem popularPlace={place} />
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}
