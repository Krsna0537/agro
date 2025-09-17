import { User } from "@supabase/supabase-js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Map, AlertTriangle, TrendingUp } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface RegulatorDashboardProps {
  user: User;
}

const RegulatorDashboard = ({ user }: RegulatorDashboardProps) => {
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

  return (
    <DashboardLayout
      title="Regulator Dashboard"
      user={user}
      sidebarItems={sidebarItems}
      activeTab="overview"
      onTabChange={() => {}}
      onSignOut={handleSignOut}
    >
      <div className="space-y-6">
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
    </DashboardLayout>
  );
};

export default RegulatorDashboard;