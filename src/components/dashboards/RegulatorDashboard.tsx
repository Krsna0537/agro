import { useState } from "react";
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
              <p className="text-muted-foreground">Create, publish, and retire alerts (coming soon).</p>
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
                  <div className="text-2xl font-bold">3</div>
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
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-muted-foreground">This quarter</p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Regional Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Regulator dashboard features coming soon...</p>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

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