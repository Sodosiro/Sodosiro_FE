import { PinMiniIcon } from "@/assets/svgs";
import { useLikeFeedMutation } from "@/hooks/mutation/feed";
import { useLikePlaceMutation } from "@/hooks/mutation/place";
import useSelectedAnimation from "@/hooks/useSelcetedAnimation";
import { formatTimeAgo } from "@/util/time/time";
import { formatDate } from "date-fns";
import { router } from "expo-router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Image, Pressable, ScrollView, View } from "react-native";
import CustomText from "../common/CustomText";
import VerifiedTag from "../common/tag/VerifiedTag";
import LikeIcon from "../icon/like/LikeIcon";
import StarIcon from "../icon/like/StarIcon";
import ImageCardGrid from "./ImageCardGrid";

export default function FeedItem({
  feed,
  withoutPhoto = false,
  onPhotoPress,
  myFeed = false,
  setIsDeleteModalVisible,
  setDeleteFeedId,
}: {
  feed: FeedType;
  withoutPhoto?: boolean;
  onPhotoPress?: (imageUrl: string) => void;
  myFeed?: boolean;
  setIsDeleteModalVisible?: Dispatch<SetStateAction<boolean>>;
  setDeleteFeedId?: Dispatch<SetStateAction<number | null>>;
}) {
  const profileImageUrl = feed.author.profileImageUrl;
  const profileImageSource = profileImageUrl
    ? { uri: profileImageUrl }
    : require("@/assets/images/profile_default.png");

  const [isFeedLiked, setIsFeedLiked] = useState(feed?.isLikedByMe);
  const [feedLikeCount, setFeedLikeCount] = useState(feed?.likeCount);
  const [isPlaceLiked, setIsPlaceLiked] = useState(feed?.isSpotLikedByMe);
  const [placeLikeCount, setPlaceLikeCount] = useState(feed?.spot.likeCount);

  const { fillStyle: likeFillStyle } = useSelectedAnimation(isFeedLiked, {
    fill: ["white", "#C4D96A"],
  });
  const { fillStyle: starFillStyle } = useSelectedAnimation(isPlaceLiked, {
    fill: ["white", "#F8CF43"],
  });

  const { mutate: feedMutate, isPending: isFeedLikePending } =
    useLikeFeedMutation();
  const { mutate: placeMutate, isPending: isPlaceLikePending } =
    useLikePlaceMutation();

  const handleFeedLike = async () => {
    if (isFeedLikePending) return;

    const nextIsLiked = !isFeedLiked;
    setIsFeedLiked(!isFeedLiked);
    setFeedLikeCount((prev) => prev + (nextIsLiked ? 1 : -1));
    feedMutate(feed.diggingId);
  };

  const handlePlaceLike = async () => {
    if (isPlaceLikePending) return;

    const nextIsLiked = !isPlaceLiked;
    setIsPlaceLiked(!isPlaceLiked);
    setPlaceLikeCount((prev) => prev + (nextIsLiked ? 1 : -1));
    placeMutate([feed.spot.contentId]);
  };

  useEffect(() => {
    setIsFeedLiked(feed.isLikedByMe);
    setIsPlaceLiked(feed.isSpotLikedByMe);
    setFeedLikeCount(feed.likeCount);
    setPlaceLikeCount(feed.spot.likeCount);
  }, [feed]);

  return (
    <View className={`gap-3 py-4`}>
      {myFeed ? (
        <View className={`flex-row justify-between items-center py-1`}>
          <View className={`flex-row gap-1 items-center`}>
            <PinMiniIcon color={"#1a1a1a"} width={20} />
            <CustomText font="title" className={`shrink`}>
              {feed.spot.title}
            </CustomText>
            {feed.isGpsVerified && <VerifiedTag text="방문 인증" />}
          </View>
          <View className={`flex-row gap-3.5 items-center`}>
            <CustomText
              font="body1"
              className={`text-text-muted`}
              onPress={() => {
                router.push({
                  pathname: "/feed/modify",
                  params: { feedId: String(feed.diggingId) },
                });
              }}
            >
              수정
            </CustomText>
            <CustomText
              font="body1"
              className={`text-text-muted`}
              onPress={
                setIsDeleteModalVisible && setDeleteFeedId
                  ? () => {
                      setIsDeleteModalVisible(true);
                      setDeleteFeedId(feed.diggingId);
                    }
                  : undefined
              }
            >
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
              {feed.isGpsVerified && <VerifiedTag text="방문 인증" />}
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
          <Pressable onPress={handleFeedLike} hitSlop={20}>
            <LikeIcon animatedFill={likeFillStyle} />
          </Pressable>
          <CustomText font="body1">좋아요 {feedLikeCount}</CustomText>
        </View>
        <View className={`flex-row gap-1 items-center`}>
          <Pressable onPress={handlePlaceLike} hitSlop={20}>
            <StarIcon animatedFill={starFillStyle} />
          </Pressable>
          <CustomText font="body1">장소 저장 {placeLikeCount}</CustomText>
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
