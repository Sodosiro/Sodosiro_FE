import { Stack } from 'expo-router';;
import 'react-native-reanimated';
import { useFonts } from 'expo-font';

import "../global.css";

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {

  useFonts({
    Pretendard: require("../assets/fonts/PretendardVariable.ttf"),
  });

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ presentation: "modal", animation: "fade", headerShown: false }} />
      <Stack.Screen name="explore/search" options={{ presentation: "modal", animation: "fade", headerShown: false }} />
    </Stack>
  );
}
