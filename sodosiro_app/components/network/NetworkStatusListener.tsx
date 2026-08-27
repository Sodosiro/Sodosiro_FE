import { useToast } from "@/contexts/ToastProvider";
import { useNetworkStore } from "@/stores/useNetworkStore";
import NetInfo from "@react-native-community/netinfo";
import { useEffect } from "react";

export default function NetworkStatusListener() {
  const { showToast } = useToast();
  const isOffline = useNetworkStore((state) => state.isOffline);
  const setIsOffline = useNetworkStore((state) => state.setIsOffline);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const offline =
        state.isConnected !== true || state.isInternetReachable === false;

      // 오프라인 상태가 새롭게 되었을 때만 토스트
      if (offline && !isOffline) {
        showToast("인터넷 연결이 끊겼어요.");
      }

      setIsOffline(offline);
    });

    return unsubscribe;
  }, [isOffline]);

  return null;
}
