import { PinMiniIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import ImageCardGrid from "@/components/feed/ImageCardGrid";
import BookmarkIcon from "@/components/icon/feed/BookmarkIcon";
import FeedLikeIcon from "@/components/icon/feed/FeedLikeIcon";
import useSelectedAnimation from "@/hooks/useSelcetedAnimation";
import { useState } from "react";
import { Pressable, View } from "react-native";

export default function MyFeedItem({
  feed,
  withPhoto = true,
}: {
  feed: FeedType;
  withPhoto?: boolean;
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmark, setIsBookmark] = useState(false);

  const { fillStyle: likeFillStyle, strokeStyle: likeStrokeStyle } =
    useSelectedAnimation(isLiked, {
      fill: ["white", "#EA3131"],
      stroke: ["#1a1a1a", "#EA3131"],
    });
  const { fillStyle: bookmarkFillStyle, strokeStyle: bookmarkStrokeStyle } =
    useSelectedAnimation(isBookmark, {
      fill: ["white", "#F5E422"],
      stroke: ["#1a1a1a", "#F5E422"],
    });

  return (
    <View className={`gap-3 py-4`}>
      <View className={`flex-row justify-between items-center py-1`}>
        <View className={`flex-row gap-1 items-center`}>
          <PinMiniIcon color={"#1a1a1a"} width={20} />
          <CustomText font="title" className={`shrink`}>
            {feed.spot.title}
          </CustomText>
        </View>
        <View className={`flex-row gap-3.5 items-center`}>
          <CustomText font="body1" className={`text-text-muted`}>
            수정
          </CustomText>
          <CustomText font="body1" className={`text-text-muted`}>
            삭제
          </CustomText>
        </View>
      </View>

      {withPhoto && <ImageCardGrid images={feed.images} />}

      <CustomText font="body1">{feed.body}</CustomText>

      <View className={`flex-row gap-3`}>
        <View className={`flex-row gap-1 items-center`}>
          <Pressable onPress={() => setIsLiked(!isLiked)} hitSlop={20}>
            <FeedLikeIcon
              animatedFill={likeFillStyle}
              animatedStroke={likeStrokeStyle}
            />
          </Pressable>
          <CustomText font="body1">좋아요 {feed.likeCount}</CustomText>
        </View>
        <View className={`flex-row gap-1 items-center`}>
          <Pressable onPress={() => setIsBookmark(!isBookmark)} hitSlop={20}>
            <BookmarkIcon
              animatedFill={bookmarkFillStyle}
              animatedStroke={bookmarkStrokeStyle}
            />
          </Pressable>
          <CustomText font="body1">장소 저장 {feed.bookmarkCount}</CustomText>
        </View>
      </View>
    </View>
  );
}
