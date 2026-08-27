import AnimatedBadge from "@/components/common/animated/AnimatedBadge";
import Header from "@/components/common/Header";
import Spinner from "@/components/common/Spinner";
import FestivalBottomSheetModal from "@/components/home/festival/FestivalBottomSheetModal";
import FestivalItem from "@/components/home/festival/FestivalItem";
import EmptyState from "@/components/trip/EmptyState";
import { useFestivalsQuery } from "@/hooks/query/festival";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useEffect, useRef, useState } from "react";
import { FlatList, LayoutChangeEvent, View } from "react-native";

const Schedules = ["ONGOING", "UPCOMING"] as const;

const ScheduleMap = {
  ONGOING: "진행 중",
  UPCOMING: "진행 예정",
};

export default function FestivalScreen() {
  const [selectedSchedule, setSelectedSchedule] =
    useState<FestivalStatus>("ONGOING");

  const [selectedFestival, setSelectedFestival] = useState<FestivalType | null>(
    null,
  );

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const {
    data,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    refetch,
  } = useFestivalsQuery(undefined, selectedSchedule, 20);

  const [festivalItemHeight, setFestivalItemHeight] = useState(0);

  const handleMeasure = (event: LayoutChangeEvent) => {
    setFestivalItemHeight(event.nativeEvent.layout.height);
  };

  const festivals = data?.pages.flatMap((page) => page.data.items) ?? [];

  const handleFestivalPress = (festival: FestivalType) => {
    setSelectedFestival(festival);
  };

  const onClose = () => {
    setSelectedFestival(null);
  };

  useEffect(() => {
    if (!selectedFestival) return;

    bottomSheetModalRef.current?.present();
  }, [selectedFestival]);

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
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
        <FestivalItem onLayout={handleMeasure} />
        {isPending || festivalItemHeight === 0 ? (
          <View className="flex-1 justify-center items-center">
            <Spinner />
          </View>
        ) : !isError ? (
          <EmptyState
            title="축제를 불러오지 못했어요."
            description="네트워크 상태를 확인하고 다시 시도해주세요"
            actionLabel="다시 시도"
            onPressAction={() => refetch()}
          />
        ) : (
          <FlatList
            data={festivals}
            keyExtractor={(item) => String(item.festivalId)}
            renderItem={({ item }) => (
              <FestivalItem
                festival={item}
                onPress={() => handleFestivalPress(item)}
                contentHeight={festivalItemHeight}
              />
            )}
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
      <FestivalBottomSheetModal
        ref={bottomSheetModalRef}
        festival={selectedFestival}
        onClose={onClose}
      />
    </View>
  );
}
