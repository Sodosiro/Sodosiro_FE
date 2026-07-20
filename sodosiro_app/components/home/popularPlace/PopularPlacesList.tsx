import { View } from "react-native";
import { HomePopularPlaces } from "@/mocks/places";
import PopularPlace from "./PopularPlace";

export default function PopularPlacesList() {
  return (
    <View className={`gap-4 mt-1`}>
      {HomePopularPlaces.map((place, index) => (
        <PopularPlace
          key={place.id}
          id={place.id} 
          index={index} 
          imageSource={place.imageSource} 
          title={place.title} 
          desc={place.desc} />
      ))}
    </View>
  )
}