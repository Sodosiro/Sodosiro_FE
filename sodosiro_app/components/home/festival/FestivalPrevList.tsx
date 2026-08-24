import { Linking, ScrollView } from "react-native";
import FestivalPrevItem from "./FestivalPrevItem";
import NoFestival from "./NoFestival";

export default function FestivalPrevList({
  festivals,
}: {
  festivals: FestivalType[];
}) {
  const handleOpenFestivalLink = async (linkUrl: string) => {
    if (!linkUrl) return;

    const supported = await Linking.canOpenURL(linkUrl);
    if (supported) {
      await Linking.openURL(linkUrl);
    }
  };

  return festivals.length > 0 ? (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 8 }}
    >
      {festivals.map((festival) => (
        <FestivalPrevItem
          key={festival.festivalId}
          festival={festival}
          onPress={handleOpenFestivalLink}
        />
      ))}
    </ScrollView>
  ) : (
    <NoFestival />
  );
}
