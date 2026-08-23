import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MypageLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
        contentStyle: {
          backgroundColor: "white",
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      }}
    >
      <Stack.Screen name="account" />
      <Stack.Screen name="notification" />
      <Stack.Screen name="withdraw" />
    </Stack>
  );
}
