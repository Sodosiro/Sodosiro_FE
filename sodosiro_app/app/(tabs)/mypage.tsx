import MyInfo from "@/components/mypage/MyInfo";
import MyHistorySection from "@/components/mypage/section/MyHistorySection";
import MyVisitedSection from "@/components/mypage/section/MyVisitedSection";
import { useFocusEffect } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MyPageScreen() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  useFocusEffect(
    useCallback(() => {
      scrollViewRef.current?.scrollTo({
        y: 0,
        animated: false,
      });
    }, []),
  );

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
        ref={scrollViewRef}
        onTouchStart={() => setSelectedRegion(null)}
        contentContainerStyle={{
          gap: 32,
          paddingBottom: 32,
        }}
      >
        <MyInfo />
        <MyVisitedSection
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
        />
        <MyHistorySection />
      </ScrollView>
    </View>
  );
}
