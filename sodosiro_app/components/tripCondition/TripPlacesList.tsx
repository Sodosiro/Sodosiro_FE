import { SpotItem } from "@/api/course";
import { PlusIcon } from "@/assets/svgs";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { View } from "react-native";
import TripPlaceMini from "../place/TripPlaceMini";

type Props = {
  onSelectPlace?: (place: SpotItem) => void;
  places: SpotItem[];
  sigunguName?: string;
};

export default function TripPlacesList({
  places,
  onSelectPlace,
  sigunguName,
}: Props) {
  const handleSelect = (place: SpotItem) => {
    onSelectPlace?.(place);
  };

  return (
    <BottomSheetFlatList
      data={places}
      keyExtractor={(item, index) => String(item.contentId ?? index)}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 12 }}
      ItemSeparatorComponent={() => <View className="h-4" />}
      renderItem={({ item: place }) => (
        <View className="flex-row items-center justify-between">
          <TripPlaceMini
            id={place.contentId}
            imageUrl={place.firstImage}
            title={place.title}
            desc={place.overview}
            category={place.category}
            avgRating={place.avgRating}
            rankTag={place?.popularity?.rankTag}
            icon={<PlusIcon color={"#7E9432"} />}
            disabled={Boolean(
              sigunguName && !place?.region?.includes(sigunguName),
            )}
            onPress={() => handleSelect(place)}
          />
        </View>
      )}
    />
  );
}
