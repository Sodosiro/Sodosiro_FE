import CategoryList from "@/components/common/category/CategoryList";
import CustomText from "@/components/common/CustomText";
import Header from "@/components/common/Header";
import Spinner from "@/components/common/Spinner";
import PopularPlaceItem from "@/components/home/popularPlace/PopularPlaceItem";
import { usePlacesQuery } from "@/hooks/query/place";
import { useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

export default function PopularPlaceScreen() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");

  const { data, isPending } = usePlacesQuery(selectedCategory, "POPULAR");

  const places = data?.data.items;

  const [contentHeight, setContentHeight] = useState(0);

  const handleLayout = (event: LayoutChangeEvent) => {
    setContentHeight(event.nativeEvent.layout.height);
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Header title="지금 많이 찾는 장소" />
      <View className={`flex-1 bg-bg w-full`}>
        <View className="pb-2.5 px-5">
          <CategoryList
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </View>
        <PopularPlaceItem onLayout={handleLayout} />
        {isPending || contentHeight === 0 ? (
          <View className={`flex-1 justify-center items-center`}>
            <Spinner />
          </View>
        ) : (
          <FlatList
            data={places}
            keyExtractor={(item) => String(item.contentId)}
            contentContainerClassName="bg-bg px-5"
            renderItem={({ item, index }) => (
              <View className="flex-row items-center py-3">
                <CustomText font="body3" className="min-w-5 text-text-muted">
                  {index + 1}
                </CustomText>

                <PopularPlaceItem
                  popularPlace={item}
                  contentHeight={contentHeight}
                />
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
}
