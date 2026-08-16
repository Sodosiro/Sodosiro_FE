import CustomText from "@/components/common/CustomText";
import { View } from "react-native";
import PlaceMini from "../../place/PlaceMini";

export default function PopularPlacesList({ places }: { places: PlaceType[] }) {
  return (
    <View className={`gap-4 mt-1`}>
      {places?.map((place, index) => (
        <View key={index} className={`flex-row items-center justify-between`}>
          <CustomText font="body3" className={`w-4 text-text-muted`}>
            {index + 1}
          </CustomText>
          <PlaceMini
            id={place.contentId}
            imageUrl={place.firstImage}
            title={place.title}
            desc={place.overview}
            category={place.category}
          />
        </View>
      ))}
    </View>
  );
}
