import { PlusIcon } from "@/assets/svgs";

import { SpotItem } from "@/api/course";
import { View } from "react-native";
import TripPlaceMini from "../place/TripPlaceMini";
type Props = {
  onSelectPlace?: (place: SpotItem) => void;
  places: SpotItem[];
  sigunguName: string;
};

export default function TripPlacesList({ places, onSelectPlace, sigunguName }: Props) {
  const handleSelect = (place: SpotItem) => {
    onSelectPlace?.(place);
  };
  return (
    <View className={`gap-4 mt-1`}>
      {places?.map((place, index) => (
        <View
          key={index}
          className={`flex-row items-center justify-between`}
        >
          <TripPlaceMini
            id={place.contentId}
            imageUrl={place.firstImage}
            title={place.title}
            desc={place.overview}
            category={place.category}
            avgRating={place.avgRating}
            rankTag={place?.popularity?.rankTag}
            icon={<PlusIcon color={"#7E9432"} />}
            disabled={Boolean(sigunguName && !place.region.includes(sigunguName))}
            onPress={() => handleSelect(place)}
          />
        </View>
      ))}
    </View>
  );
}
