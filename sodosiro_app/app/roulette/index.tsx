import Header from "@/components/common/Header";
import RoulleteContent from "@/components/roulette/RouletteContent";
import RouletteHeaderComponent from "@/components/roulette/RouletteHeaderComponent";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RouletteScreen() {
  const [chance, setChance] = useState(5);
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
            rightComponent={<RouletteHeaderComponent chance={chance} />}
          />
        </SafeAreaView>
        <RoulleteContent chance={chance} setChance={setChance} />
      </View>
    </LinearGradient>
  );
}
