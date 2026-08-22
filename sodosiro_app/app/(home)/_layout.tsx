import { Stack } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeLayout() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}
      >
        <Stack.Screen name="festival" />
        <Stack.Screen name="popular" />
        <Stack.Screen name="notification" />
      </Stack>
    </View>
  );
}
