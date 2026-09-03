import { Navigate, Outlet } from "react-router-dom";

const isWebView = (): boolean => {
  return navigator.userAgent.includes("SodosiroAppWebView");
};

const ProtectedRoute = () => {
  if (!isWebView()) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
