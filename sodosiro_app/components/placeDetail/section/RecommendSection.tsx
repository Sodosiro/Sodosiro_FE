import type { RefObject } from "react";
import type { ViewProps } from "react-native";
import { View } from "react-native";
import PlaceMini from "../../place/PlaceMini";
import PlaceDetailSectionContainer from "./PlaceDetailSectionContainer";

type recommendPlaces = {
  id: number;
  imageSource: any;
  title: string;
  desc: string;
}[];

interface Props extends ViewProps {
  recommendPlaces: recommendPlaces;
  ref: RefObject<View | null>;
}

export default function RecommedSection({
  recommendPlaces,
  ref,
  ...props
}: Props) {
  return (
    <PlaceDetailSectionContainer
      ref={ref}
      title="함께 추천"
      className={`pb-8 gap-3`}
      {...props}
    >
      <View className={`flex-col flex-1 gap-4`}>
        {recommendPlaces.map((attraction, index) => (
          <PlaceMini
            key={index}
            id={attraction.id}
            imageUrl={null}
            title={attraction.title}
            desc={attraction.desc}
            category={1}
          />
        ))}
      </View>
    </PlaceDetailSectionContainer>
  );
}
