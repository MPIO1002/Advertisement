import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/home";
import AdminBannerPage from "./pages/admin";

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<AdminBannerPage />} />
    </Routes>
  </Router>
);

export default App;