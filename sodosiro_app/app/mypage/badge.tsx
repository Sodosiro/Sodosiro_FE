import CustomText from "@/components/common/CustomText";
import Header from "@/components/common/Header";
import BadgeItem from "@/components/mypage/badge/BadgeItem";
import { useBadgeQuery } from "@/hooks/query/badge";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function BadgeScreen() {
  const { data, isPending, isError } = useBadgeQuery();
  const { collectedCount, totalCount, badges } = data?.data;

  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <Header title="소도시 배지" />
      <ScrollView contentContainerClassName={`py-6 px-5 gap-8`}>
        <View className={`gap-2`}>
          <View className={`flex-row gap-2`}>
            <CustomText font="title" className={`text-primary-dark flex-1`}>
              내 배지
            </CustomText>
            <CustomText font="body3" className={`text-text-muted`}>
              {collectedCount}/{totalCount}
            </CustomText>
          </View>
          <View className={`flex-row flex-wrap px-2.5 gap-y-4`}>
            {badges?.map((badge: BadgeType) => (
              <View key={badge.badgeId} className={`w-1/4`}>
                <BadgeItem badge={badge} withText />
              </View>
            ))}
          </View>
        </View>
        <View className={`rounded-xl bg-primary-light p-4 gap-2`}>
          <CustomText font="title">
            소도시를 방문하고 배지를 모아보세요!
          </CustomText>
          <CustomText font="body3" className={`text-text-secondary`}>
            해당 지역의 장소 1곳의 방문을 인증하면 배지를 받을 수 있어요.
          </CustomText>
        </View>
      </ScrollView>
    </View>
  );
}
