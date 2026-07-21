import PopularSearchSection from "@/components/search/popularSearch/PopularSearchSection";
import RecentSearchSection from "@/components/search/recentSearch/RecentSearchSection";
import SearchTextBar from "@/components/search/SearchTextBar";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className={`flex-1 px-5 pt-3 gap-6`}>
          <SearchTextBar />

          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ gap: 24 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <RecentSearchSection />
            <PopularSearchSection />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
