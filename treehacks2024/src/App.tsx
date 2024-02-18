import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./main/pages/HomePage";
import OutputPage from "./main/pages/OutputPage.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/result" element={<OutputPage />} />
      </Routes>
    </BrowserRouter>
  );
}
