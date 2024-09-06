import { auth } from "@/firebase";
import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    children: React.ReactNode;
  };

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const user = auth.currentUser;

  return user ? children : <Navigate to="/auth" />;
}

export default PrivateRoute;