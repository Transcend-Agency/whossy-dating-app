import { useAuthStore } from "@/store/UserId";
import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: React.ReactNode;
  };

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const {auth} = useAuthStore();

  return auth?.uid ? auth.has_completed_onboarding ? children : <Navigate to="/onboarding" /> : <Navigate to="/auth" />;
}

export default ProtectedRoute;