import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
// (Stage E): ask the guest book instead of reading localStorage directly
import { useAuth } from "../context/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;