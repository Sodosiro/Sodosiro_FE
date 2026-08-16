import CustomText from "@/components/common/CustomText";
import TripHistoryPlaceItem from "@/components/feed/create/TripHistoryPlaceItem";
import { TRIP_HISTORY_PLACES } from "@/mocks/feed";
import { FlatList, View } from "react-native";

export default function CreateFeedStepPlace({
  selectedPlace,
  setSelectedPlace,
}: {
  selectedPlace: TripHistoryPlaceType | null;
  setSelectedPlace: React.Dispatch<
    React.SetStateAction<TripHistoryPlaceType | null>
  >;
}) {
  return (
    <FlatList
      className="px-5 py-3"
      data={TRIP_HISTORY_PLACES}
      ListHeaderComponent={
        <CustomText font="heading2">어떤 곳을 남길까요?</CustomText>
      }
      ListHeaderComponentStyle={{
        marginBottom: 16,
      }}
      ItemSeparatorComponent={() => <View className="h-2" />}
      renderItem={({ item }) => (
        <TripHistoryPlaceItem
          place={item}
          selectedPlace={selectedPlace}
          setSelectedPlace={setSelectedPlace}
        />
      )}
    />
  );
}
