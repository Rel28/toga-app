import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import KatalogToga from "./pages/KatalogToga";
import RekomendasiSPK from "./pages/RekomendasiSPK";
import HasilSPK from "./pages/HasilSPK";
import DetailToga from "./pages/DetailToga";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import DataTabel from "./pages/admin/DataTabel";
import Tentang from "./pages/Tentang";
import Chatbot from "./components/ChatBot";
import LoginAdmin from "./components/admin/LoginAdmin";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    return null;
  };

  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/katalog-toga" element={<KatalogToga />} />
          <Route path="/rekomendasi" element={<RekomendasiSPK />} />
          <Route path="/katalog-toga/:id" element={<DetailToga />} />
          <Route path="/hasil-spk" element={<HasilSPK />} />
          <Route path="/admin/login" element={<LoginAdmin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <DashboardAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/table-data"
            element={
              <ProtectedRoute>
                <DataTabel />
              </ProtectedRoute>
            }
          />
          <Route path="/tentang" element={<Tentang />} />
        </Routes>
      </Router>

      <Chatbot />
    </>
  );
};

export default App;
