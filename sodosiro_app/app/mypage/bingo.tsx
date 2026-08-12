import BingoAdvantage from "@/components/bingo/BingoAdventage";
import BingoBoard from "@/components/bingo/BingoBoard";
import BingoEmpty from "@/components/bingo/BingoEmpty";
import BingoTitle from "@/components/bingo/BingoTitle";
import RegionList from "@/components/bingo/RegionList";
import Header from "@/components/common/Header";
import { BINGO_LIST } from "@/mocks/bingo";
import { getBingoResult } from "@/util/bingo/getBingoResult";
import { useMemo, useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BingoScreen() {
  const regionList = BINGO_LIST.map((item) => item.region);
  const [selectedRegion, setSelectedRegion] = useState<string>(regionList[0]);
  const bingo = useMemo(
    () => BINGO_LIST.find((item) => item.region === selectedRegion),
    [selectedRegion],
  );

  const bingoResult = useMemo(
    () => (bingo ? getBingoResult(bingo.bingoItems) : null),
    [bingo],
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Header title="소도시 빙고" showBackButton={false} />
      {BINGO_LIST.length > 0 ? (
        <>
          <RegionList
            regionList={regionList}
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
          />
          <ScrollView
            contentContainerClassName={`gap-6 py-3 px-5 justify-start`}
          >
            <BingoTitle selectedRegion={selectedRegion} />
            <BingoBoard bingo={bingo as BingoList} bingoResult={bingoResult} />
            <BingoAdvantage />
          </ScrollView>
        </>
      ) : (
        <BingoEmpty />
      )}
    </SafeAreaView>
  );
}
