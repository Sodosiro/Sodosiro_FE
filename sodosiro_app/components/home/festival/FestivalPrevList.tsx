import { ScrollView } from "react-native";
import FestivalPrevItem from "./FestivalPrevItem";
import NoFestival from "./NoFestival";

export default function FestivalPrevList({
  festivals,
}: {
  festivals: FestivalType[];
}) {
  return festivals.length > 0 ? (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 8 }}
    >
      {festivals.map((festival) => (
        <FestivalPrevItem key={festival.festivalId} festival={festival} />
      ))}
    </ScrollView>
  ) : (
    <NoFestival />
  );
}
