import { useState } from "react";
import { User } from "@supabase/supabase-js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope, Users, FileText, TrendingUp } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface VeterinarianDashboardProps {
  user: User;
}

const VeterinarianDashboard = ({ user }: VeterinarianDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      toast.error('Error signing out');
    }
  };

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: Stethoscope },
    { id: "farms", label: "Client Farms", icon: Users },
    { id: "reports", label: "Health Reports", icon: FileText },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "farms":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Client Farms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">List and manage assigned client farms (coming soon).</p>
            </CardContent>
          </Card>
        );
      case "reports":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Health Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Create and review disease reports, prescriptions, and lab submissions (coming soon).</p>
            </CardContent>
          </Card>
        );
      case "analytics":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Trends of farm visits, cases, and outcomes (coming soon).</p>
            </CardContent>
          </Card>
        );
      default:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Client Farms</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-muted-foreground">Active clients</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Visits This Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">28</div>
                  <p className="text-muted-foreground">Farm visits completed</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Health Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-muted-foreground">Pending reviews</p>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Veterinarian dashboard features coming soon...</p>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <DashboardLayout
      title="Veterinarian Dashboard"
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

export default VeterinarianDashboard;