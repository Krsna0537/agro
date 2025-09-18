import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users, BookOpen, TrendingUp } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface ExtensionWorkerDashboardProps {
  user: User;
}

const ExtensionWorkerDashboard = ({ user }: ExtensionWorkerDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [farmers, setFarmers] = useState<Array<{ user_id: string; first_name: string; last_name: string; location: string | null }>>([]);
  const [modules, setModules] = useState<any[]>([]);
  const [progress, setProgress] = useState<any[]>([]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      toast.error('Error signing out');
    }
  };

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: GraduationCap },
    { id: "farmers", label: "Farmers", icon: Users },
    { id: "training", label: "Training Content", icon: BookOpen },
    { id: "progress", label: "Progress Tracking", icon: TrendingUp },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "farmers":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Farmers</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <div className="space-y-3">
                  {farmers.map((f) => (
                    <div key={f.user_id} className="p-4 border rounded-lg">
                      <div className="font-medium">{f.first_name} {f.last_name}</div>
                      <div className="text-sm text-muted-foreground">{f.location ?? 'Location not set'}</div>
                    </div>
                  ))}
                  {farmers.length === 0 && <p className="text-muted-foreground">No farmers found.</p>}
                </div>
              )}
            </CardContent>
          </Card>
        );
      case "training":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Training Content</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <div className="space-y-3">
                  {modules.map((m) => (
                    <div key={m.id} className="p-4 border rounded-lg">
                      <div className="font-medium">{m.title}</div>
                      <div className="text-sm text-muted-foreground">{m.farm_type ?? 'All'} • {m.duration_minutes ?? '-'} min • {m.is_published ? 'Published' : 'Draft'}</div>
                    </div>
                  ))}
                  {modules.length === 0 && <p className="text-muted-foreground">No modules yet.</p>}
                </div>
              )}
              <div className="mt-4">
                <Button size="sm" onClick={() => navigate('/admin/training')}>Create/Manage Modules</Button>
              </div>
            </CardContent>
          </Card>
        );
      case "progress":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Progress Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <div className="space-y-3">
                  {progress.map((p) => (
                    <div key={p.id} className="p-4 border rounded-lg">
                      <div className="font-medium">{p.user_id.slice(0, 8)} • {p.module?.title ?? p.module_id}</div>
                      <div className="text-sm text-muted-foreground">{p.progress_percentage ?? 0}% • {p.completed ? 'Completed' : 'In Progress'}</div>
                    </div>
                  ))}
                  {progress.length === 0 && <p className="text-muted-foreground">No progress records.</p>}
                </div>
              )}
            </CardContent>
          </Card>
        );
      default:
        return (
          <div className="space-y-6">
            <div className="flex justify-end">
              <Button size="sm" onClick={() => navigate('/admin/training')}>Manage Training</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Assigned Farmers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">35</div>
                  <p className="text-muted-foreground">In your region</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Training Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-muted-foreground">This month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Completion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">78%</div>
                  <p className="text-muted-foreground">Average progress</p>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Latest activity from farmers and training modules will appear here.</p>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        // Farmers: all profiles with role farmer
        const { data: farmerRoles } = await supabase
          .from('user_roles')
          .select('user_id')
          .eq('role', 'farmer');
        const farmerIds = (farmerRoles || []).map(r => r.user_id);
        if (farmerIds.length > 0) {
          const { data: farmerProfiles } = await supabase
            .from('profiles')
            .select('user_id, first_name, last_name, location')
            .in('user_id', farmerIds);
          setFarmers(farmerProfiles as any || []);
        } else {
          setFarmers([]);
        }

        // Training modules
        const { data: moduleRows } = await supabase
          .from('training_modules')
          .select('*')
          .order('created_at', { ascending: false });
        setModules(moduleRows || []);

        // Training progress with simple join (get module title separately)
        const { data: progressRows } = await supabase
          .from('user_training_progress')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(25);
        // Attach module title
        const moduleMap = new Map((moduleRows || []).map(m => [m.id, m]));
        setProgress((progressRows || []).map(r => ({ ...r, module: moduleMap.get(r.module_id) })));
      } catch (e) {
        console.error(e);
        toast.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <DashboardLayout
      title="Extension Worker Dashboard"
      user={user}
      sidebarItems={sidebarItems}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onSignOut={handleSignOut}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default ExtensionWorkerDashboard;