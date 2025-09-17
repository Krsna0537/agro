import { useState } from "react";
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
              <p className="text-muted-foreground">Manage and support assigned farmers (coming soon).</p>
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
              <p className="text-muted-foreground">Create and publish training modules (coming soon).</p>
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
              <p className="text-muted-foreground">Track completion and engagement metrics (coming soon).</p>
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
                <p className="text-muted-foreground">Extension worker dashboard features coming soon...</p>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

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