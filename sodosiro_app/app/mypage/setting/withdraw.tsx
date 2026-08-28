import { withdrawApi } from "@/api/auth";
import AnimatedButton from "@/components/common/animated/AnimatedButton";
import CustomText from "@/components/common/CustomText";
import Header from "@/components/common/Header";
import { useAuthStore } from "@/stores/useAuthStore";
import { router } from "expo-router";
import { ScrollView, View } from "react-native";

const DELETE_INFO = [
  "프로필 및 계정 정보",
  "저장한 장소",
  "여행 기록",
  "작성한 리뷰 및 피드",
];

export default function WithdrawScreen() {
  const logout = useAuthStore((state) => state.logout);

  const handleWithDraw = async () => {
    await withdrawApi();
    await logout();
    router.replace("/login");
  };

  return (
    <>
      <Header title="회원 탈퇴" />
      <ScrollView className={`px-5 pt-6 pb-3`}>
        <View className={`gap-4`}>
          <View className={`gap-3`}>
            <CustomText font="title tight">
              소도시로를 탈퇴하시겠어요?
            </CustomText>
            <CustomText font="body3" className={`text-text-muted`}>
              탈퇴하면 계정 정보와 이용 기록이 삭제되며 삭제된 정보는 다시
              복구할 수 없어요.
            </CustomText>
          </View>
          <View className={`p-5 bg-bg-subtle rounded-xl gap-2`}>
            <CustomText font="body2">탈퇴 시 삭제되는 정보</CustomText>
            {DELETE_INFO.map((info, index) => (
              <View key={index} className={`flex-row gap-2 items-center`}>
                <View className={`size-0.75 rounded-full bg-text-secondary`} />
                <CustomText font="body3" className={`text-text-secondary`}>
                  {info}
                </CustomText>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <View className={`flex-row gap-2 px-5 py-5`}>
        <AnimatedButton
          backgroundColor={["#F5F5F5", "#EDEDED"]}
          className={`flex-1 py-4 items-center rounded-xl`}
          onPress={() => router.back()}
        >
          <CustomText font="body3 tight">취소</CustomText>
        </AnimatedButton>
        <AnimatedButton
          backgroundColor={["#F04452", "#DD3846"]}
          className={`flex-1 py-4 items-center rounded-xl`}
          onPress={handleWithDraw}
        >
          <CustomText font="body3 tight" className={`text-white`}>
            탈퇴하기
          </CustomText>
        </AnimatedButton>
      </View>
    </>
  );
}
