import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import MedicineDetailPage from "./pages/MedicineDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/medicine/:id" element={<MedicineDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;