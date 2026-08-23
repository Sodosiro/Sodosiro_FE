import { PlusIcon } from "@/assets/svgs";

import { View } from "react-native";
import TripPlaceMini from "../place/TripPlaceMini";
type Props = {
  onSelectPlace?: (place: PlaceType) => void;
  places: PlaceType[];
};

export default function TripPlacesList({ places, onSelectPlace }: Props) {
  const handleSelect = (place: PlaceType) => {
    onSelectPlace?.(place);
  };
  return (
    <View className={`gap-4 mt-1`}>
      {places?.map((place, index) => (
        <View key={index} className={`flex-row items-center justify-between`}>
          <TripPlaceMini
            id={place.contentId}
            imageUrl={place.firstImage}
            title={place.title}
            desc={place.overview}
            category={place.category}
            avgRating={place.avgRating}
            icon={<PlusIcon color={"#7E9432"} />}
            onPress={() => handleSelect(place)}
          />
        </View>
      ))}
    </View>
  );
}
