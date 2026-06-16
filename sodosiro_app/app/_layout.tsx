import { Stack } from 'expo-router';;
import 'react-native-reanimated';
import { useFonts } from 'expo-font';

import "../global.css";

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {

  const [loaded] = useFonts({
    Pretendard: require("../assets/fonts/PretendardVariable.ttf"),
  });

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
