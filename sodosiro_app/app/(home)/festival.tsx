import AnimatedBadge from "@/components/common/animated/AnimatedBadge";
import EmptyState from "@/components/common/EmptyState";
import Header from "@/components/common/Header";
import Spinner from "@/components/common/Spinner";
import WheelPicker from "@/components/common/WheelPicker";
import FestivalBottomSheetModal from "@/components/home/festival/FestivalBottomSheetModal";
import FestivalItem from "@/components/home/festival/FestivalItem";
import { SODOSI_LIST } from "@/constants/Sodosi";
import { useFestivalsQuery } from "@/hooks/query/festival";
import { getSigunguId } from "@/util/region/region";
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

  const [selectedRegion, setSelectedRegion] = useState<string>("전체");
  const [festivalItemHeight, setFestivalItemHeight] = useState(0);

  const {
    data,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    refetch,
  } = useFestivalsQuery(
    undefined,
    getSigunguId(selectedRegion),
    selectedSchedule,
    20,
  );

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
          <View className={`pt-4 px-5`}>
            <WheelPicker
              title={"지역 선택"}
              values={["전체", ...SODOSI_LIST.map((sodosi) => sodosi.name)]}
              selectedValue={selectedRegion}
              setSelectedValue={setSelectedRegion}
              isPending={false}
            />
          </View>
        </View>
        <FestivalItem onLayout={handleMeasure} />
        {isPending || festivalItemHeight === 0 ? (
          <View className="flex-1 justify-center items-center">
            <Spinner />
          </View>
        ) : isError ? (
          <EmptyState
            title="축제를 불러오지 못했어요."
            description="네트워크 상태를 확인하고 다시 시도해주세요"
            actionLabel="다시 시도"
            onPressAction={() => refetch()}
          />
        ) : festivals.length > 0 ? (
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
        ) : (
          <View className={`flex-1 justify-center items-center pb-20`}>
            <EmptyState
              title={`${ScheduleMap[selectedSchedule as "ONGOING" | "UPCOMING"]}인 축제가 없어요.`}
              description="다른 지역을 선택해주세요."
            />
          </View>
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
