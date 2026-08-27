import { putFcmToken } from "@/api/notification";
import { getMeApi } from "@/api/user";
import NetworkStatusListener from "@/components/network/NetworkStatusListener";
import NotificationListener from "@/components/notification/NotificationListener";
import { NotificationProvider } from "@/components/notification/NotificationProvider";
import { ToastProvider } from "@/contexts/ToastProvider";
import { useLocation } from "@/hooks/useLocation";
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
import { ActivityIndicator, View } from "react-native";
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
  const isLoading = useAuthStore((state) => state.isLoading);

  const setUser = useUserStore((state) => state.setUser);

  useLocation();

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
      const fcmToken = await registerForPushNotificationsAsync();
      const deviceId = Application.getAndroidId();

      if (fcmToken) {
        await putFcmToken(deviceId, fcmToken);
      }
    };

    registerPushToken();
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <ActivityIndicator size={24} color="#1a1a1a" />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: "white" }}>
        <NotificationProvider>
          <NotificationListener />
          <ToastProvider>
            <NetworkStatusListener />
            <PortalProvider>
              <BottomSheetModalProvider>
                <Stack>
                  {/* 로그인 안 한 상태 */}
                  <Stack.Protected guard={!isAuthenticated}>
                    <Stack.Screen
                      name="login"
                      options={{
                        headerShown: false,
                      }}
                    />
                  </Stack.Protected>

                  {/* 로그인한 상태 */}
                  <Stack.Protected guard={isAuthenticated}>
                    <Stack.Screen
                      name="(tabs)"
                      options={{
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
                      name="explore"
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
                  </Stack.Protected>
                </Stack>
              </BottomSheetModalProvider>
            </PortalProvider>
          </ToastProvider>
        </NotificationProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
