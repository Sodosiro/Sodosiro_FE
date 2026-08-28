import { Route, Routes } from "react-router-dom";
import Marker from "./pages/Index";
import Navigation from "./pages/navigation";
import PrivacyPolicy from "./pages/policy";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Marker />} />
      <Route path="/navigation" element={<Navigation />} />
      <Route path="/policy" element={<PrivacyPolicy />} />
    </Routes>
  );
}
