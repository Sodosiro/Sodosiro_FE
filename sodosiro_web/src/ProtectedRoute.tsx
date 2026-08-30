import { Outlet } from "react-router-dom";

// const isWebView = (): boolean => {
//   return navigator.userAgent.includes("SodosiroAppWebView");
// };

const ProtectedRoute = () => {
  // WebView가 아니면 접근 차단
  // if (!isWebView()) {
  //   return <Navigate to="/login" replace />;
  // }

  return <Outlet />;
};

export default ProtectedRoute;
