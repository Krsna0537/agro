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

  return (
    <DashboardLayout
      title="Researcher Dashboard"
      user={user}
      sidebarItems={sidebarItems}
      activeTab="overview"
      onTabChange={() => {}}
      onSignOut={handleSignOut}
    >
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
    </DashboardLayout>
  );
};

export default ResearcherDashboard;