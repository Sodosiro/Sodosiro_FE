import { AnimatedView } from "@/components/common/animated/Animated";
import CustomText from "@/components/common/CustomText";
import Header from "@/components/common/Header";
import NotificationToggle from "@/components/mypage/setting/NotificationToggle";
import { useNotificationsSettingMutation } from "@/hooks/mutation/notification";
import { useNotificationsSettingQuery } from "@/hooks/query/notification";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { useAnimatedStyle, withTiming } from "react-native-reanimated";

export default function NotificationSettingScreen() {
  const [noticeToggle, setNoticeToggle] = useState(false);
  const [tripNoticeToggle, setTripNoticeToggle] = useState(false);
  const [activityNoticeToggle, setActivityNoticeToggle] = useState(false);
  const [reviewRequestToggle, setReviewRequestToggle] = useState(false);

  const disabledAnimatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(noticeToggle ? 1 : 0.4, {
      duration: 300,
    }),
  }));

  const { data } = useNotificationsSettingQuery();
  const { mutate, isPending } = useNotificationsSettingMutation();

  const notificationsSetting = data?.data;

  const handleSettingToggle = async (
    type: NoticeType | "ALL",
    enabled: boolean,
  ) => {
    if (isPending) return;
    mutate({ type, enabled });
  };

  useEffect(() => {
    setNoticeToggle(notificationsSetting?.allEnabled);
    setTripNoticeToggle(notificationsSetting?.nearbyLikedSpotsEnabled);
    setActivityNoticeToggle(notificationsSetting?.diggingPostLikeEnabled);
    setReviewRequestToggle(notificationsSetting?.reviewRequestEnabled);
  }, [data]);

  return (
    <>
      <Header title="알림 설정" />
      <ScrollView className={`px-5 py-3`}>
        <NotificationToggle
          toggle={noticeToggle}
          onPress={() => handleSettingToggle("ALL", !noticeToggle)}
        >
          <CustomText font="heading2" className={`flex-1 py-2.5`}>
            전체 알림
          </CustomText>
        </NotificationToggle>
        <NotificationToggle
          toggle={tripNoticeToggle}
          onPress={() =>
            handleSettingToggle("NEARBY_LIKED_SPOTS", !tripNoticeToggle)
          }
          disabled={!noticeToggle}
        >
          <AnimatedView
            style={disabledAnimatedStyle}
            className={`flex-1 gap-1`}
          >
            <CustomText font="title">여행 알림</CustomText>
            <CustomText font="body3" className={`text-text-muted`}>
              여행 진행 중 저장한 장소에 대한 알림을 받아요.
            </CustomText>
          </AnimatedView>
        </NotificationToggle>
        <NotificationToggle
          toggle={activityNoticeToggle}
          onPress={() =>
            handleSettingToggle("DIGGING_POST_LIKE", !activityNoticeToggle)
          }
          disabled={!noticeToggle}
        >
          <AnimatedView
            style={disabledAnimatedStyle}
            className={`flex-1 gap-1`}
          >
            <CustomText font="title">활동 알림</CustomText>
            <CustomText font="body3" className={`text-text-muted`}>
              내 게시물의 좋아요 등 활동 소식을 받아요.
            </CustomText>
          </AnimatedView>
        </NotificationToggle>
        <NotificationToggle
          toggle={reviewRequestToggle}
          onPress={() =>
            handleSettingToggle("REVIEW_REQUEST", !reviewRequestToggle)
          }
          disabled={!noticeToggle}
        >
          <AnimatedView
            style={disabledAnimatedStyle}
            className={`flex-1 gap-1`}
          >
            <CustomText font="title">리뷰 요청 알림</CustomText>
            <CustomText font="body3" className={`text-text-muted`}>
              완료한 여행에 대한 리뷰 요청 알림을 받아요.
            </CustomText>
          </AnimatedView>
        </NotificationToggle>
      </ScrollView>
    </>
  );
}
