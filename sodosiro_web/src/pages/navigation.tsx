import KakaoMap from "../components/KakaoMap";

export default function Navigation() {
  return (
    <>
      <div className={`w-screen h-screen`}>
        <KakaoMap mode="navigation" />
      </div>
    </>
  );
}
