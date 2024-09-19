import { useAuthStore } from "@/store/UserId";
import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRoutesProps {
    children: React.ReactNode;
  };

export const ProtectedDashboard: React.FC<ProtectedRoutesProps> = ({ children }) => {
  const {auth} = useAuthStore();

  return auth?.uid ? auth.has_completed_onboarding ? children : <Navigate to="/onboarding" /> : <Navigate to="/auth" />;
}

export const ProtectedOnboarding: React.FC<ProtectedRoutesProps> = ({ children }) => {
  const {auth} = useAuthStore();

  return auth?.uid ? auth.has_completed_onboarding ? <Navigate to="/dashboard/user-profile" /> : children : <Navigate to="/auth" />;
}

// export const ProtectedAuth: React.FC<ProtectedRoutesProps> = ({ children }) => {
//   const {auth} = useAuthStore();
//   return auth?.uid ? auth.has_completed_onboarding ? <Navigate to="/dashboard/user-profile" /> : children : <Navigate to="/auth" />;
// }