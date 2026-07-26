import { signInWithKakao } from "@/lib/kakao";
import CustomButton from "../common/CustomButton";

export default function KakaoLoginButton() {
  const handleKakaoLogin = async () => {
    const result = await signInWithKakao();

    if (result.type === "success") {
      console.log("카카오 로그인 성공");
      console.log("token:", result.token);
      console.log("profile:", result.profile);

      return;
    }

    if (result.type === "cancel") {
      console.log("카카오 로그인 취소");
      return;
    }

    console.error("카카오 로그인 실패:", result.message);
  };

  return (
    <CustomButton
      type={"primary"}
      title={"카카오 로그인"}
      onPress={handleKakaoLogin}
    />
  );
}
