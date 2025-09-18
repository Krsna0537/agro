import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

const ProtectedRoute = ({ children, redirectTo = "/auth" }: ProtectedRouteProps) => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('ProtectedRoute - loading:', loading, 'isAuthenticated:', isAuthenticated);
    if (!loading && !isAuthenticated) {
      console.log('Redirecting to:', redirectTo);
      navigate(redirectTo);
    }
  }, [loading, isAuthenticated, navigate, redirectTo]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }
  if (!isAuthenticated) return null;
  return <>{children}</>;
};

export default ProtectedRoute;


