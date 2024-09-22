import { auth } from "@/firebase";
import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = auth.currentUser;

  // return user ? children : <Navigate to="/auth" />;
  return children
}

export default ProtectedRoute;