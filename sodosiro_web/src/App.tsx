import { Route, Routes } from "react-router-dom";
import Marker from "./pages/Index";
import Navigation from "./pages/navigation";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Marker />} />
      <Route path="/navigation" element={<Navigation />} />
    </Routes>
  );
}
