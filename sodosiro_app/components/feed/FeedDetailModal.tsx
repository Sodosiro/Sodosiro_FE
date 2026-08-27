import { LeftIcon } from "@/assets/svgs";
import { Dispatch, SetStateAction } from "react";
import { Dimensions, FlatList, Modal, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FeedDetailContent from "./FeedDetailContent";

export default function FeedDetailModal({
  feeds,
  visible,
  setVisible,
  initialfeedId,
  initialImageUrl,
  onClose,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
}: {
  feeds: FeedType[];
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  initialfeedId: number | null;
  initialImageUrl: string | null;
  onClose: () => void;
  onLoadMore: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}) {
  const { width } = Dimensions.get("window");

  // FlatList가 실제로 사용하는 배열 기준으로 인덱스를 계산
  const feedsWithImages = feeds?.filter((feed) => feed.images?.length);

  const initialIndex = Math.max(
    0,
    feedsWithImages?.findIndex((feed) => feed.diggingId === initialfeedId),
  );

  return (
    <Modal
      visible={visible}
      animationType="fade"
      onRequestClose={() => setVisible(false)}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View className={`px-5 py-2 h-16 justify-center`}>
          <LeftIcon onPress={onClose} />
        </View>
        <FlatList
          horizontal
          pagingEnabled
          decelerationRate="fast"
          initialScrollIndex={initialIndex}
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          showsHorizontalScrollIndicator={false}
          data={feedsWithImages}
          keyExtractor={(item) => item.diggingId.toString()}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              onLoadMore();
            }
          }}
          onEndReachedThreshold={0.5}
          renderItem={({ item }) => (
            <FeedDetailContent
              feed={item}
              initialImageUrl={
                item.diggingId === initialfeedId ? initialImageUrl : null
              }
            />
          )}
        />
      </SafeAreaView>
    </Modal>
  );
}
