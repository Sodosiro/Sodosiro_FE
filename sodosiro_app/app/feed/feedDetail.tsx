import Header from "@/components/common/Header";
import Spinner from "@/components/common/Spinner";
import FeedDetailContent from "@/components/feed/FeedDetailContent";
import { useFeedQuery } from "@/hooks/query/feed";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FeedDetailScreen() {
  const { feedId } = useLocalSearchParams<{ feedId: string }>();

  const { data, isPending } = useFeedQuery(Number(feedId));

  const feed = data?.data ?? null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Header title="" />
      {isPending ? (
        <View className={`flex-1 justify-center items-center`}>
          <Spinner />
        </View>
      ) : (
        <FeedDetailContent
          feed={feed}
          initialImageUrl={feed.images[0].imageUrl}
          isFlex
        />
      )}
    </SafeAreaView>
  );
}
