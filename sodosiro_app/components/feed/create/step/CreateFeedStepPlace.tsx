import CustomText from "@/components/common/CustomText";
import TripHistoryPlaceItem from "@/components/feed/create/TripHistoryPlaceItem";
import { FlatList, View } from "react-native";

export default function CreateFeedStepPlace({
  places,
  selectedPlace,
  setSelectedPlace,
}: {
  places: TripSpotType[];
  selectedPlace: TripSpotType | null;
  setSelectedPlace: React.Dispatch<React.SetStateAction<TripSpotType | null>>;
}) {
  return (
    <FlatList
      className="px-5 py-3"
      data={places}
      ListHeaderComponent={
        <CustomText font="heading2">어떤 곳을 남길까요?</CustomText>
      }
      ListHeaderComponentStyle={{
        marginBottom: 16,
      }}
      ItemSeparatorComponent={() => <View className="h-2" />}
      renderItem={({ item }) =>
        !item.alreadyPosted ? (
          <TripHistoryPlaceItem
            place={item}
            selectedPlace={selectedPlace}
            setSelectedPlace={setSelectedPlace}
          />
        ) : null
      }
    />
  );
}
