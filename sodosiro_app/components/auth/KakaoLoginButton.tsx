import { signInWithKakao } from "@/lib/kakao";
import CustomButton from "../common/CustomButton";

export default function KakaoLoginButton() {
  const handleKakaoLogin = async () => {
    const result = await signInWithKakao();

    if (result.type === "success") {
      return;
    }

    if (result.type === "cancel") {
      return;
    }
  };

  return (
    <CustomButton
      type={"primary"}
      title={"카카오 로그인"}
      onPress={handleKakaoLogin}
    />
  );
}
