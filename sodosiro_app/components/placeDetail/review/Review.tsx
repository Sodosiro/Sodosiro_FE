import { StarIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import { Image, Pressable, ScrollView, View } from "react-native";
import VerifiedTag from "../../common/tag/VerifiedTag";

export default function Review({
  review,
  isLast = false,
  prev = false,
  inPhotoModal = false,
  handleImageClick,
  isMyReview,
}: {
  review: ReviewType;
  isLast?: boolean;
  prev?: boolean;
  inPhotoModal?: boolean;
  handleImageClick: (images: string[], index: number) => void;
  isMyReview?: boolean;
}) {
  const date = new Date(review?.createdAt);
  const formattedDate = `${date?.getFullYear()}/${date?.getMonth() + 1}/${date?.getDate()}`;

  return (
    <View
      className={`gap-3 pb-4 ${isMyReview ? `pt-2` : `pt-4`} ${!isLast ? `border-b border-border` : ``}`}
    >
      <View className={`flex-row gap-1 items-center`}>
        <View className={`flex-row gap-1.5 items-center flex-1`}>
          <View className={`flex-row gap-0.5 items-center`}>
            <StarIcon />
            <CustomText font="body2">{review?.rating}</CustomText>
          </View>
          {!isMyReview && (
            <CustomText
              font="body3"
              className={`text-text-muted`}
              numberOfLines={1}
            >
              {review?.author.displayName}
            </CustomText>
          )}
          {review?.gpsVerified && <VerifiedTag text="인증 리뷰" />}
        </View>
        {!isMyReview && (
          <CustomText font="body3" className={`text-text-muted`}>
            {formattedDate}
          </CustomText>
        )}
      </View>
      {inPhotoModal ? (
        <ScrollView>
          <CustomText font="body3 review" className={`text-text-secondary`}>
            {review?.body}
          </CustomText>
        </ScrollView>
      ) : (
        <View className={`${prev ? `flex-row` : ``} gap-3`}>
          {prev ? (
            <>
              <CustomText
                font="body3 review"
                className={`text-text-secondary flex-1`}
                numberOfLines={prev ? 2 : undefined}
              >
                {review?.body}
              </CustomText>
              {!!review?.images?.length && (
                <Image
                  source={{ uri: review?.images?.[0]?.imageUrl }}
                  className={`${prev ? "w-13 h-13" : "w-25 h-25"} rounded-xl`}
                />
              )}
            </>
          ) : (
            <>
              {!!review?.images?.length && (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerClassName="flex-row gap-1.5"
                >
                  {review?.images?.map((image, index) => (
                    <Pressable
                      key={image.imageUrl + index}
                      onPress={() =>
                        handleImageClick(
                          review?.images?.flatMap(
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
              )}
              <CustomText
                font="body3 review"
                className={`text-text-secondary`}
                numberOfLines={prev ? 2 : undefined}
              >
                {review?.body}
              </CustomText>
            </>
          )}

          {isMyReview && (
            <CustomText font="body3" className={`text-text-muted`}>
              {formattedDate}
            </CustomText>
          )}
        </View>
      )}
    </View>
  );
}
