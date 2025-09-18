import { useEffect, useMemo, useState } from "react";
import { User } from "@supabase/supabase-js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, Map, AlertTriangle, TrendingUp } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface RegulatorDashboardProps {
  user: User;
}

const RegulatorDashboard = ({ user }: RegulatorDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeAlerts, setActiveAlerts] = useState<any[]>([]);
  const [recentAssessments, setRecentAssessments] = useState<any[]>([]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      toast.error('Error signing out');
    }
  };

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: Building },
    { id: "surveillance", label: "Surveillance", icon: Map },
    { id: "alerts", label: "Alert Management", icon: AlertTriangle },
    { id: "analytics", label: "Policy Analytics", icon: TrendingUp },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "surveillance":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Surveillance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Heatmaps and regional monitoring (coming soon).</p>
            </CardContent>
          </Card>
        );
      case "alerts":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Alert Management</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <div className="space-y-3">
                  {activeAlerts.map((a) => (
                    <div key={a.id} className="p-4 border rounded-lg">
                      <div className="font-medium">[{a.severity.toUpperCase()}] {a.title}</div>
                      <div className="text-sm text-muted-foreground">{a.location ?? 'All regions'} • {a.farm_type ?? 'All'} • {new Date(a.created_at).toLocaleString()}</div>
                      <div className="text-sm">{a.message}</div>
                    </div>
                  ))}
                  {activeAlerts.length === 0 && <p className="text-muted-foreground">No active alerts.</p>}
                </div>
              )}
              <div className="mt-4">
                <Button size="sm" onClick={() => navigate('/admin/alerts')}>Manage Alerts</Button>
              </div>
            </CardContent>
          </Card>
        );
      case "analytics":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Policy Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Compliance status by region and trends (coming soon).</p>
            </CardContent>
          </Card>
        );
      default:
        return (
          <div className="space-y-6">
            <div className="flex justify-end">
              <Button size="sm" onClick={() => navigate('/admin/alerts')}>Manage Alerts</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Registered Farms</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,247</div>
                  <p className="text-muted-foreground">In jurisdiction</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Active Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{activeAlerts.length}</div>
                  <p className="text-muted-foreground">Require attention</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Compliance Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">92%</div>
                  <p className="text-muted-foreground">Regional average</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Risk Assessments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{recentAssessments.length}</div>
                  <p className="text-muted-foreground">This quarter</p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Regional Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentAssessments.map(r => (
                    <div key={r.id} className="p-4 border rounded-lg">
                      <div className="font-medium">Assessment {r.id.slice(0,8)} • {r.status}</div>
                      <div className="text-sm text-muted-foreground">Risk: {r.risk_score ?? '-'} • Farm {r.farm_id.slice(0,8)} • {new Date(r.created_at).toLocaleString()}</div>
                    </div>
                  ))}
                  {recentAssessments.length === 0 && <p className="text-muted-foreground">No recent assessments.</p>}
                </div>
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
        const { data: alerts } = await supabase
          .from('alerts')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(25);
        setActiveAlerts(alerts || []);

        const { data: assessments } = await supabase
          .from('biosecurity_assessments')
          .select('id, farm_id, status, risk_score, created_at')
          .order('created_at', { ascending: false })
          .limit(25);
        setRecentAssessments(assessments || []);
      } catch (e) {
        console.error(e);
        toast.error('Failed to load regulator data');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <DashboardLayout
      title="Regulator Dashboard"
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

export default RegulatorDashboard;