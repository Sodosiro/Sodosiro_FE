import { PlusIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import { TRIP_POPULAR_PLACES } from "@/mocks/places";
import { View } from "react-native";
import PlaceMini from "../place/PlaceMini";

type Props = {
  onSelectPlace?: (place: PopularPlaceType) => void;
};

export default function TripPlacesList({ onSelectPlace }: Props) {
  const handleSelect = (place: PopularPlaceType) => {
    onSelectPlace?.(place);
  };
  return (
    <View className={`gap-4 mt-1`}>
      {TRIP_POPULAR_PLACES.slice(0, 5).map((place, index) => (
        <View key={index} className={`flex-row items-center justify-between`}>
          <CustomText font="body3" className={`w-4 text-text-muted`}>
            {index + 1}
          </CustomText>
          <PlaceMini
            id={place.id}
            imageSource={place.imageSource}
            title={place.title}
            desc={place.desc}
            icon={<PlusIcon color={"#7E9432"} />}
            onPress={() => handleSelect(place)}
          />
        </View>
      ))}
    </View>
  );
}
