import { RightIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import { Href, router } from "expo-router";
import { Pressable, View } from "react-native";
import MypageSectionContainer from "./MypageSectionContainer";

const MY_HISTORY_LIST = [
  {
    title: "알림 기록",
  },
  {
    title: "내 여행 이력",
  },
  {
    title: "내 리뷰",
  },
  {
    title: "좋아요한 장소",
    route: "/mypage/favorite",
  },
];

export default function MyHistorySection() {
  return (
    <MypageSectionContainer title="내 기록">
      <View className={`rounded-xl border border-border overflow-hidden`}>
        {MY_HISTORY_LIST.map((item, index) => (
          <Pressable
            key={item.title}
            className={`flex-row mx-5 py-4 ${MY_HISTORY_LIST.length - 1 !== index && `border-b border-border`}`}
            onPress={() => {
              if (item.route) {
                router.push(item.route as Href);
              }
            }}
          >
            <CustomText font="body1" className={`flex-1`} numberOfLines={1}>
              {item.title}
            </CustomText>
            <RightIcon color={"#888888"} height={20} />
          </Pressable>
        ))}
      </View>
    </MypageSectionContainer>
  );
}
