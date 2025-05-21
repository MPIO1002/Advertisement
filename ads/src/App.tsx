import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import AdminBannerPage from "./pages/admin";
import LoginPage from "./pages/login";
import ProtectedRoute from "./components/protected-route";

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminBannerPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  </Router>
);

export default App;