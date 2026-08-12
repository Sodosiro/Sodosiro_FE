import { Image, Pressable, ScrollView } from "react-native";

type PhotoItem = {
  reviewId: number;
  imageUrl: string;
  displayOrder: number;
};

export default function PhotoGrid({
  photoReviews,
  onSelectPhoto,
}: {
  photoReviews: ReviewType[];
  onSelectPhoto: (photo: PhotoItem) => void;
}) {
  const photoList: PhotoItem[] = photoReviews.flatMap((review) =>
    (review.images ?? []).map((image) => ({
      reviewId: review.reviewId,
      imageUrl: image.imageUrl,
      displayOrder: image.displayOrder,
    })),
  );

  console.log(photoReviews);

  return (
    <ScrollView contentContainerClassName={`px-4.5 flex-row flex-wrap`}>
      {photoList.map((photo, index) => (
        <Pressable
          key={photo.reviewId + photo.imageUrl + index}
          className="w-1/3 p-0.5"
          onPress={() => onSelectPhoto(photo)}
        >
          <Image
            source={{ uri: photo.imageUrl }}
            className="w-full aspect-square rounded-xl"
          />
        </Pressable>
      ))}
    </ScrollView>
  );
}
