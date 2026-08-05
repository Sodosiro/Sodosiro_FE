import { useAuthStore } from "@/stores/useAuthStore";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const isLoading = useAuthStore((state) => state.isLoading);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated) {
      router.dismissAll();
      router.replace("/(tabs)");
    } else {
      router.replace("/login");
    }
  }, [isLoading, isAuthenticated]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <ActivityIndicator size={24} color={"#1a1a1a"} />
      </View>
    );
  }

  return null;
}
