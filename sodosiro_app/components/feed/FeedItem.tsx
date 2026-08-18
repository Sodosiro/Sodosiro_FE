import { PinMiniIcon } from "@/assets/svgs";
import useSelectedAnimation from "@/hooks/useSelcetedAnimation";
import { formatTimeAgo } from "@/util/time/time";
import { formatDate } from "date-fns";
import { useState } from "react";
import { Image, Pressable, ScrollView, View } from "react-native";
import CustomText from "../common/CustomText";
import LikeIcon from "../icon/like/LikeIcon";
import StarIcon from "../icon/like/StarIcon";
import ImageCardGrid from "./ImageCardGrid";

export default function FeedItem({
  feed,
  withoutPhoto = false,
  onPhotoPress,
  myFeed = false,
}: {
  feed: FeedType;
  withoutPhoto?: boolean;
  onPhotoPress?: (imageUrl: string) => void;
  myFeed?: boolean;
}) {
  const profileImageUrl = feed.author.profileImageUrl;
  const profileImageSource = profileImageUrl
    ? { uri: profileImageUrl }
    : require("@/assets/images/profile_default.png");

  const [isLiked, setIsLiked] = useState(false);
  const [isBookmark, setIsBookmark] = useState(false);

  const { fillStyle: likeFillStyle } = useSelectedAnimation(isLiked, {
    fill: ["white", "#C4D96A"],
  });
  const { fillStyle: starFillStyle } = useSelectedAnimation(isBookmark, {
    fill: ["white", "#F8CF43"],
  });

  return (
    <View className={`gap-3 py-4`}>
      {myFeed ? (
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
      ) : (
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
      )}
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
            <LikeIcon animatedFill={likeFillStyle} />
          </Pressable>
          <CustomText font="body1">좋아요 {feed.likeCount}</CustomText>
        </View>
        <View className={`flex-row gap-1 items-center`}>
          <Pressable onPress={() => setIsBookmark(!isBookmark)} hitSlop={20}>
            <StarIcon animatedFill={starFillStyle} />
          </Pressable>
          <CustomText font="body1">장소 저장 {feed.bookmarkCount}</CustomText>
        </View>
      </View>

      {myFeed && (
        <CustomText font="body3" className={`text-text-muted`}>
          {formatDate(feed.createdAt, "yyyy.MM.dd")}
        </CustomText>
      )}
    </View>
  );
}
