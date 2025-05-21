import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;