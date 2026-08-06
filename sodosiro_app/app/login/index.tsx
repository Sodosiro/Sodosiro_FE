import { loginWithKakaoApi } from "@/api/auth";
import { KakaoLogo } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import { signInWithKakao } from "@/lib/kakao";
import { useAuthStore } from "@/stores/useAuthStore";
import { router } from "expo-router";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const login = useAuthStore((state) => state.login);

  const handleKakaoLogin = async () => {
    const result = await signInWithKakao();

    if (result.type === "cancel") {
      return;
    }

    if (result.type === "error") {
      console.error(result.message);
      return;
    }

    try {
      const data = await loginWithKakaoApi(result.token.idToken);

      await login(data.accessToken, data.refreshToken);

      router.dismissAll();
      router.replace("/(tabs)");
    } catch (error: any) {
      console.log("로그인 에러", error);
      console.log(error.response?.status);
      console.log(error.response?.data);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View className={`px-5 py-3`}>
        <CustomText font="heading1">소도시로</CustomText>
      </View>
      <View className={`px-5 flex-1 justify-evenly`}>
        <View className={`gap-6`}>
          <CustomText font="display">
            나만의 강원도 여행{"\n"}AI와 시작해 보세요.
          </CustomText>
          <CustomText font="body1" className={`text-text-muted`}>
            소도시부터 숨은 명소까지{"\n"}내 취향에 맞는 여행지를 추천해드려요.
          </CustomText>
        </View>
        <Pressable
          className={`w-full py-4 flex-row gap-2.5 items-center justify-center rounded-xl bg-[#fee500]`}
          onPress={handleKakaoLogin}
        >
          <KakaoLogo />
          <CustomText font="body1">카카오 로그인</CustomText>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
