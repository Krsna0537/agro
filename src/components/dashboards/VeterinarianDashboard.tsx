import { useEffect, useMemo, useState } from "react";
import { User } from "@supabase/supabase-js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Stethoscope, Users, FileText, TrendingUp } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface VeterinarianDashboardProps {
  user: User;
}

const VeterinarianDashboard = ({ user }: VeterinarianDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);
  const [farms, setFarms] = useState<Array<{ id: string; name: string; location: string; farm_type: string }>>([]);
  const [reports, setReports] = useState<Array<{ id: string; farm_id: string; status: string; risk_score: number | null; created_at: string }>>([]);

  // Create report state
  const [newReportFarmId, setNewReportFarmId] = useState<string>("");
  const [newReportCreating, setNewReportCreating] = useState(false);

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

  const loadData = async () => {
    setLoading(true);
    try {
      // Farms that have at least one assessment by this vet (assessor_id)
      const { data: assessmentsByMe } = await supabase
        .from('biosecurity_assessments')
        .select('farm_id')
        .eq('assessor_id', user.id);

      const farmIds = Array.from(new Set((assessmentsByMe || []).map(a => a.farm_id)));

      if (farmIds.length > 0) {
        const { data: farmRows } = await supabase
          .from('farms')
          .select('id, name, location, farm_type')
          .in('id', farmIds);
        setFarms(farmRows as any || []);
      } else {
        setFarms([]);
      }

      // My reports
      const { data: myReports } = await supabase
        .from('biosecurity_assessments')
        .select('id, farm_id, status, risk_score, created_at')
        .eq('assessor_id', user.id)
        .order('created_at', { ascending: false });
      setReports(myReports as any || []);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  const farmOptions = useMemo(() => farms.map(f => (
    <SelectItem key={f.id} value={f.id}>{f.name} • {f.location}</SelectItem>
  )), [farms]);

  const createDraftReport = async () => {
    if (!newReportFarmId) {
      toast.error('Select a farm');
      return;
    }
    try {
      setNewReportCreating(true);
      const { error } = await supabase.from('biosecurity_assessments').insert({
        farm_id: newReportFarmId,
        assessor_id: user.id,
        status: 'draft',
        assessment_data: {},
      } as any);
      if (error) throw error;
      toast.success('Draft report created');
      setNewReportFarmId("");
      loadData();
    } catch (e) {
      console.error(e);
      toast.error('Failed to create report');
    } finally {
      setNewReportCreating(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "farms":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Client Farms</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <div className="space-y-3">
                  {farms.map((f) => (
                    <div key={f.id} className="p-4 border rounded-lg">
                      <div className="font-medium">{f.name}</div>
                      <div className="text-sm text-muted-foreground">{f.location} • {f.farm_type}</div>
                    </div>
                  ))}
                  {farms.length === 0 && (
                    <p className="text-muted-foreground">No client farms yet. Create a report to link a farm.</p>
                  )}
                </div>
              )}
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
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="space-y-2">
                  <Label>Select Farm</Label>
                  <Select value={newReportFarmId} onValueChange={setNewReportFarmId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose from your client farms" />
                    </SelectTrigger>
                    <SelectContent>
                      {farmOptions}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button onClick={createDraftReport} disabled={newReportCreating}>
                    Create Draft Report
                  </Button>
                </div>
              </div>

              {loading ? (
                <p>Loading...</p>
              ) : (
                <div className="space-y-3">
                  {reports.map((r) => (
                    <div key={r.id} className="p-4 border rounded-lg">
                      <div className="font-medium">Assessment {r.id.slice(0, 8)} • {r.status}</div>
                      <div className="text-sm text-muted-foreground">Risk: {r.risk_score ?? '-'} • {new Date(r.created_at).toLocaleString()}</div>
                    </div>
                  ))}
                  {reports.length === 0 && <p className="text-muted-foreground">No reports yet.</p>}
                </div>
              )}
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
              <p className="text-muted-foreground">Trends of farm visits, cases, and outcomes will appear here.</p>
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
                  <div className="text-2xl font-bold">{farms.length}</div>
                  <p className="text-muted-foreground">Active clients</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Visits This Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{reports.length}</div>
                  <p className="text-muted-foreground">Assessments created</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Health Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{reports.filter(r => r.status !== 'completed').length}</div>
                  <p className="text-muted-foreground">Pending reviews</p>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Latest activity from your assessments will appear here.</p>
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