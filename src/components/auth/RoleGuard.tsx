import { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";

interface RoleGuardProps {
  children: ReactNode;
  roles: Array<'farmer' | 'veterinarian' | 'extension_worker' | 'regulator' | 'researcher'>;
}

const RoleGuard = ({ children, roles }: RoleGuardProps) => {
  const { userRole, loading } = useAuth();

  if (loading) return null;
  if (!userRole || !roles.includes(userRole.role)) return null;
  return <>{children}</>;
};

export default RoleGuard;


