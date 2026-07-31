import { FESTIVALS } from "@/mocks/places";
import { router } from "expo-router";
import { View } from "react-native";
import SectionTitle from "../SectionTitle";
import FestivalPrevList from "./FestivalPrevList";

export default function FestivalSection() {
  const isMore = FESTIVALS.length > 0;

  return (
    <View className={`px-5 gap-3`}>
      <SectionTitle
        title={"다가오는 강원 축제"}
        onPress={() => {
          router.push("/(home)/festival");
        }}
        isMore={isMore}
      />
      <FestivalPrevList festivals={FESTIVALS} />
    </View>
  );
}
