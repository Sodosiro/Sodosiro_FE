import { RightIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import EmptyState from "@/components/common/EmptyState";
import Spinner from "@/components/common/Spinner";
import { useBadgeQuery } from "@/hooks/query/badge";
import { router } from "expo-router";
import { Pressable, View } from "react-native";
import BadgeItem from "../badge/BadgeItem";
import MypageSectionContainer from "./MypageSectionContainer";

export default function MyBadgeSection() {
  const { data, isPending, isError, refetch } = useBadgeQuery();

  const { collectedCount, badges } = data?.data ?? {};

  const filteredBadges = badges
    ?.filter((badge: BadgeType) => badge.earned)
    .slice(0, 4);

  return (
    <MypageSectionContainer
      title="내 배지"
      rightIcon={<RightIcon width={20} color={"#888888"} />}
      onPress={() => router.push("/mypage/badge")}
    >
      <Pressable
        className={`border border-border rounded-xl p-4 gap-3 shrink-0`}
      >
        {isPending ? (
          <View
            className={`flex-1 justify-center items-center min-h-30 shrink-0`}
          >
            <Spinner />
          </View>
        ) : isError ? (
          <View className={`py-4 shrink-0`}>
            <EmptyState
              title={"배지 정보를 불러오지 못했어요."}
              description="네트워크 상태를 확인하고 다시 시도해주세요"
              actionLabel="다시 시도"
              onPressAction={() => refetch()}
            />
          </View>
        ) : filteredBadges?.length > 0 ? (
          <View className={`gap-3 shrink-0`}>
            <View className={`flex-row flex-warp`}>
              {filteredBadges?.map((badge: BadgeType) => (
                <View key={badge.badgeId} className={`w-1/4`}>
                  <BadgeItem badge={badge} />
                </View>
              ))}
            </View>
            <CustomText font="body3" className={`text-text-secondary`}>
              소도시 {collectedCount}곳을 발견했어요
            </CustomText>
          </View>
        ) : (
          <View className={`flex-1 justify-center items-center py-4 shrink-0`}>
            <EmptyState
              title={"아직 수집한 배지가 없어요."}
              description={"소도시를 방문하고 배지를 모아보세요."}
            />
          </View>
        )}
      </Pressable>
    </MypageSectionContainer>
  );
}
