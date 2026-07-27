import { VISITED_REGION } from "@/mocks/region";
import { Dispatch, SetStateAction } from "react";
import { View } from "react-native";
import GangwonMap from "../gangwonMap/GanwonMap";
import VisitedList from "../gangwonMap/VisitedList";
import MypageSectionContainer from "./MypageSectionContainer";

export default function MyVisitedSection({
  selectedRegion,
  setSelectedRegion,
}: {
  selectedRegion: string | null;
  setSelectedRegion: Dispatch<SetStateAction<string | null>>;
}) {
  return (
    <MypageSectionContainer title="내 강원 탐험 지도">
      <View className={`bg-bg border border-border rounded-xl`}>
        <GangwonMap
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          visitedRegions={VISITED_REGION}
        />
        <VisitedList visitedRegions={VISITED_REGION} />
      </View>
    </MypageSectionContainer>
  );
}
