import Spinner from "@/components/common/Spinner";
import { useFestivalsQuery } from "@/hooks/query/useFestivalsQuery";
import { router } from "expo-router";
import { View } from "react-native";
import SectionTitle from "../SectionTitle";
import FestivalPrevList from "./FestivalPrevList";

export default function FestivalSection() {
  const { data, isPending } = useFestivalsQuery(undefined, "ACTIVE", 5);

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
      {isPending ? (
        <View className={`flex-1 justify-center items-center h-70`}>
          <Spinner />
        </View>
      ) : (
        <FestivalPrevList festivals={festivals} />
      )}
    </View>
  );
}
