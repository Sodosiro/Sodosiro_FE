import CustomText from "@/components/common/CustomText";
import { HOME_POPULAR_PLACES } from "@/mocks/places";
import { View } from "react-native";
import PlaceMini from "../../place/PlaceMini";

export default function PopularPlacesList() {
  return (
    <View className={`gap-4 mt-1`}>
      {HOME_POPULAR_PLACES.slice(0, 5).map((place, index) => (
        <View key={index} className={`flex-row items-center justify-between`}>
          <CustomText font="body3" className={`w-4 text-text-muted`}>
            {index + 1}
          </CustomText>
          <PlaceMini
            id={place.id}
            imageUrl={null}
            title={place.title}
            desc={place.desc}
            category={1}
          />
        </View>
      ))}
    </View>
  );
}
