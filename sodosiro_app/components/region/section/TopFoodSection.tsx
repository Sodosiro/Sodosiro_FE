import { ScrollView } from "react-native";
import RegionKeywordBadge from "../RegionKeywordBadge";
import RegionSectionContainer from "./RegionSectionContainer";

export default function TopFoodSection({ topFoods }: { topFoods: string[] }) {
  return (
    <RegionSectionContainer title="대표 음식">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 4 }}
      >
        {topFoods.map((food, index) => (
          <RegionKeywordBadge key={index} title={food} />
        ))}
      </ScrollView>
    </RegionSectionContainer>
  );
}
