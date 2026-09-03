import { RightIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import EmptyState from "@/components/common/EmptyState";
import Header from "@/components/common/Header";
import Spinner from "@/components/common/Spinner";
import { SODOSI_LIST } from "@/constants/Sodosi";
import { useRegionListQuery } from "@/hooks/query/region";
import { tagStyle } from "@/styles/Tag";
import { formatRegionName } from "@/util/region/region";
import { router } from "expo-router";
import { FlatList, Image, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SelectRegionScreen() {
  const insets = useSafeAreaInsets();

  const { data, isPending, isError, refetch } = useRegionListQuery("51");

  const regionList = data?.data ?? [];

  const sortedRegionList = [...(regionList ?? [])].sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <Header title="지역 직접 선택하기" />
      {isPending ? (
        <View className={`flex-1 justify-center items-center`}>
          <Spinner />
        </View>
      ) : isError ? (
        <EmptyState
          title="지역정보를 불러오지 못했어요."
          description="네트워크 상태를 확인하고 다시 시도해주세요"
          actionLabel="다시 시도"
          onPressAction={() => refetch()}
        />
      ) : (
        <FlatList
          data={sortedRegionList}
          contentContainerClassName="px-5 gap-1 pb-4"
          keyExtractor={(item) => String(item.sigunguId)}
          ListHeaderComponent={
            <View className={`py-5`}>
              <CustomText font="heading2">강원도 어디로 떠나시나요?</CustomText>
            </View>
          }
          ItemSeparatorComponent={<View className={`h-4`} />}
          renderItem={({ item }) => {
            const regionName = formatRegionName(item.name);
            const isSmallTown = SODOSI_LIST.find(
              (sodosi) => sodosi.sigunguId === item.sigunguId,
            )?.isSmallTown;

            return (
              <Pressable
                className={`h-12 flex-row items-center gap-2`}
                onPress={() =>
                  router.replace({
                    pathname: "/roulette/result",
                    params: {
                      title: regionName,
                      sigunguId: item.sigunguId,
                    },
                  })
                }
              >
                <View
                  className={`flex-1 flex-row justify-start items-center gap-2`}
                >
                  <Image
                    source={{ uri: item.thumbnailUrl }}
                    className={`h-full aspect-square rounded-full`}
                  />
                  <CustomText font="title">{regionName}</CustomText>
                  {isSmallTown && (
                    <View>
                      <View className={`${tagStyle} bg-bg-subtle`}>
                        <CustomText font="body3 tight">
                          소도시로 추천
                        </CustomText>
                      </View>
                    </View>
                  )}
                </View>
                <RightIcon width={16} color={"#888888"} />
              </Pressable>
            );
          }}
        />
      )}
    </View>
  );
}
