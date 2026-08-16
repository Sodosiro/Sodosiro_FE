import CustomText from "@/components/common/CustomText";
import TripHistoryItem from "@/components/feed/create/TripHistoryItem";
import { TRIP_HISTORY } from "@/mocks/feed";
import { FlatList, View } from "react-native";

export default function CreateFeedStepHistory({
  selectedHistoryId,
  setSelectedHistoryId,
}: {
  selectedHistoryId: number | null;
  setSelectedHistoryId: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  return (
    <FlatList
      className="px-5 py-3"
      data={TRIP_HISTORY}
      ListHeaderComponent={
        <CustomText font="heading2">어떤 여행의 기록을 남길까요?</CustomText>
      }
      ListHeaderComponentStyle={{
        marginBottom: 16,
      }}
      ItemSeparatorComponent={() => <View className="h-2" />}
      renderItem={({ item }) => (
        <TripHistoryItem
          historyItem={item}
          selectedHistoryId={selectedHistoryId}
          setSelectedHistoryId={setSelectedHistoryId}
        />
      )}
    />
  );
}
