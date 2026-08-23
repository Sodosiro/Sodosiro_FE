import Spinner from "@/components/common/Spinner";
import { FlatList, Image, Pressable, View } from "react-native";

type PhotoItem = {
  reviewId: number;
  imageUrl: string;
  displayOrder: number;
};

interface PhotoGridProps {
  photoReviews: ReviewType[];
  onSelectPhoto: (photo: PhotoItem) => void;
  onLoadMore: () => void;
  isFetchingNextPage: boolean;
}

export default function PhotoGrid({
  photoReviews,
  onSelectPhoto,
  onLoadMore,
  isFetchingNextPage,
}: PhotoGridProps) {
  const photoList: PhotoItem[] = photoReviews.flatMap((review) =>
    (review.images ?? []).map((image) => ({
      reviewId: review.reviewId,
      imageUrl: image.imageUrl,
      displayOrder: image.displayOrder,
    })),
  );

  return (
    <FlatList
      data={photoList}
      numColumns={3}
      keyExtractor={(photo, index) =>
        `${photo.reviewId}-${photo.imageUrl}-${index}`
      }
      contentContainerClassName="px-4.5"
      columnWrapperClassName="flex-row"
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        isFetchingNextPage ? (
          <View className="items-center py-4">
            <Spinner />
          </View>
        ) : null
      }
      renderItem={({ item }) => (
        <Pressable className="w-1/3 p-0.5" onPress={() => onSelectPhoto(item)}>
          <Image
            source={{ uri: item.imageUrl }}
            className="w-full aspect-square rounded-xl"
          />
        </Pressable>
      )}
    />
  );
}
