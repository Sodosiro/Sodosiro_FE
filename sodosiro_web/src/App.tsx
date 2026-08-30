import { Route, Routes } from "react-router-dom";
import Marker from "./pages/Index";
import LoginPage from "./pages/login";
import Navigation from "./pages/navigation";
import PrivacyPolicy from "./pages/policy";
import WithdrawPage from "./pages/withdraw";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Marker />} />
        <Route path="/navigation" element={<Navigation />} />
      </Route>

      <Route path="/policy" element={<PrivacyPolicy />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/withdraw" element={<WithdrawPage />} />
    </Routes>
  );
}
