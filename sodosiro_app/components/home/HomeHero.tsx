import { NotificationIcon, SearchIcon } from "@/assets/svgs";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../common/CustomButton";

export default function HomeHero() {
  return (
    <View className={`flex-col justify-between h-115`}>
      <Image
        source={require("@/assets/images/home.png")}
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
              className={`text-white text-[18px] font-semibold leading-none`}
            >
              소도시로
            </Text>
            <View className={`flex-row gap-3`}>
              <NotificationIcon color={"white"} />
              <SearchIcon color={"white"} />
            </View>
          </View>

          <View className={`flex-col gap-2`}>
            <Text className={`text-display text-white`}>강원도 어디 가지?</Text>
            <Text className={`text-body3 text-white`}>
              취향만 입력하면 숨은 명소로 구성된{"\n"}여행 동선을 만들어드려요.
            </Text>
          </View>
        </View>

        <CustomButton type="primary" title="코스 만들기" />
      </SafeAreaView>
    </View>
  );
}
