import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { login } from "../api/auth";

const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // 이미 로그인되어 있는 경우
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken && refreshToken) {
      navigate("/withdraw", { replace: true });
      return;
    }

    // 카카오 로그인 후 전달받은 인가 코드
    const authorizationCode = searchParams.get("code");

    if (!authorizationCode) {
      return;
    }

    const handleLogin = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await login(authorizationCode);

        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);

        // code가 URL에 남아있지 않도록 URL 정리
        window.history.replaceState({}, "", "/login");

        navigate("/withdraw", { replace: true });
      } catch (error) {
        console.error(error);

        setError(
          error instanceof Error ? error.message : "로그인에 실패했습니다.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    handleLogin();
  }, [navigate, searchParams]);

  const handleKakaoLogin = () => {
    const kakaoAuthUrl =
      `https://kauth.kakao.com/oauth/authorize` +
      `?client_id=${encodeURIComponent(KAKAO_REST_API_KEY)}` +
      `&redirect_uri=${encodeURIComponent(KAKAO_REDIRECT_URI)}` +
      `&response_type=code`;

    window.location.href = kakaoAuthUrl;
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        {/* 로고 / 서비스 이름 */}
        <div className="text-center mb-10">
          <h1 className="text-3xl tracking-tight font-gmarket-sans text-text-primary">
            소도시로
          </h1>

          <p className="mt-3 text-sm text-text-muted">
            강원도 여행을 더 쉽게 시작해보세요.
          </p>
        </div>

        {/* 로그인 카드 */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-text-primary text-center">
              로그인
            </h2>

            <p className="mt-2 text-center text-sm text-text-muted">
              카카오 계정으로 간편하게 로그인할 수 있습니다.
            </p>
          </div>

          {/* 에러 메시지 */}
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 px-4 py-3">
              <p className="text-sm leading-5 text-red-600">{error}</p>
            </div>
          )}

          {/* 카카오 로그인 */}
          <button
            type="button"
            onClick={handleKakaoLogin}
            disabled={isLoading}
            className="
              flex h-12 w-full items-center justify-center
              rounded-xl
              bg-[#FEE500]
              px-4
              text-sm 
              text-text-primary
              transition
              hover:bg-[#FDDC00]
              disabled:cursor-not-allowed
              disabled:opacity-70
              cursor-pointer
            "
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <span
                  className="
                    h-4 w-4
                    animate-spin
                    rounded-full
                    border-2
                    border-[#191919]/30
                    border-t-[#191919]
                  "
                />

                <span>로그인 중...</span>
              </div>
            ) : (
              "카카오 로그인"
            )}
          </button>
        </div>

        {/* 하단 안내 */}
        <div className={`mt-4 text-center`}>
          <a className="text-xs text-text-muted" href="/policy">
            개인정보 처리방침
          </a>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
