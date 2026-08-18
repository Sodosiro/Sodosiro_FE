import PlaceMini from "@/components/place/PlaceMini";
import { View } from "react-native";
import RegionSectionContainer from "./RegionSectionContainer";

export default function FeatureSpotSection({
  title,
  featureSpots,
}: {
  title: string;
  featureSpots: {
    contentId: number;
    imageUrl: string;
    title: string;
  }[];
}) {
  return (
    <RegionSectionContainer title={`${title}에서 발견할 수 있는 곳`}>
      <View className={`flex-col flex-1 gap-4`}>
        {featureSpots?.map((featureSpot, index) => (
          <PlaceMini
            key={index}
            id={featureSpot.contentId}
            imageUrl={featureSpot.imageUrl}
            title={featureSpot.title}
            desc={featureSpot.title}
            category={1}
          />
        ))}
      </View>
    </RegionSectionContainer>
  );
}
