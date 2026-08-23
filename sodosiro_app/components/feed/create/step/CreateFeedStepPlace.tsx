import CustomText from "@/components/common/CustomText";
import Spinner from "@/components/common/Spinner";
import TripHistoryPlaceItem from "@/components/feed/create/TripHistoryPlaceItem";
import { FlatList, View } from "react-native";

export default function CreateFeedStepPlace({
  places,
  selectedPlace,
  setSelectedPlace,
  isPending,
}: {
  places: TripSpotType[];
  selectedPlace: TripSpotType | null;
  setSelectedPlace: React.Dispatch<React.SetStateAction<TripSpotType | null>>;
  isPending: boolean;
}) {
  return isPending ? (
    <View className={`flex-1 justify-center items-center`}>
      <Spinner />
    </View>
  ) : (
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
