import { loginWithKakaoApi } from "@/api/auth";
import { KakaoLogo } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import { signInWithKakao } from "@/lib/kakao";
import { useAuthStore } from "@/stores/useAuthStore";
import { router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const login = useAuthStore((state) => state.login);

  const [isLoading, setIsLoading] = useState(false);

  const handleKakaoLogin = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const result = await signInWithKakao();

      if (result.type === "cancel") {
        return;
      }

      if (result.type === "error") {
        console.error(result.message);
        return;
      }

      const data = await loginWithKakaoApi(result.token.idToken);

      await login(data.accessToken, data.refreshToken);

      router.replace("/(tabs)");
    } catch (error: any) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View className={`px-5 py-3 h-16 justify-center`}>
        <Text
          className={`font-gmarket-sans-medium text-[20px] text-text-primary shrink-0`}
        >
          소도시로
        </Text>
      </View>
      <View className={`w-screen aspect-square`}>
        <Image
          source={require("@/assets/images/login_hero.png")}
          className={`w-full h-full`}
          resizeMode="contain"
        />
      </View>
      <View className={`px-5 py-8 flex-1 justify-between`}>
        <View className={`gap-6`}>
          <CustomText font="display">
            강원도 숨은 명소로{"\n"}여행을 떠나요!
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
