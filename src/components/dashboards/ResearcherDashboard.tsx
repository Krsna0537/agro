import { useState } from "react";
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
              <p className="text-muted-foreground">Access anonymized datasets and export tools (coming soon).</p>
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
                <p className="text-muted-foreground">Researcher dashboard features coming soon...</p>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

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