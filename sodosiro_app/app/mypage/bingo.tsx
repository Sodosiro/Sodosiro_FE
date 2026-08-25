import Header from "@/components/common/Header";
import BingoAdvantage from "@/components/mypage/bingo/BingoAdventage";
import BingoBoard from "@/components/mypage/bingo/BingoBoard";
import BingoEmpty from "@/components/mypage/bingo/BingoEmpty";
import BingoSeasonPicker from "@/components/mypage/bingo/BingoSeasonPicker";
import RegionList from "@/components/mypage/bingo/RegionList";
import { SODOSI_LIST } from "@/constants/Sodosi";
import { BINGO_ITEMS } from "@/mocks/bingo";
import { getBingoResult } from "@/util/bingo/getBingoResult";
import { useMemo, useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BingoScreen() {
  const regionList = SODOSI_LIST.map((item) => item.name);

  const [selectedRegion, setSelectedRegion] = useState<string>(regionList[0]);

  const bingoResult = useMemo(
    () => (BINGO_ITEMS ? getBingoResult(BINGO_ITEMS) : null),
    [BINGO_ITEMS],
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Header title="소도시 빙고" />
      {BINGO_ITEMS.length > 0 ? (
        <>
          <RegionList
            regionList={regionList}
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
          />
          <ScrollView
            contentContainerClassName={`gap-6 py-3 px-5 justify-start`}
          >
            <BingoSeasonPicker />
            <BingoBoard bingoItems={BINGO_ITEMS} bingoResult={bingoResult} />
            <BingoAdvantage comingSoon />
          </ScrollView>
        </>
      ) : (
        <BingoEmpty />
      )}
    </SafeAreaView>
  );
}
