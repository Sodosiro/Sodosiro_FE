import Spinner from "@/components/common/Spinner";
import EmptyState from "@/components/trip/EmptyState";
import { useFestivalsQuery } from "@/hooks/query/festival";
import { router } from "expo-router";
import { View } from "react-native";
import SectionTitle from "../SectionTitle";
import FestivalPrevList from "./FestivalPrevList";

export default function FestivalSection() {
  const { data, isPending, isError, refetch } = useFestivalsQuery(
    undefined,
    "ACTIVE",
    5,
  );

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
      ) : isError ? (
        <View className={`py-10 flex-1`}>
          <EmptyState
            title="축제를 불러오지 못했어요."
            description="네트워크 상태를 확인하고 다시 시도해주세요"
            actionLabel="다시 시도"
            onPressAction={() => refetch()}
          />
        </View>
      ) : (
        <FestivalPrevList festivals={festivals} />
      )}
    </View>
  );
}
