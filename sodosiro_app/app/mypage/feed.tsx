import { deleteFeedApi } from "@/api/feed";
import CustomText from "@/components/common/CustomText";
import Header from "@/components/common/Header";
import DeleteModal from "@/components/common/modal/DeleteModal";
import Spinner from "@/components/common/Spinner";
import FeedItem from "@/components/feed/FeedItem";
import { useMyFeedsQuery } from "@/hooks/query/feed";
import { invalidateQueries } from "@/util/query/invalidateQueries";
import { useRef, useState } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FeedScreen() {
  const flatListRef = useRef<FlatList>(null);

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteFeedId, setDeleteFeedId] = useState<number | null>(null);

  const { data, isPending } = useMyFeedsQuery();

  const feeds =
    data?.pages.flatMap((page) => page.data.items) ?? ([] as FeedType[]);

  const handleConfirmDelete = async (feedId: number) => {
    await deleteFeedApi(feedId);

    invalidateQueries([["feeds"]]);

    setDeleteFeedId(null);
    setIsDeleteModalVisible(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Header title="내 피드" />
      {isPending ? (
        <View className={`flex-1 justify-center items-center`}>
          <Spinner />
        </View>
      ) : feeds.length > 0 ? (
        <>
          <FlatList
            ref={flatListRef}
            data={feeds}
            className={`px-5`}
            keyExtractor={(item) => String(item.diggingId)}
            ItemSeparatorComponent={
              <View className={`w-full h-px bg-border`} />
            }
            renderItem={({ item }) => (
              <FeedItem
                feed={item}
                myFeed
                setIsDeleteModalVisible={setIsDeleteModalVisible}
                setDeleteFeedId={setDeleteFeedId}
              />
            )}
          />
          <DeleteModal
            body="선택한 피드를 삭제할까요?"
            isDeleteModalVisible={isDeleteModalVisible}
            onCancel={() => {
              setDeleteFeedId(null);
              setIsDeleteModalVisible(false);
            }}
            handleConfirmDelete={() => {
              if (deleteFeedId !== null) {
                handleConfirmDelete(deleteFeedId);
              }
            }}
          />
        </>
      ) : (
        <View className={`flex-1 justify-center items-center`}>
          <CustomText font="body1" className={`text-text-muted pb-10`}>
            작성한 피드가 없어요.
          </CustomText>
        </View>
      )}
    </SafeAreaView>
  );
}
