import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import FarmerDashboard from "@/components/dashboards/FarmerDashboard";
import VeterinarianDashboard from "@/components/dashboards/VeterinarianDashboard";
import ExtensionWorkerDashboard from "@/components/dashboards/ExtensionWorkerDashboard";
import RegulatorDashboard from "@/components/dashboards/RegulatorDashboard";
import ResearcherDashboard from "@/components/dashboards/ResearcherDashboard";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user role
          setTimeout(async () => {
            try {
              const { data: roles, error } = await supabase
                .from('user_roles')
                .select('role')
                .eq('user_id', session.user.id)
                .single();

              if (error) {
                console.error('Error fetching user role:', error);
                toast.error('Error loading user role');
                return;
              }

              setUserRole(roles?.role || null);
            } catch (error) {
              console.error('Error in role fetch:', error);
            } finally {
              setLoading(false);
            }
          }, 0);
        } else {
          setUserRole(null);
          setLoading(false);
          navigate('/auth');
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session) {
        navigate('/auth');
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading dashboard...</span>
        </div>
      </div>
    );
  }

  if (!user || !userRole) {
    return null;
  }

  const renderDashboard = () => {
    switch (userRole) {
      case 'farmer':
        return <FarmerDashboard user={user} />;
      case 'veterinarian':
        return <VeterinarianDashboard user={user} />;
      case 'extension_worker':
        return <ExtensionWorkerDashboard user={user} />;
      case 'regulator':
        return <RegulatorDashboard user={user} />;
      case 'researcher':
        return <ResearcherDashboard user={user} />;
      default:
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Unknown Role</h1>
              <p className="text-muted-foreground">
                Your account role is not recognized. Please contact support.
              </p>
            </div>
          </div>
        );
    }
  };

  return renderDashboard();
};

export default Dashboard;