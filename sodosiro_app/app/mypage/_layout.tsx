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
      <Stack.Screen name="favorite" />
    </Stack>
  );
}
