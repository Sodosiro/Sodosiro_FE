import { Stack } from "expo-router";

export default function TripLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="condition" options={{ headerShown: false }} />
      <Stack.Screen name="timeline" options={{ headerShown: false }} />
    </Stack>
  );
}
