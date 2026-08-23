import { AnimatedView } from "@/components/common/animated/Animated";
import CustomText from "@/components/common/CustomText";
import Header from "@/components/common/Header";
import NotificationToggle from "@/components/mypage/setting/NotificationToggle";
import { useState } from "react";
import { ScrollView } from "react-native";
import { useAnimatedStyle, withTiming } from "react-native-reanimated";

export default function NotificationSettingScreen() {
  const [noticeToggle, setNoticeToggle] = useState(false);
  const [tripNoticeToggle, setTripNoticeToggle] = useState(false);
  const [activityNoticeToggle, setActivityNoticeToggle] = useState(false);

  const disabledAnimatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(noticeToggle ? 1 : 0.4, {
      duration: 300,
    }),
  }));

  return (
    <>
      <Header title="알림 설정" />
      <ScrollView className={`px-5 py-3`}>
        <NotificationToggle toggle={noticeToggle} setToggle={setNoticeToggle}>
          <CustomText font="heading2" className={`flex-1`}>
            전체 알림
          </CustomText>
        </NotificationToggle>
        <NotificationToggle
          toggle={tripNoticeToggle}
          setToggle={setTripNoticeToggle}
          disabled={!noticeToggle}
        >
          <AnimatedView
            style={disabledAnimatedStyle}
            className={`flex-1 gap-1`}
          >
            <CustomText font="title">여행 알림</CustomText>
            <CustomText font="body3" className={`text-text-muted`}>
              여행 일정과 저장한 장소에 대한 알림을 받아요.
            </CustomText>
          </AnimatedView>
        </NotificationToggle>
        <NotificationToggle
          toggle={activityNoticeToggle}
          setToggle={setActivityNoticeToggle}
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
      </ScrollView>
    </>
  );
}
