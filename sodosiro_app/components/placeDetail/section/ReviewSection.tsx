import { RightIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import { router } from "expo-router";
import type { RefObject } from "react";
import type { ViewProps } from "react-native";
import { Pressable, View } from "react-native";
import ReviewList from "../review/ReviewList";
import PlaceDetailSectionContainer from "./PlaceDetailSectionContainer";

interface Props extends ViewProps {
  contentId: number;
  title: string;
  reviews: ReviewType[];
  ref: RefObject<View | null>;
}

export default function ReviewSection({
  contentId,
  title,
  reviews,
  ref,
  ...props
}: Props) {
  return (
    <PlaceDetailSectionContainer
      ref={ref}
      title="리뷰"
      className={`pb-4`}
      rightComponent={
        reviews?.length > 0 ? (
          <Pressable
            className={`flex-row items-center`}
            onPress={() =>
              router.push({
                pathname: "/place/[placeId]/review",
                params: {
                  placeId: contentId,
                  title: title,
                },
              })
            }
          >
            <CustomText font="body1" className={`text-text-secondary`}>
              전체보기
            </CustomText>
            <RightIcon color={"#444444"} width={16} />
          </Pressable>
        ) : undefined
      }
      {...props}
    >
      <ReviewList title={title} reviews={reviews?.slice(0, 3)} prev />
    </PlaceDetailSectionContainer>
  );
}
