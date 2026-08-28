import EmptyState from "@/components/common/EmptyState";
import Header from "@/components/common/Header";
import Spinner from "@/components/common/Spinner";
import BingoAdvantage from "@/components/mypage/bingo/BingoAdventage";
import BingoBoard from "@/components/mypage/bingo/BingoBoard";
import BingoEmpty from "@/components/mypage/bingo/BingoEmpty";
import BingoSeasonPicker from "@/components/mypage/bingo/BingoSeasonPicker";
import RegionList from "@/components/mypage/bingo/RegionList";
import { SODOSI_LIST } from "@/constants/Sodosi";
import { useBingoQuery, useBingoSeasonsQuery } from "@/hooks/query/bingo";
import { getBingoResult } from "@/util/bingo/getBingoResult";
import { useEffect, useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BingoScreen() {
  const [selectedRegion, setSelectedRegion] = useState<SodosiType>(
    SODOSI_LIST[0],
  );

  const {
    data: bingoSeasonsData,
    isPending: isBingoSeasonsPending,
    isError: isBingoSeasonsError,
    refetch: bingoSeasonRefetch,
  } = useBingoSeasonsQuery();

  const bingoSeasons = bingoSeasonsData?.data ?? {};

  const [selectedSeason, setSelectedSeason] = useState<BingoSeasonType>(
    bingoSeasons[0],
  );

  const {
    data: bingoData,
    isPending: isBingoPending,
    isError: isBingoError,
  } = useBingoQuery(
    selectedRegion.sigunguId,
    selectedSeason?.year,
    selectedSeason?.seasonType,
  );

  const bingoItems = bingoData?.data.cells ?? [];

  const bingoResult = useMemo(
    () => (bingoItems ? getBingoResult(bingoItems) : null),
    [bingoItems],
  );

  useEffect(() => {
    setSelectedSeason(bingoSeasons[0]);
  }, [bingoSeasonsData]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Header title="소도시 빙고" />
      {isBingoSeasonsPending ? (
        <View className={`flex-1 justify-center items-center`}>
          <Spinner />
        </View>
      ) : isBingoSeasonsError || isBingoError ? (
        <EmptyState
          title="빙고를 불러오지 못했어요."
          description="네트워크 상태를 확인하고 다시 시도해주세요."
          actionLabel="다시 시도"
          onPressAction={() => bingoSeasonRefetch()}
        />
      ) : bingoSeasons?.length > 0 ? (
        <>
          <RegionList
            regionList={SODOSI_LIST}
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
          />
          <ScrollView
            contentContainerClassName={`gap-6 py-3 px-5 justify-start`}
          >
            <BingoSeasonPicker
              bingoSeasons={bingoSeasons}
              selectedSeason={selectedSeason}
              setSelectedSeason={setSelectedSeason}
              isPending={isBingoSeasonsPending}
            />
            <BingoBoard
              bingoItems={bingoItems}
              bingoResult={bingoResult}
              isPending={isBingoPending}
              bingoStatus={selectedSeason?.status}
              selectedSeason={selectedSeason}
            />
            <BingoAdvantage comingSoon />
          </ScrollView>
        </>
      ) : (
        <BingoEmpty />
      )}
    </SafeAreaView>
  );
}
