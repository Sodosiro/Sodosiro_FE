import { StarIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import { Image, Pressable, ScrollView, View } from "react-native";
import VerifiedTag from "./VerifiedTag";

export default function Review({
  review,
  isLast = false,
  prev = false,
  inPhotoModal = false,
  handleImageClick,
}: {
  review: ReviewType;
  isLast?: boolean;
  prev?: boolean;
  inPhotoModal?: boolean;
  handleImageClick: (images: string[], index: number) => void;
}) {
  const date = new Date(review?.createdAt);
  const formattedDate = `${date?.getFullYear()}/${date?.getMonth() + 1}/${date?.getDate()}`;

  return (
    <View
      className={`gap-3 ${!isLast ? `border-b border-border py-4` : `pt-4`}`}
    >
      <View className={`flex-row gap-1 items-center`}>
        <View className={`flex-row gap-1.5 items-center flex-1`}>
          <View className={`flex-row gap-0.5 items-center`}>
            <StarIcon />
            <CustomText font="body2">{review?.rating}</CustomText>
          </View>
          <CustomText
            font="body3"
            className={`text-text-muted`}
            numberOfLines={1}
          >
            {review?.author.displayName}
          </CustomText>
          {review?.gpsVerified && <VerifiedTag />}
        </View>
        <CustomText font="body3" className={`text-text-muted`}>
          {formattedDate}
        </CustomText>
      </View>

      {inPhotoModal ? (
        <ScrollView>
          <CustomText font="body3 review" className={`text-text-secondary`}>
            {review?.body}
          </CustomText>
        </ScrollView>
      ) : (
        <View className={`${prev ? `flex-row` : ``} gap-3`}>
          <CustomText
            font="body3 review"
            className={`text-text-secondary ${prev && `flex-1`}`}
            numberOfLines={prev ? 2 : undefined}
          >
            {review?.body}
          </CustomText>

          {review?.images &&
            (prev ? (
              <Image
                source={{ uri: review?.images?.[0]?.imageUrl }}
                className={`${prev ? "w-13 h-13" : "w-25 h-25"} rounded-xl`}
              />
            ) : (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="flex-row gap-1.5"
              >
                {review?.images.map((image, index) => (
                  <Pressable
                    key={image.imageUrl + index}
                    onPress={() =>
                      handleImageClick(
                        review.images?.flatMap(
                          (image) => image.imageUrl,
                        ) as string[],
                        index,
                      )
                    }
                  >
                    <Image
                      source={{ uri: image?.imageUrl }}
                      className={`${prev ? "w-13 h-13" : "w-25 h-25"} rounded-xl`}
                    />
                  </Pressable>
                ))}
              </ScrollView>
            ))}
        </View>
      )}
    </View>
  );
}
