import MyInfo from "@/components/mypage/MyInfo";
import MyHistorySection from "@/components/mypage/section/MyHistorySection";
import MyVisitedSection from "@/components/mypage/section/MyVisitedSection";
import SettingSection from "@/components/mypage/section/SettingSection";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MyPageScreen() {
  const [selectedRegionId, setSelectedRegionId] = useState<number | null>(null);
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        paddingTop: insets.top,
      }}
    >
      <ScrollView
        onTouchStart={() => setSelectedRegionId(null)}
        contentContainerStyle={{
          gap: 32,
          paddingBottom: 32,
        }}
      >
        <MyInfo />
        <MyVisitedSection
          selectedRegionId={selectedRegionId}
          setSelectedRegionId={setSelectedRegionId}
        />
        <MyHistorySection />
        <SettingSection />
      </ScrollView>
    </View>
  );
}
