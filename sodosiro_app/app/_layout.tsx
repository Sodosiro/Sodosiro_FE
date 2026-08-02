import { PortalProvider } from "@gorhom/portal";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { configureReanimatedLogger, ReanimatedLogLevel } from "react-native-reanimated";
import "../global.css";
export const unstable_settings = {
  anchor: "(tabs)",
};

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

import { ToastProvider } from "@/contexts/ToastProvider";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { LocaleConfig } from "react-native-calendars";

LocaleConfig.locales.kr = {
  monthNames: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  monthNamesShort: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  dayNames: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
  dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
  today: "오늘",
};

LocaleConfig.defaultLocale = "kr";

export default function RootLayout() {
  useFonts({
    PretendardBold: require("../assets/fonts/Pretendard-Bold.otf"),
    PretendardSemiBold: require("../assets/fonts/Pretendard-SemiBold.otf"),
    PretendardMedium: require("../assets/fonts/Pretendard-Medium.otf"),
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PortalProvider>
        <BottomSheetModalProvider>
          <ToastProvider>
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
              <Stack.Screen
                name="place"
                options={{
                  presentation: "modal",
                  animation: "fade",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="mypage"
                options={{
                  presentation: "modal",
                  animation: "fade",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="trip"
                options={{
                  presentation: "modal",
                  animation: "fade",
                  headerShown: false,
                }}
              />
            </Stack>
          </ToastProvider>
        </BottomSheetModalProvider>
      </PortalProvider>
    </GestureHandlerRootView>
  );
}
