import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FlaskConical, BarChart, FileText, Users } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ResearcherDashboardProps {
  user: User;
}

const ResearcherDashboard = ({ user }: ResearcherDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);
  const [datasets, setDatasets] = useState<any[]>([]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      toast.error('Error signing out');
    }
  };

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: FlaskConical },
    { id: "data", label: "Research Data", icon: BarChart },
    { id: "studies", label: "Active Studies", icon: FileText },
    { id: "collaboration", label: "Collaboration", icon: Users },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "data":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Research Data</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <div className="space-y-3">
                  {datasets.map((d) => (
                    <div key={d.id} className="p-4 border rounded-lg">
                      <div className="font-medium">Assessment {d.id.slice(0,8)} • Risk {d.risk_score ?? '-'}</div>
                      <div className="text-sm text-muted-foreground">Farm {d.farm_id.slice(0,8)} • {new Date(d.created_at).toLocaleString()}</div>
                    </div>
                  ))}
                  {datasets.length === 0 && <p className="text-muted-foreground">No anonymized data available.</p>}
                </div>
              )}
            </CardContent>
          </Card>
        );
      case "studies":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Active Studies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Manage IRB approvals and study protocols (coming soon).</p>
            </CardContent>
          </Card>
        );
      case "collaboration":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Collaboration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Collaborator directory and messaging (coming soon).</p>
            </CardContent>
          </Card>
        );
      default:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Active Studies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4</div>
                  <p className="text-muted-foreground">Ongoing research</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Data Points</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12.5k</div>
                  <p className="text-muted-foreground">Collected samples</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Collaborators</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18</div>
                  <p className="text-muted-foreground">Research partners</p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Research Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Researcher dashboard features will appear here.</p>
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
        const { data } = await supabase
          .from('biosecurity_assessments')
          .select('id, farm_id, risk_score, created_at, status')
          .order('created_at', { ascending: false })
          .limit(50);
        setDatasets(data || []);
      } catch (e) {
        console.error(e);
        toast.error('Failed to load research dataset');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <DashboardLayout
      title="Researcher Dashboard"
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

export default ResearcherDashboard;