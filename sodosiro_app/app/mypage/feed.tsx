import Header from "@/components/common/Header";
import MyFeedItem from "@/components/mypage/feed/MyFeedItem";
import { FEED } from "@/mocks/feed";
import { useRef } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FeedScreen() {
  const flatListRef = useRef<FlatList>(null);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Header title="내 피드" />
      <FlatList
        ref={flatListRef}
        data={FEED}
        className={`px-5`}
        keyExtractor={(item) => String(item.feedId)}
        ItemSeparatorComponent={<View className={`w-full h-px bg-border`} />}
        renderItem={({ item }) => <MyFeedItem feed={item} />}
      />
    </SafeAreaView>
  );
}
