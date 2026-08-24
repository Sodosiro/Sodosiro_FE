import { RightIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import Header from "@/components/common/Header";
import LogoutModal from "@/components/mypage/setting/LogoutModal";
import { useUserStore } from "@/stores/useUserStore";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";

export default function AccountSettingScreen() {
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  const email = useUserStore((state) => state.user?.email);

  return (
    <>
      <Header title="계정 관리" />
      <ScrollView className={`px-5 py-3`}>
        <View className={`gap-3 py-3`}>
          <CustomText font="body1">로그인 계정 (카카오)</CustomText>
          <View className={`p-3 bg-primary-light rounded-md`}>
            <CustomText font="body2">{email}</CustomText>
          </View>
        </View>
        <Pressable
          className={`py-3 flex-row gap-2 items-center`}
          onPress={() => setIsLogoutModalVisible(true)}
        >
          <CustomText font="body1" className={`flex-1 `}>
            로그아웃
          </CustomText>
          <RightIcon width={16} />
        </Pressable>
        <Pressable
          className={`py-3 flex-row gap-2 items-center`}
          onPress={() => router.push("/mypage/setting/withdraw")}
        >
          <CustomText font="body1" className={`flex-1 `}>
            회원 탈퇴
          </CustomText>
          <RightIcon width={16} />
        </Pressable>
      </ScrollView>
      <LogoutModal
        isVisible={isLogoutModalVisible}
        onCancel={() => setIsLogoutModalVisible(false)}
      />
    </>
  );
}
