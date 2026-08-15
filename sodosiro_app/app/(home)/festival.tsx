import AnimatedBadge from "@/components/common/animated/AnimatedBadge";
import Header from "@/components/common/Header";
import Spinner from "@/components/common/Spinner";
import FestivalItem from "@/components/home/festival/FestivalItem";
import { useFestivalsQuery } from "@/hooks/query/useFestivalsQuery";
import { useState } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Schedules = ["ONGOING", "UPCOMING"] as const;

const ScheduleMap = {
  ONGOING: "진행 중",
  UPCOMING: "진행 예정",
};

export default function FestivalPlaceScreen() {
  const [selectedSchedule, setSelectedSchedule] =
    useState<FestivalStatus>("ONGOING");

  const { data, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFestivalsQuery(undefined, selectedSchedule, 20);

  const festivals = data?.pages.flatMap((page) => page.data.items) ?? [];

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <Header title="다가오는 강원 축제" />

      <View className="bg-bg flex-1">
        {/* 필터 */}
        <View className="pb-2">
          <FlatList
            horizontal
            data={Schedules}
            keyExtractor={(item) => item}
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="px-5 gap-1"
            renderItem={({ item }) => (
              <AnimatedBadge
                title={ScheduleMap[item]}
                isSelected={item === selectedSchedule}
                onPress={() => setSelectedSchedule(item)}
              />
            )}
          />
        </View>
        {isPending ? (
          <View className="flex-1 justify-center items-center">
            <Spinner />
          </View>
        ) : (
          <FlatList
            data={festivals}
            keyExtractor={(item) => String(item.festivalId)}
            renderItem={({ item }) => <FestivalItem festival={item} />}
            contentContainerClassName="px-5 py-2 gap-4"
            onEndReached={() => {
              if (hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
              }
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              isFetchingNextPage ? (
                <View className="py-4">
                  <Spinner />
                </View>
              ) : null
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}
