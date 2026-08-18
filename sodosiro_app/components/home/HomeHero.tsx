import { NotificationIcon } from "@/assets/svgs";
import { router } from "expo-router";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../common/CustomButton";
import CustomText from "../common/CustomText";

export default function HomeHero() {
  return (
    <View className={`flex-col justify-between h-[50vh]`}>
      <Image
        source={require("@/assets/images/hero.png")}
        resizeMode="cover"
        className={`absolute`}
        style={{ width: "100%", height: "100%" }}
      />
      <SafeAreaView
        edges={["top"]}
        className={`flex-col justify-between`}
        style={{ paddingHorizontal: 20, paddingBottom: 20, flex: 1 }}
      >
        <View className={`flex-1 flex-col`}>
          <View
            className={`flex-row items-center justify-between opacity-70 py-3.5`}
          >
            <Text
              className={`text-[18px] font-semibold leading-none font-gmarket-sans-medium`}
            >
              소도시로
            </Text>
            <View className={`flex-row gap-3`}>
              <NotificationIcon color={"#1a1a1a"} />
            </View>
          </View>

          <View className={`flex-col gap-2`}>
            <CustomText font="display">
              아직 몰랐던{"\n"}강원도를 만나보세요.
            </CustomText>
            <CustomText font="body3">
              AI가 숨은 명소를 모아 여행 코스를 추천해드려요.
            </CustomText>
          </View>
        </View>

        <CustomButton
          type="primary"
          title="코스 만들기"
          onPress={() => router.push("/roulette")}
        />
      </SafeAreaView>
    </View>
  );
}
