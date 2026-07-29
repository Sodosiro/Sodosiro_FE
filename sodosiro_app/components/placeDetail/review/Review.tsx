import { StarIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import { Image, Pressable, View } from "react-native";

export default function Review({
  review,
  isLast = false,
  prev = false,
  handleImageClick,
}: {
  review: ReviewType;
  isLast?: boolean;
  prev?: boolean;
  handleImageClick: (imageSource: string) => void;
}) {
  const date = review.createdAt;
  const formattedDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;

  return (
    <View
      className={`gap-3 ${!isLast ? `border-b border-border py-4` : `pt-4`}`}
    >
      <View className={`flex-row gap-1 items-center`}>
        <View className={`flex-row gap-1.5 items-center flex-1`}>
          <View className={`flex-row gap-0.5 items-center`}>
            <StarIcon />
            <CustomText font="body2">{review.rate}</CustomText>
          </View>
          <CustomText
            font="body3"
            className={`text-text-muted flex-1`}
            numberOfLines={1}
          >
            {review.nickname}
          </CustomText>
        </View>
        <CustomText font="body3" className={`text-text-muted`}>
          {formattedDate}
        </CustomText>
      </View>

      <View className={`${prev ? `flex-row` : ``} gap-3`}>
        <CustomText
          font="body3 review"
          className={`text-text-secondary ${prev && `flex-1`}`}
          numberOfLines={prev ? 2 : undefined}
        >
          {review.comment}
        </CustomText>
        {review.imageSource && (
          <Pressable
            onPress={() => handleImageClick(review.imageSource as string)}
          >
            <Image
              source={{ uri: review.imageSource }}
              className={`${prev ? `w-13 h-13` : `w-20 h-20`} rounded-xl`}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}
