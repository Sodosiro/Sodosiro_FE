import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMe, withdraw } from "../api/auth";

const WithdrawPage = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [nickName, setNickName] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken || !refreshToken) {
      navigate("/login", { replace: true });
      return;
    }

    const fetchMe = async () => {
      try {
        const response = await getMe(accessToken);

        setNickName(response?.nickName);
      } catch (error) {
        console.error(error);

        // accessToken이 만료되었거나 인증에 실패한 경우
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        navigate("/login", { replace: true });
      }
    };

    fetchMe();
  }, [navigate]);

  const handleWithdraw = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken || !refreshToken) {
      navigate("/login", { replace: true });
      return;
    }

    const confirmed = window.confirm(
      "정말 탈퇴하시겠습니까?\n탈퇴 후에는 계정을 복구할 수 없습니다.",
    );

    if (!confirmed) {
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      await withdraw(accessToken, refreshToken);

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      navigate("/login", { replace: true });
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error ? error.message : "회원 탈퇴에 실패했습니다.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-5">
      <div className="w-full max-w-sm">
        {/* 서비스 이름 */}
        <div className="mb-10 text-center">
          <h1 className="font-gmarket-sans text-3xl tracking-tight text-text-primary">
            소도시로
          </h1>
        </div>

        {/* 탈퇴 카드 */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          {/* 아이콘 */}
          <div className="mb-5 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-light">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-7 w-7 text-primary-dark"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v4m0 4h.01M10.34 3.94 2.92 17a2 2 0 0 0 1.74 3h14.68a2 2 0 0 0 1.74-3L13.66 3.94a2 2 0 0 0-3.32 0Z"
                />
              </svg>
            </div>
          </div>

          {/* 제목 */}
          <div className="text-center">
            <h2 className="text-xl font-semibold text-text-primary">
              회원 탈퇴
            </h2>

            <p className="mt-3 text-sm leading-6 text-text-secondary">
              <span className="font-medium text-text-primary">{nickName}</span>
              님, 정말 소도시로를 탈퇴하시겠습니까?
              <br />
              탈퇴 후에는 계정을 복구할 수 없습니다.
            </p>
          </div>

          {/* 안내 사항 */}
          <div className="mt-6 rounded-xl bg-gray-50 px-4 py-4">
            <p className="text-sm font-medium text-text-primary">
              탈퇴 전 확인해주세요.
            </p>

            <ul className="mt-3 space-y-2 text-sm leading-5 text-text-muted">
              <li className="flex gap-2">
                <span className="text-primary-dark">•</span>
                <span>회원 정보가 삭제됩니다.</span>
              </li>

              <li className="flex gap-2">
                <span className="text-primary-dark">•</span>
                <span>탈퇴 후 계정을 복구할 수 없습니다.</span>
              </li>

              <li className="flex gap-2">
                <span className="text-primary-dark">•</span>
                <span>서비스 이용 기록이 삭제될 수 있습니다.</span>
              </li>
            </ul>
          </div>

          {/* 에러 메시지 */}
          {error && (
            <div className="mt-4 rounded-xl bg-red-50 px-4 py-3">
              <p className="text-sm leading-5 text-red-600">{error}</p>
            </div>
          )}

          {/* 탈퇴 버튼 */}
          <button
            type="button"
            onClick={handleWithdraw}
            disabled={isLoading}
            className="
              mt-6
              flex h-12 w-full items-center justify-center
              rounded-xl
              bg-primary
              px-4
              text-sm
              text-text-primary
              transition
              hover:bg-primary-hover
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
                    border-text-primary/30
                    border-t-text-primary
                  "
                />

                <span>탈퇴 처리 중...</span>
              </div>
            ) : (
              "회원 탈퇴"
            )}
          </button>
        </div>

        {/* 하단 안내 */}
        <p className="mt-6 text-center text-xs text-text-muted">
          탈퇴를 원하지 않는 경우 이 페이지를 닫아주세요.
        </p>
      </div>
    </main>
  );
};

export default WithdrawPage;
