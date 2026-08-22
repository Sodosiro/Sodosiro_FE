import { putFcmToken } from "@/api/notification";
import { getMeApi } from "@/api/user";
import { ToastProvider } from "@/contexts/ToastProvider";
import { registerForPushNotificationsAsync } from "@/lib/pushNotification";
import { queryClient } from "@/lib/queryClient";
import { useAuthStore } from "@/stores/useAuthStore";
import { useUserStore } from "@/stores/useUserStore";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PortalProvider } from "@gorhom/portal";
import { QueryClientProvider } from "@tanstack/react-query";
import * as Application from "expo-application";
import { useFonts } from "expo-font";
import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { LocaleConfig } from "react-native-calendars";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import "../global.css";
export const unstable_settings = {
  anchor: "(tabs)",
};

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    // false로 하면 백그라운드에서만 알림 뜨고 앱 실행중엔 메시지만 받음
    // true로 하면 앱 실행중에도 알림 뜸
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: false,
    shouldShowList: false,
  }),
});

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
  dayNames: [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ],
  dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
  today: "오늘",
};

LocaleConfig.defaultLocale = "kr";

export default function RootLayout() {
  useFonts({
    PretendardBold: require("../assets/fonts/Pretendard-Bold.otf"),
    PretendardSemiBold: require("../assets/fonts/Pretendard-SemiBold.otf"),
    PretendardMedium: require("../assets/fonts/Pretendard-Medium.otf"),
    GmarketSansMedium: require("../assets/fonts/GmarketSansMedium.otf"),
  });

  const initialize = useAuthStore((state) => state.initialize);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getMeApi();
      setUser(user);
    };

    if (isAuthenticated) {
      fetchUser();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const registerPushToken = async () => {
      try {
        const fcmToken = await registerForPushNotificationsAsync();
        const deviceId = Application.getAndroidId();

        putFcmToken(deviceId, fcmToken);
      } catch (error) {
        console.error("FCM 등록 실패:", error);
      }
    };

    registerPushToken();
  }, [isAuthenticated]);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("🔔 알림 받음:", notification);
      },
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: "white" }}>
        <ToastProvider>
          <PortalProvider>
            <BottomSheetModalProvider>
              <Stack>
                <Stack.Screen
                  name="index"
                  options={{
                    presentation: "modal",
                    animation: "fade",
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="(tabs)"
                  options={{
                    presentation: "modal",
                    animation: "fade",
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="(home)"
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
                <Stack.Screen
                  name="feed"
                  options={{
                    presentation: "modal",
                    animation: "fade",
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="login"
                  options={{
                    presentation: "modal",
                    animation: "fade",
                    headerShown: false,
                  }}
                />
              </Stack>
            </BottomSheetModalProvider>
          </PortalProvider>
        </ToastProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
