import KeywordBadgeList from "@/components/common/keywordBadge/KeywordBadgeList";
import RegionSectionContainer from "./RegionSectionContainer";

export default function TopFoodSection({ topFoods }: { topFoods: string[] }) {
  return (
    <RegionSectionContainer title="대표 음식">
      <KeywordBadgeList keywords={topFoods} />
    </RegionSectionContainer>
  );
}
