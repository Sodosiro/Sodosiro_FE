import { RightIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import Review from "@/components/placeDetail/review/Review";
import { router } from "expo-router";
import { Dispatch, SetStateAction } from "react";
import { Pressable, View } from "react-native";

export default function MyReview({
  review,
  handleImageClick,
  setIsDeleteModalVisible,
  setDeleteReviewId,
  isLast = false,
}: {
  review: MyReviewType;
  handleImageClick: (images: string[], index: number) => void;
  setIsDeleteModalVisible: Dispatch<SetStateAction<boolean>>;
  setDeleteReviewId: Dispatch<SetStateAction<number | null>>;
  isLast?: boolean;
}) {
  return (
    <View className={`pt-3`}>
      <View className={`flex-row justify-between items-center`}>
        <Pressable
          className={`flex-row items-center`}
          onPress={() =>
            router.push({
              pathname: "/place/[placeId]",
              params: { placeId: review.spot.contentId },
            })
          }
        >
          <CustomText font="heading2">{review?.spot.title}</CustomText>
          <RightIcon color={"#888888"} width={16} />
        </Pressable>
        <View className={`flex-row gap-3 items-center`}>
          <CustomText font="body1" className={`text-text-muted`}>
            수정
          </CustomText>
          <CustomText
            font="body1"
            className={`text-text-muted`}
            onPress={() => {
              setIsDeleteModalVisible(true);
              setDeleteReviewId(review?.reviewId);
            }}
          >
            삭제
          </CustomText>
        </View>
      </View>
      <Review
        review={review as ReviewType}
        isLast={isLast}
        handleImageClick={handleImageClick}
        isMyReview
      />
    </View>
  );
}
