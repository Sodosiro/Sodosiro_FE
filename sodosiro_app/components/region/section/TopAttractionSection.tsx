import PlaceMini from "@/components/common/place/PlaceMini";
import { View } from "react-native";
import RegionSectionContainer from "./RegionSectionContainer";

export default function TopAttractionSection({
  title,
  topAttractions,
}: {
  title: string;
  topAttractions: {
    imageUrl: string;
    title: string;
    desc: string;
  }[];
}) {
  return (
    <RegionSectionContainer title={`${title}의 대표 명소`}>
      <View className={`flex-col flex-1 gap-3`}>
        {topAttractions.map((attraction, index) => (
          <PlaceMini
            key={index}
            imageSource={attraction.imageUrl}
            title={attraction.title}
            desc={attraction.desc}
          />
        ))}
      </View>
    </RegionSectionContainer>
  );
}
