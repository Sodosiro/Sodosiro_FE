import FestivalSection from "@/components/home/festival/FestivalSection";
import HomeHero from "@/components/home/HomeHero";
import PopularPlacesSection from "@/components/home/popularPlace/PoplularPlacesSection";
import { ScrollView, View } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView>
      <View className={`flex flex-col gap-6 bg-white pb-8`}>
        <HomeHero />
        <View className={`gap-8`}>
          <PopularPlacesSection />
          <FestivalSection />
        </View>
      </View>
    </ScrollView>
  );
}
