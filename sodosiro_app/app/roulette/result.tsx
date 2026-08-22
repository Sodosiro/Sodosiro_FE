import { RefreshIcon } from "@/assets/svgs";
import AnimatedButton from "@/components/common/animated/AnimatedButton";
import BottomActionBar from "@/components/common/BottomActionBar";
import CustomButton from "@/components/common/CustomButton";
import CustomCarousel from "@/components/common/CustomCarousel";
import CustomText from "@/components/common/CustomText";
import Header from "@/components/common/Header";
import Spinner from "@/components/common/Spinner";
import FeatureSpotSection from "@/components/region/section/FeatureSpotSection";
import RecommendMonthSection from "@/components/region/section/RecommendMonthSection";
import RecommendReasonSection from "@/components/region/section/RecommendReasonSection";
import RegionInfoSection from "@/components/region/section/RegionInfoSection";
import TopFoodSection from "@/components/region/section/TopFoodSection";
import { useRegionIntroductionQuery } from "@/hooks/query/region";
import { hasBatchim } from "@/util/word/word";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RouletteResultScreen() {
  const { sigunguId, title } = useLocalSearchParams<{
    sigunguId: string;
    title: string;
  }>();

  const { data, isPending } = useRegionIntroductionQuery(Number(sigunguId));

  const particle = hasBatchim(title) ? "으로" : "로";

  const {
    displayName: region,
    intro,
    themeTags,
    recommendationReasons,
    bestSeason,
    foodTags,
    images,
    featuredSpots,
  } = data?.data ?? {};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Header
        title="오늘의 소도시"
        rightComponent={
          <View className={`flex-row gap-1 items-center`}>
            <CustomText font="body1" className={`text-text-muted`}>
              남은 추천 횟수
            </CustomText>
            <CustomText font="body1" className={`text-text-secondary`}>
              4/5
            </CustomText>
          </View>
        }
      />
      {isPending ? (
        <View className={`flex-1 justify-center items-center`}>
          <Spinner />
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
          <CustomCarousel
            images={images?.map(
              (image: { imageUrl: string }) => image.imageUrl,
            )}
          />
          <View className={`px-5 gap-8 flex-1`}>
            <RegionInfoSection
              title={region}
              desc={intro}
              keywords={themeTags}
            />
            <RecommendReasonSection reasons={recommendationReasons} />
            <FeatureSpotSection title={region} featureSpots={featuredSpots} />
            <RecommendMonthSection bestSeason={bestSeason} />
            <TopFoodSection topFoods={foodTags} />
          </View>
        </ScrollView>
      )}
      <BottomActionBar>
        <AnimatedButton
          className={`flex-row items-center justify-center px-4 gap-1.5 rounded-full`}
          backgroundColor={["#FFFFFF", "#F5F5F5"]}
          onPress={() => router.back()}
        >
          <RefreshIcon width={16} />
          <CustomText font="body1">다시 돌리기</CustomText>
        </AnimatedButton>
        <CustomButton
          stretch
          type="primary"
          size="medium"
          title={`${title}${particle} 일정 짜기`}
          onPress={() =>
            router.push({ pathname: "/trip/condition", params: { sigunguId } })
          }
        />
      </BottomActionBar>
    </SafeAreaView>
  );
}
