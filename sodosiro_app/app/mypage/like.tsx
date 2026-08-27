import EmptyState from "@/components/common/EmptyState";
import Header from "@/components/common/Header";
import Spinner from "@/components/common/Spinner";
import LikeFilter from "@/components/mypage/like/LikeFilter";
import LikeList from "@/components/mypage/like/LikeList";
import { useLikePlacesQuery } from "@/hooks/query/place";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LikeListScreen() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");
  const [sortOption, setSortOption] = useState<SortType>("RECENT");

  const {
    data,
    isPending,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isError,
    refetch,
  } = useLikePlacesQuery(selectedCategory, undefined, sortOption);

  const places = data?.pages.flatMap((page) => page.data.content) ?? [];
  const totalCount = data?.pages[0].data.totalCount ?? 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Header title="저장한 장소" />
      <LikeFilter
        sortOption={sortOption}
        setSortOption={setSortOption}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      {isPending ? (
        <View className={`flex-1 justify-center items-center`}>
          <Spinner />
        </View>
      ) : isError ? (
        <EmptyState
          title="저장한 장소를 불러오지 못했어요."
          description="네트워크 상태를 확인하고 다시 시도해주세요."
          actionLabel="다시 시도"
          onPressAction={() => refetch()}
        />
      ) : (
        <LikeList
          totalCount={totalCount}
          places={places}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      )}
    </SafeAreaView>
  );
}
