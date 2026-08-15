import { useFestivalsQuery } from "@/hooks/query/useFestivalsQuery";
import { router } from "expo-router";
import { View } from "react-native";
import SectionTitle from "../SectionTitle";
import FestivalPrevList from "./FestivalPrevList";

export default function FestivalSection() {
  const { data } = useFestivalsQuery(undefined, "ONGOING", 5);

  const festivals = data?.pages.flatMap((page) => page.data.items) ?? [];

  const isMore = festivals?.length > 0;

  return (
    <View className={`px-5 gap-3`}>
      <SectionTitle
        title={"다가오는 강원 축제"}
        onPress={() => {
          router.push("/(home)/festival");
        }}
        isMore={isMore}
      />
      <FestivalPrevList festivals={festivals} />
    </View>
  );
}
