import CustomText from "@/components/common/CustomText";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { View } from "react-native";
import PlaceItem from "./PlaceItem";

export default function SearchPlacesContent({
  places,
  handlePlaceItemPress,
  handleLike,
}: {
  places: PlaceType[] | null;
  handlePlaceItemPress: (placeId: number) => void;
  handleLike: (contentId: number) => Promise<void>;
}) {
  return places?.length ? (
    <BottomSheetFlatList
      data={places}
      nestedScrollEnabled
      keyExtractor={(item) => String(item.contentId)}
      contentContainerStyle={{
        paddingBottom: 10,
      }}
      getItemLayout={(_, index) => ({
        length: 100,
        offset: 100 * index,
        index,
      })}
      renderItem={({ item, index }) => (
        <View style={{ height: 100 }}>
          <PlaceItem
            place={item}
            onPress={handlePlaceItemPress}
            handleLike={handleLike}
          />

          {index !== places.length - 1 && (
            <View className="h-px bg-bg-subtle mx-5" />
          )}
        </View>
      )}
    />
  ) : (
    places !== null && (
      <View className="w-full h-full items-center justify-center">
        <CustomText font="body1" className="text-text-muted">
          검색 결과가 없습니다.
        </CustomText>
      </View>
    )
  );
}
