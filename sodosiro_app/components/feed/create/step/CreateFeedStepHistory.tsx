import CustomText from "@/components/common/CustomText";
import Spinner from "@/components/common/Spinner";
import TripHistoryItem from "@/components/feed/create/TripHistoryItem";
import { FlatList, View } from "react-native";

export default function CreateFeedStepHistory({
  courses,
  selectedCourseId,
  setSelectedCourseId,
  isPending,
}: {
  courses: CourseType[];
  selectedCourseId: number | undefined;
  setSelectedCourseId: React.Dispatch<React.SetStateAction<number | undefined>>;
  isPending: boolean;
}) {
  return isPending ? (
    <View className={`flex-1 items-center justify-center`}>
      <Spinner />
    </View>
  ) : (
    <FlatList
      className="px-5 py-3"
      data={courses}
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
          selectedCourseId={selectedCourseId}
          setSelectedCourseId={setSelectedCourseId}
        />
      )}
    />
  );
}
