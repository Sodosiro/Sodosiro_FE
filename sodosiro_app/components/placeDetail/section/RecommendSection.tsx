import type { RefObject } from "react";
import type { ViewProps } from "react-native";
import { View } from "react-native";
import PlaceMini from "../../place/PlaceMini";
import PlaceDetailSectionContainer from "./PlaceDetailSectionContainer";

type recommendPlaces = {
  contentId: number;
  title: string;
  category: CategoryNumber;
  addr1: string;
  overview: string;
  firstImage: string;
}[];

interface Props extends ViewProps {
  recommendPlaces: recommendPlaces;
  ref: RefObject<View | null>;
  handlePlaceMini?: (() => void) | ((id: number) => void);
}

export default function RecommendSection({
  recommendPlaces,
  ref,
  handlePlaceMini,
  ...props
}: Props) {
  return (
    <PlaceDetailSectionContainer
      ref={ref}
      title="함께 추천"
      className={`pb-2 gap-3 min-h-100`}
      {...props}
    >
      <View className={`flex-col flex-1 gap-4`}>
        {recommendPlaces?.map((place, index) => (
          <PlaceMini
            key={index}
            id={place.contentId}
            imageUrl={place.firstImage}
            title={place.title}
            desc={place.overview}
            category={place.category}
            onPress={handlePlaceMini ?? undefined}
          />
        ))}
      </View>
    </PlaceDetailSectionContainer>
  );
}
