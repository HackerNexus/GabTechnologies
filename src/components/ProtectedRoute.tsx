import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({
  children,
}: Props) {

  const isAuthenticated =
    localStorage.getItem("adminAuth") === "true";

  return isAuthenticated
    ? <>{children}</>
    : <Navigate to="/admin-login" />;
}