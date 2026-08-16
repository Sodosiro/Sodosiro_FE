import Header from "@/components/common/Header";
import FeedDetailModal from "@/components/feed/FeedDetailModal";
import FeedFloatingButton from "@/components/feed/FeedFloatingButton";
import FeedItem from "@/components/feed/FeedItem";
import { FEED } from "@/mocks/feed";
import { useRef, useState } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FeedScreen() {
  const flatListRef = useRef<FlatList>(null);
  const [feedDetailModalVisible, setFeedDetailModalVisible] = useState(false);
  const [selectedFeedId, setSelectedFeedId] = useState<number | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  const handleToTop = () => {
    flatListRef.current?.scrollToOffset({
      offset: 0,
      animated: true,
    });
  };

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "white" }}>
      <Header title="피드" showBackButton={false} />
      <FlatList
        ref={flatListRef}
        data={FEED}
        className={`px-5`}
        keyExtractor={(item) => String(item.feedId)}
        ItemSeparatorComponent={<View className={`w-full h-px bg-border`} />}
        renderItem={({ item }) => (
          <FeedItem
            feed={item}
            onPhotoPress={(imageUrl) => {
              setSelectedFeedId(item.feedId);
              setSelectedImageUrl(imageUrl);
              setFeedDetailModalVisible(true);
            }}
          />
        )}
      />
      <FeedFloatingButton onToTop={handleToTop} />
      <FeedDetailModal
        feeds={FEED}
        visible={feedDetailModalVisible}
        setVisible={setFeedDetailModalVisible}
        initialfeedId={selectedFeedId}
        initialImageUrl={selectedImageUrl}
        onClose={() => setFeedDetailModalVisible(false)}
      />
    </SafeAreaView>
  );
}
