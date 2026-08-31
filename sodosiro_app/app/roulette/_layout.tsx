import { Stack } from "expo-router";

export default function RouletteLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="result" />
      <Stack.Screen name="selectRegion" />
    </Stack>
  );
}
