import { logoutApi } from "@/api/auth";
import { LogoutIcon } from "@/assets/svgs";
import AnimatedButton from "@/components/common/animated/AnimatedButton";
import CustomText from "@/components/common/CustomText";
import { useAuthStore } from "@/stores/useAuthStore";
import { router } from "expo-router";
import { Modal, Pressable, View } from "react-native";

export default function LogoutModal({
  isVisible,
  onCancel,
}: {
  isVisible: boolean;
  onCancel: () => void;
}) {
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    await logoutApi();
    await logout();
    router.replace("/login");
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <Pressable
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        onPress={onCancel}
      >
        <View
          className="w-[80%] rounded-2xl bg-bg py-5 px-8 gap-6 items-center"
          onStartShouldSetResponder={() => true}
        >
          <View className={`p-3 rounded-full bg-primary-light`}>
            <LogoutIcon color={"#7E9432"} />
          </View>
          <View className={`items-center gap-2`}>
            <CustomText font="title">로그아웃할까요?</CustomText>
            <CustomText font="body3" className={`text-text-secondary`}>
              다시 로그인하면 소도시로를 계속 이용할 수 있어요.
            </CustomText>
          </View>
          <View className={`flex-row gap-2`}>
            <AnimatedButton
              backgroundColor={["#F5F5F5", "#EDEDED"]}
              className={`flex-1 py-4 items-center rounded-xl`}
              onPress={onCancel}
            >
              <CustomText font="body3 tight">취소</CustomText>
            </AnimatedButton>
            <AnimatedButton
              backgroundColor={["#C4D96A", "#A9C92D"]}
              className={`flex-1 py-4 items-center rounded-xl`}
              onPress={handleLogout}
            >
              <CustomText font="body3 tight">로그아웃</CustomText>
            </AnimatedButton>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}
