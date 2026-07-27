import FestivalSection from "@/components/home/festival/FestivalSection";
import HomeHero from "@/components/home/HomeHero";
import PopularPlacesSection from "@/components/home/popularPlace/PoplularPlacesSection";
import { ScrollView, View } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView>
      <View className={`flex flex-col gap-8 bg-white pb-8`}>
        <HomeHero />
        <PopularPlacesSection />
        <FestivalSection />
      </View>
    </ScrollView>
  );
}
