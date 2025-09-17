import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

const ProtectedRoute = ({ children, redirectTo = "/auth" }: ProtectedRouteProps) => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate(redirectTo);
    }
  }, [loading, isAuthenticated, navigate, redirectTo]);

  if (loading) return null;
  if (!isAuthenticated) return null;
  return <>{children}</>;
};

export default ProtectedRoute;


