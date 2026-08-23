import { useVisitedRegionsQuery } from "@/hooks/query/region";
import { Dispatch, SetStateAction } from "react";
import { View } from "react-native";
import GangwonMap from "../gangwonMap/GanwonMap";
import VisitedList from "../gangwonMap/VisitedList";
import MypageSectionContainer from "./MypageSectionContainer";

export default function MyVisitedSection({
  selectedRegionId,
  setSelectedRegionId: setSelectedRegionId,
}: {
  selectedRegionId: number | null;
  setSelectedRegionId: Dispatch<SetStateAction<number | null>>;
}) {
  const { data } = useVisitedRegionsQuery("51");

  const visitedRegions = data?.data.visitedSigungus ?? [];

  const visitedRegionIds = visitedRegions.map(
    (item: { sigunguId: number }) => item.sigunguId,
  );

  return (
    <MypageSectionContainer title="내 강원 탐험 지도">
      <View className={`bg-bg border border-border rounded-xl`}>
        <GangwonMap
          selectedRegionId={selectedRegionId}
          setSelectedRegionId={setSelectedRegionId}
          visitedRegionIds={visitedRegionIds}
        />
        <VisitedList visitedRegionIds={visitedRegionIds} />
      </View>
    </MypageSectionContainer>
  );
}
