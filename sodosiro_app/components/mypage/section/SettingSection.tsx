import { RightIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import { Href, router } from "expo-router";
import { Pressable, View } from "react-native";
import MypageSectionContainer from "./MypageSectionContainer";

const SETTING_LIST = [
  {
    title: "알림 설정",
    route: "/mypage/setting/notification",
  },
  {
    title: "계정 관리",
    route: "/mypage/setting/account",
  },
];

export default function SettingSection() {
  return (
    <MypageSectionContainer title="내 기록">
      <View className={`rounded-xl border border-border overflow-hidden`}>
        {SETTING_LIST.map((item, index) => (
          <Pressable
            key={item.title}
            className={`flex-row mx-5 py-4 ${SETTING_LIST.length - 1 !== index && `border-b border-border`}`}
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
