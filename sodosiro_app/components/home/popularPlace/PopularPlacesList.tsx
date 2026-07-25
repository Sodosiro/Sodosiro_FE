import CustomText from "@/components/common/CustomText";
import { HOME_POPULAR_PLACES } from "@/mocks/places";
import { View } from "react-native";
import PlaceMini from "../../common/place/PlaceMini";

export default function PopularPlacesList() {
  return (
    <View className={`gap-4 mt-1`}>
      {HOME_POPULAR_PLACES.map((place, index) => (
        <View key={index} className={`flex-row items-center justify-between`}>
          <CustomText font="body3" className={`w-4 text-text-muted`}>
            {index + 1}
          </CustomText>
          <PlaceMini
            imageSource={place.imageSource}
            title={place.title}
            desc={place.desc}
          />
        </View>
      ))}
    </View>
  );
}
