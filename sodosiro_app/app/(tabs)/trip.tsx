import CustomButton from "@/components/common/CustomButton";
import Header from "@/components/common/Header";
import CompletedTripSection from "@/components/trip/section/CompletedTripSection";
import OngoingTripSection from "@/components/trip/section/OngoingTripSection";
import UpcomingTripSection from "@/components/trip/section/UpcomingTripSection";
import TripTabBar from "@/components/trip/TripTabBar";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type TabType = "예정" | "진행중" | "완료";

export default function TripScreen() {
  const [currentTab, setCurrentTab] = useState<TabType>("진행중");
  const handlePressCondition = () => {
    router.push("/trip/condition");
  };
  const handlePressTimeline = () => {
    router.push("/trip/timeline");
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title="내 여행" showBackButton={false} />
      <TripTabBar
        currentTab={currentTab}
        moveToSection={setCurrentTab}
        counts={{
          upcoming: 3,
          completed: 2,
        }}
      />

      {/* {currentTab === "예정" && <UpcomingTripSection />}
      {currentTab === "진행중" && <OngoingTripSection />}
      {currentTab === "완료" && <CompletedTripSection />} */}
      <View className="flex-1">
        <View style={{ display: currentTab === "예정" ? "flex" : "none", flex: 1 }}>
          <UpcomingTripSection />
        </View>

        <View style={{ display: currentTab === "진행중" ? "flex" : "none", flex: 1 }}>
          <OngoingTripSection />
        </View>

        <View style={{ display: currentTab === "완료" ? "flex" : "none", flex: 1 }}>
          <CompletedTripSection />
        </View>
      </View>
      {/* {임시} */}
      <View className={`px-4 py-4`}>
        <CustomButton type="primary" title="4-1 AI 입력 화면" onPress={handlePressCondition} />
      </View>
      <View className={`px-4 py-4`}>
        <CustomButton type="primary" title="5-1 동선 지도 타임라인" onPress={handlePressTimeline} />
      </View>
    </SafeAreaView>
  );
}
