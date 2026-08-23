import { Stack } from "expo-router";

export default function MypageLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      <Stack.Screen name="edit" />
      <Stack.Screen name="like" />
      <Stack.Screen name="review" />
      <Stack.Screen name="setting" />
    </Stack>
  );
}
