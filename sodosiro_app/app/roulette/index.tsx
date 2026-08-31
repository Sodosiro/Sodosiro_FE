import { RightIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import Header from "@/components/common/Header";
import RoulleteContent from "@/components/roulette/RouletteContent";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RouletteScreen() {
  return (
    <LinearGradient
      colors={["#77B4DD", "rgba(255,255,255,0)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <View className={`flex-1`}>
        <SafeAreaView>
          <Header
            title={""}
            isBgWhite={false}
            rightComponent={
              <Pressable
                className={`flex-row justify-center items-center p-1.5 pl-3.5 rounded-full bg-[rgba(255,255,255,0.6)]`}
                onPress={() => router.push("/roulette/selectRegion")}
              >
                <CustomText font="body3">지역 직접 선택하기</CustomText>
                <RightIcon width={16} />
              </Pressable>
            }
          />
        </SafeAreaView>
        <RoulleteContent />
      </View>
    </LinearGradient>
  );
}
