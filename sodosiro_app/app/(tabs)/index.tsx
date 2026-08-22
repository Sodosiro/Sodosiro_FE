import FestivalSection from "@/components/home/festival/FestivalSection";
import HomeHero from "@/components/home/HomeHero";
import PopularPlacesSection from "@/components/home/popularPlace/PoplularPlacesSection";
import { useFocusEffect } from "expo-router";
import { useCallback, useRef } from "react";
import { ScrollView, View } from "react-native";

export default function HomeScreen() {
  const scrollViewRef = useRef<ScrollView>(null);

  useFocusEffect(
    useCallback(() => {
      scrollViewRef.current?.scrollTo({
        y: 0,
        animated: false,
      });
    }, []),
  );

  return (
    <ScrollView ref={scrollViewRef}>
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
