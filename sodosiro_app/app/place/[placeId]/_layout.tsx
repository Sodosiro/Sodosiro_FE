import { Stack } from "expo-router";

export default function PlaceLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="review" options={{ headerShown: false }} />
      <Stack.Screen name="photo" options={{ headerShown: false }} />
      <Stack.Screen name="reviewWrite" options={{ headerShown: false }} />
    </Stack>
  );
}
