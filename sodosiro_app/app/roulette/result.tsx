import { CheckIcon, LeftIcon, RefreshIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import { router } from "expo-router";
import { Dimensions, Image, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import { Region } from "@/mocks/region";
import RegionTag from "@/components/region/RegionTag";
import PlaceMini from "@/components/place/PlaceMini";
import RegionSection from "@/components/region/RegionSection";
import CustomButton from "@/components/common/CustomButton";
import AnimatedButton from "@/components/common/AnimatedButton";

export default function RouletteResultScreen() {
  const width = Dimensions.get("window").width;

  const progress = useSharedValue(0);

  const images = [
    "https://conlab.visitkorea.or.kr/api/depot/public/depot-flow/query/download-image/abedf24e-06d9-4c50-90f8-f22eb9fc8dc5/it11",
    "https://conlab.visitkorea.or.kr/api/depot/public/depot-flow/query/download-image/46929c8f-c64c-465e-9f36-6dc92d5f0787/it11",
    "https://conlab.visitkorea.or.kr/api/depot/public/depot-flow/query/download-image/018d8521-9851-42b1-81d5-289d26c1ab13/it11",
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <View className={`flex-row justify-between p-5`}>
          <LeftIcon color={"#1A1A1A"} onPress={() => router.back()} />
          <View className={`flex-row gap-1 items-center`}>
            <CustomText font="body1" className={`text-text-muted`}>
              오늘 남은 추천 횟수
            </CustomText>
            <CustomText font="body1" className={`text-text-secondary`}>
              4/5
            </CustomText>
          </View>
        </View>

        <View>
          <Carousel
            width={width}
            height={(width / 4) * 3}
            data={images}
            onProgressChange={progress}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                style={{ width: "100%", aspectRatio: 4 / 3 }}
                resizeMode="cover"
              />
            )}
          />
          <Pagination.Custom
            progress={progress}
            data={images}
            dotStyle={{
              width: 6,
              height: 6,
              backgroundColor: "#E2E2E8",
              borderRadius: 999,
            }}
            activeDotStyle={{
              backgroundColor: "#1A1A1A",
            }}

            containerStyle={{
              gap: 6,
              position: "absolute",
              bottom: 12,
            }}
          />
        </View>

        <View className={`px-5 gap-8 flex-1`}>
          <View className={`gap-2 pt-5`}>
            <CustomText font="display">{Region.title}</CustomText>
            <CustomText font="body3" className={`text-text-muted`}>
              {Region.desc}
            </CustomText>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 4 }}
            >
              {Region.tags.map((tag, index) => (
                <RegionTag key={index} title={tag} />
              ))}
            </ScrollView>
          </View>

          <RegionSection title="이 지역을 추천하는 이유">
            <View className={`gap-3`}>
              {Region.reasons.map((reason, index) => (
                <View key={index} className={`flex-row gap-1`}>
                  <CheckIcon />
                  <CustomText
                    font="body3"
                    className={`pt-1 text-text-secondary`}
                  >
                    {reason}
                  </CustomText>
                </View>
              ))}
            </View>
          </RegionSection>

          <RegionSection title={`${Region.title}의 대표 명소`}>
            <View className={`flex-col flex-1 gap-3`}>
              {Region.topAttractions.map((attraction, index) => (
                <PlaceMini
                  key={index}
                  imageSource={attraction.imageUrl}
                  title={attraction.title}
                  desc={attraction.desc}
                />
              ))}
            </View>
          </RegionSection>

          <RegionSection title="여행 가기 좋은 시기">
            <View className={`bg-primary-light rounded-xl px-4 py-3 gap-0.5`}>
              <CustomText font="title" className={`text-primary-dark`}>
                {Region.recommendedMonth.startMonth}월 ~{" "}
                {Region.recommendedMonth.endMonth}월
              </CustomText>
              <CustomText font="body3" className={`text-text-secondary`}>
                {Region.recommendedMonth.reason}
              </CustomText>
            </View>
          </RegionSection>

          <RegionSection title="대표 음식">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 4 }}
            >
              {Region.topFoods.map((food, index) => (
                <RegionTag key={index} title={food} />
              ))}
            </ScrollView>
          </RegionSection>
        </View>
      </ScrollView>
      <View className={`px-5 py-3 bg-white border-t-[0.5] border-border`}>
        <View className={`flex-row gap-2`}>
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
        </View>
      </View>
    </SafeAreaView>
  );
}
