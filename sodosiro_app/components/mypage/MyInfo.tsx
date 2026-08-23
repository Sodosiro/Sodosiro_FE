import { RightIcon } from "@/assets/svgs";
import { useUserStore } from "@/stores/useUserStore";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Image, Pressable, View } from "react-native";
import CustomText from "../common/CustomText";

export default function MyInfo() {
  const user = useUserStore((state) => state.user);

  return (
    <View>
      <View className="relative w-full">
        <Image
          className="absolute w-full h-full"
          resizeMode="cover"
          source={require("@/assets/images/mypage_bg.png")}
        />

        <View className="justify-between">
          <LinearGradient
            colors={["#FFFFFF", "rgba(255,255,255,0)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 20,
              height: 100,
            }}
          />

          <View className="absolute top-0 left-5 h-16 justify-center">
            <CustomText font="heading1">내 정보</CustomText>
          </View>

          <View className="px-5 py-5 gap-3">
            <Image
              className="w-15 h-15 rounded-full"
              resizeMode="cover"
              source={
                user?.profileImage
                  ? {
                      uri:
                        typeof user.profileImage === "string"
                          ? user.profileImage
                          : user.profileImage.uri,
                    }
                  : require("@/assets/images/profile_default.png")
              }
            />
            <View className="gap-2">
              <View className="gap-1">
                <CustomText font="heading2">{user?.nickName}</CustomText>
                <CustomText font="body3" className="text-text-secondary">
                  {user?.introduction}
                </CustomText>
              </View>
              <Pressable
                className="flex-row items-center self-start"
                onPress={() => router.push("/mypage/edit")}
              >
                <CustomText font="body2" className="text-text-muted">
                  프로필 편집
                </CustomText>
                <RightIcon width={16} height={16} color={"#888888"} />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
