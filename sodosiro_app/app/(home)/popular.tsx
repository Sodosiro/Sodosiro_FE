import CategoryList from "@/components/common/category/CategoryList";
import CustomText from "@/components/common/CustomText";
import Header from "@/components/common/Header";
import PopularPlaceItem from "@/components/home/popularPlace/PopularPlaceItem";
import { HOME_POPULAR_PLACES } from "@/mocks/places";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PopularPlaceScreen() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");
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
        <ScrollView contentContainerClassName="bg-bg px-5">
          {HOME_POPULAR_PLACES.map((popularPlace, index) => (
            <View
              key={popularPlace.id}
              className={`flex-row items-center py-3`}
            >
              <CustomText font="body3" className={`w-5 text-text-muted`}>
                {index + 1}
              </CustomText>
              <PopularPlaceItem popularPlace={popularPlace} />
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
