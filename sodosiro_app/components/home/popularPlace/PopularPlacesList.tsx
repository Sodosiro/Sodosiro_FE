import { View } from "react-native";
import { HomePopularPlaces } from "@/mocks/places";
import PlaceMini from "../../place/PlaceMini";
import CustomText from "@/components/common/CustomText";

export default function PopularPlacesList() {
  return (
    <View className={`gap-4 mt-1`}>
      {HomePopularPlaces.map((place, index) => (
        <View className={`flex-row items-center justify-between`}>
          <CustomText font="body3" className={`w-4 text-text-muted`}>
            {index + 1}
          </CustomText>
          <PlaceMini
            key={place.id}
            imageSource={place.imageSource}
            title={place.title}
            desc={place.desc}
          />
        </View>
      ))}
    </View>
  );
}
