import { PinMiniIcon } from "@/assets/svgs";
import useSelectedAnimation from "@/hooks/useSelcetedAnimation";
import { formatTimeAgo } from "@/util/time/time";
import { useState } from "react";
import { Image, Pressable, ScrollView, View } from "react-native";
import CustomText from "../common/CustomText";
import BookmarkIcon from "../icon/feed/BookmarkIcon";
import FeedLikeIcon from "../icon/feed/FeedLikeIcon";
import ImageCardGrid from "./ImageCardGrid";

export default function FeedItem({
  feed,
  withoutPhoto = false,
  onPhotoPress,
}: {
  feed: FeedType;
  withoutPhoto?: boolean;
  onPhotoPress?: (imageUrl: string) => void;
}) {
  const profileImageUrl = feed.author.profileImageUrl;
  const profileImageSource = profileImageUrl
    ? { uri: profileImageUrl }
    : require("@/assets/images/profile_default.png");

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
      <View className={`flex-row gap-2 items-center`}>
        <Image
          source={profileImageSource}
          className={`rounded-full w-12 aspect-square`}
        />
        <View className={`gap-1`}>
          <View className={`flex-row gap-1`}>
            <CustomText font="body3">{feed.author.displayName}</CustomText>
            <CustomText font="body3" className={`text-text-muted`}>
              {formatTimeAgo(feed.createdAt)}
            </CustomText>
          </View>
          <View className={`flex-row gap-1 items-center`}>
            <PinMiniIcon color={"#888888"} width={12} />
            <CustomText font="body3" className={`text-text-muted`}>
              {feed.spot.title}
            </CustomText>
          </View>
        </View>
      </View>

      {!withoutPhoto ? (
        <>
          <ImageCardGrid images={feed.images} onPhotoPress={onPhotoPress} />
          <CustomText font="body1">{feed.body}</CustomText>
        </>
      ) : (
        <ScrollView>
          <CustomText font="body1">{feed.body}</CustomText>
        </ScrollView>
      )}

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
