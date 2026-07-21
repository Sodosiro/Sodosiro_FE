import { Stack } from "expo-router";
import "react-native-reanimated";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";

export const unstable_settings = {
  anchor: "(tabs)",
};

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

export default function RootLayout() {
  useFonts({
    PretendardBold: require("../assets/fonts/Pretendard-Bold.otf"),
    PretendardSemiBold: require("../assets/fonts/Pretendard-SemiBold.otf"),
    PretendardMedium: require("../assets/fonts/Pretendard-Medium.otf"),
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            presentation: "modal",
            animation: "fade",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="explore/search"
          options={{
            presentation: "modal",
            animation: "fade",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="roulette"
          options={{
            presentation: "modal",
            animation: "fade",
            headerShown: false,
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
