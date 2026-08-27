import Header from "@/components/common/Header";
import Spinner from "@/components/common/Spinner";
import FeedDetailModal from "@/components/feed/FeedDetailModal";
import FeedFloatingButton from "@/components/feed/FeedFloatingButton";
import FeedItem from "@/components/feed/FeedItem";
import EmptyState from "@/components/trip/EmptyState";
import { useFeedsQuery } from "@/hooks/query/feed";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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

  const insets = useSafeAreaInsets();

  const {
    data,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    refetch,
  } = useFeedsQuery();

  const feeds =
    data?.pages.flatMap((page) => page.data.items) ?? ([] as FeedType[]);

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        paddingTop: insets.top,
      }}
    >
      <Header title="피드" showBackButton={false} />
      {isPending ? (
        <View className={`flex-1 justify-center items-center`}>
          <Spinner />
        </View>
      ) : feeds?.length > 0 ? (
        <FlatList
          ref={flatListRef}
          data={feeds}
          className={`px-5`}
          keyExtractor={(item) => String(item.diggingId)}
          ItemSeparatorComponent={<View className={`w-full h-px bg-border`} />}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingNextPage ? (
              <View className="py-4 items-center">
                <Spinner />
              </View>
            ) : null
          }
          renderItem={({ item }) => (
            <FeedItem
              feed={item}
              onPhotoPress={(imageUrl) => {
                setSelectedFeedId(item.diggingId);
                setSelectedImageUrl(imageUrl);
                setFeedDetailModalVisible(true);
              }}
            />
          )}
        />
      ) : (
        <View className={`flex-1 justify-center items-center`}>
          <EmptyState
            title={
              !isError ? "작성된 피드가 없어요." : "피드를 불러오지 못했어요."
            }
            description={
              !isError
                ? "첫 번째 피드를 작성해보세요!"
                : "네트워크 상태를 확인하고 다시 시도해주세요."
            }
            actionLabel={!isError ? "피드 작성하기" : "다시 시도"}
            onPressAction={
              !isError ? () => router.push("/feed/create") : () => refetch()
            }
          />
        </View>
      )}

      <FeedFloatingButton onToTop={handleToTop} />
      <FeedDetailModal
        feeds={feeds}
        visible={feedDetailModalVisible}
        setVisible={setFeedDetailModalVisible}
        initialfeedId={selectedFeedId}
        initialImageUrl={selectedImageUrl}
        onClose={() => setFeedDetailModalVisible(false)}
        onLoadMore={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </View>
  );
}
