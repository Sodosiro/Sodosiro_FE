import { Stack } from "expo-router";

export default function ExploreLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      <Stack.Screen name="search" />
      <Stack.Screen name="nearbyLiked" />
    </Stack>
  );
}
