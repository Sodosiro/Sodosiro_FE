import { RefreshIcon } from "@/assets/svgs";
import AnimatedButton from "@/components/common/AnimatedButton";
import BottomActionBar from "@/components/common/BottomActionBar";
import CustomButton from "@/components/common/CustomButton";
import CustomCarousel from "@/components/common/CustomCarousel";
import CustomText from "@/components/common/CustomText";
import Header from "@/components/common/Header";
import RecommendMonthSection from "@/components/region/section/RecommendMonthSection";
import RecommendReasonSection from "@/components/region/section/RecommendReasonSection";
import RegionInfoSection from "@/components/region/section/RegionInfoSection";
import TopAttractionSection from "@/components/region/section/TopAttractionSection";
import TopFoodSection from "@/components/region/section/TopFoodSection";
import { Region } from "@/mocks/region";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RouletteResultScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <Header
          title="룰렛 결과"
          rightComponent={
            <View className={`flex-row gap-1 items-center`}>
              <CustomText font="body1" className={`text-text-muted`}>
                오늘 남은 추천 횟수
              </CustomText>
              <CustomText font="body1" className={`text-text-secondary`}>
                4/5
              </CustomText>
            </View>
          }
        />
        <CustomCarousel images={Region.images} />
        <View className={`px-5 gap-8 flex-1`}>
          <RegionInfoSection
            title={Region.title}
            desc={Region.desc}
            tags={Region.tags}
          />
          <RecommendReasonSection reasons={Region.reasons} />
          <TopAttractionSection
            title={Region.title}
            topAttractions={Region.topAttractions}
          />
          <RecommendMonthSection recommendMonth={Region.recommendMonth} />
          <TopFoodSection topFoods={Region.topFoods} />
        </View>
      </ScrollView>

      <BottomActionBar>
        <AnimatedButton
          className={`flex-row items-center justify-center px-4 gap-1 rounded-full`}
          backgroundColor={["#FFFFFF", "#F5F5F5"]}
        >
          <RefreshIcon width={16} />
          <CustomText font="body1">다시 돌리기</CustomText>
        </AnimatedButton>
        <CustomButton
          stretch
          type="primary"
          size="medium"
          title={`${Region.title} 여행 일정 짜기`}
        />
      </BottomActionBar>
    </SafeAreaView>
  );
}
