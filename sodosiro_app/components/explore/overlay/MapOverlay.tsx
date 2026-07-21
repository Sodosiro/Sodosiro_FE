import { View } from "react-native";
import SearchBar from "./SearchBar";
import CategoryList from "../../common/CategoryList";
import PlaceLegend from "./PlaceLegend";
import ClearSearchButton from "./ClearSearchButton";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function MapOverlay() {
  const { keyword: param } = useLocalSearchParams<{
    keyword?: string;
  }>();

  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");

  return (
    <View className={`flex-1`}>
      <View>
        <View className={`px-5 py-3`}>
          <SearchBar keyword={param} />
        </View>
        <CategoryList
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          paddingHorizontal={20}
        />
      </View>

      <View className={`flex-1`}>
        <PlaceLegend className={`absolute bottom-7 left-5`} />
        {param && (
          <ClearSearchButton
            className={`absolute bottom-7 self-center`}
            onPress={() => router.push("/(tabs)/explore")}
          />
        )}
      </View>
    </View>
  );
}
