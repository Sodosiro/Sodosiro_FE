import { getTrendSearchApi } from "@/api/search";
import CustomText from "@/components/common/CustomText";
import Spinner from "@/components/common/Spinner";
import { useQuery } from "@tanstack/react-query";
import { View } from "react-native";
import PopularSearch from "./PopularSearch";

export default function PopularSearchSection() {
  const { data, isPending } = useQuery({
    queryKey: ["trendSearch"],
    queryFn: getTrendSearchApi,
    refetchInterval: 5 * 60 * 1000,
  });

  return isPending ? (
    <View className={`h-40 justify-center items-center`}>
      <Spinner />
    </View>
  ) : (
    <View className={`gap-4 pb-2`}>
      <View className={`gap-1.5`}>
        <CustomText font="heading2">지금 많이 찾는 검색어</CustomText>
        <CustomText font="body3" className={`text-text-muted`}>
          지난 30일 동안 검색이 많이 된 순위에요.
        </CustomText>
      </View>
      <View className={`gap-1`}>
        {data?.data.map((item: { keyword: string; rank: number }) => (
          <PopularSearch
            key={item.rank}
            popularSearch={item.keyword}
            index={item.rank}
          />
        ))}
      </View>
    </View>
  );
}
