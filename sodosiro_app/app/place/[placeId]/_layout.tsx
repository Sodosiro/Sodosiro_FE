import { Stack } from "expo-router";

export default function PlaceLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="review" />
      <Stack.Screen name="photo" />
      <Stack.Screen name="reviewWrite" />
      <Stack.Screen name="[reviewId]" />
    </Stack>
  );
}
