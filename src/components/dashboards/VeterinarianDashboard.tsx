import { useEffect, useMemo, useState } from "react";
import { User } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Stethoscope, 
  Users, 
  FileText, 
  TrendingUp, 
  Activity,
  Shield,
  AlertTriangle,
  CheckCircle,
  Calendar,
  MapPin,
  BarChart3,
  Plus,
  Eye,
  Edit,
  Clock
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { AnimatedCard, StatCard } from "@/components/ui/animated-card";
import { DashboardSkeleton } from "@/components/ui/loading-skeleton";
import { ProgressRing } from "@/components/ui/progress-ring";
import { MetricCard, BarChart, TrendChart } from "@/components/ui/data-visualization";
import { fadeInUp, staggerContainer, slideInFromTop } from "@/lib/animations";

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatedCard>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-accent" />
                  Client Farms
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="p-4 border rounded-lg animate-pulse">
                        <div className="h-4 bg-muted rounded w-1/3 mb-2"></div>
                        <div className="h-3 bg-muted rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <motion.div 
                    className="space-y-4"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                  >
                    {farms.map((farm, index) => (
                      <motion.div
                        key={farm.id}
                        variants={fadeInUp}
                        className="p-6 border rounded-xl hover:shadow-lg transition-all duration-300 hover:bg-muted/50"
                        whileHover={{ y: -2 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-accent/10 rounded-lg">
                              <Stethoscope className="h-6 w-6 text-accent" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-lg">{farm.name}</h4>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                {farm.location}
                              </div>
                            </div>
                          </div>
                          <div className="text-right space-y-2">
                            <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                              {farm.farm_type}
                            </Badge>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4 mr-1" />
                                Assess
                              </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    {farms.length === 0 && (
                      <motion.div 
                        className="text-center py-12"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Users className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
                        <h3 className="text-xl font-semibold mb-3">No Client Farms Yet</h3>
                        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                          Create a health report to link a farm to your practice.
                        </p>
                        <Button onClick={() => setActiveTab("reports")} size="lg" className="bg-accent hover:bg-accent/90">
                          <Plus className="h-5 w-5 mr-2" />
                          Create First Report
                        </Button>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </CardContent>
            </AnimatedCard>
          </motion.div>
        );
        
      case "reports":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <AnimatedCard>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-accent" />
                  Create New Health Report
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
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
                    <Button 
                      onClick={createDraftReport} 
                      disabled={newReportCreating}
                      className="bg-accent hover:bg-accent/90"
                    >
                      {newReportCreating ? (
                        <>
                          <Clock className="h-4 w-4 mr-2 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4 mr-2" />
                          Create Draft Report
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </AnimatedCard>

            <AnimatedCard>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-accent" />
                  Health Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="p-4 border rounded-lg animate-pulse">
                        <div className="h-4 bg-muted rounded w-1/3 mb-2"></div>
                        <div className="h-3 bg-muted rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <motion.div 
                    className="space-y-4"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                  >
                    {reports.map((report, index) => (
                      <motion.div
                        key={report.id}
                        variants={fadeInUp}
                        className="p-6 border rounded-xl hover:shadow-lg transition-all duration-300"
                        whileHover={{ y: -2 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-lg ${
                              report.status === 'completed' ? 'bg-green-100' : 
                              report.status === 'draft' ? 'bg-yellow-100' : 'bg-blue-100'
                            }`}>
                              <FileText className={`h-6 w-6 ${
                                report.status === 'completed' ? 'text-green-600' : 
                                report.status === 'draft' ? 'text-yellow-600' : 'text-blue-600'
                              }`} />
                            </div>
                            <div>
                              <h4 className="font-semibold text-lg">
                                Assessment {report.id.slice(0, 8)}
                              </h4>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {new Date(report.created_at).toLocaleDateString()}
                                </div>
                                <Badge variant="outline" className={
                                  report.status === 'completed' ? 'bg-green-100 text-green-700' : 
                                  report.status === 'draft' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                                }>
                                  {report.status}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="text-right space-y-2">
                            {report.risk_score && (
                              <div className="flex items-center gap-2">
                                <Shield className="h-4 w-4 text-accent" />
                                <span className="font-medium">Risk: {report.risk_score}</span>
                              </div>
                            )}
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    {reports.length === 0 && (
                      <motion.div 
                        className="text-center py-12"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
                        <h3 className="text-xl font-semibold mb-3">No Reports Yet</h3>
                        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                          Create your first health assessment report for a client farm.
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </CardContent>
            </AnimatedCard>
          </motion.div>
        );
        
      case "analytics":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnimatedCard>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-accent" />
                    Assessment Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <TrendChart
                    data={[
                      { date: "Jan", value: 8 },
                      { date: "Feb", value: 12 },
                      { date: "Mar", value: 15 },
                      { date: "Apr", value: 18 },
                      { date: "May", value: 22 },
                      { date: "Jun", value: 25 }
                    ]}
                  />
                </CardContent>
              </AnimatedCard>

              <AnimatedCard>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-accent" />
                    Risk Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <BarChart
                    data={[
                      { label: "Low Risk", value: 45, color: "bg-green-500" },
                      { label: "Medium Risk", value: 35, color: "bg-yellow-500" },
                      { label: "High Risk", value: 20, color: "bg-red-500" }
                    ]}
                  />
                </CardContent>
              </AnimatedCard>
            </div>

            <AnimatedCard>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <ProgressRing progress={85} size={80} color="#10b981" />
                    <p className="text-sm text-muted-foreground mt-2">Completion Rate</p>
                  </div>
                  <div className="text-center">
                    <ProgressRing progress={72} size={80} color="#3b82f6" />
                    <p className="text-sm text-muted-foreground mt-2">Client Satisfaction</p>
                  </div>
                  <div className="text-center">
                    <ProgressRing progress={68} size={80} color="#8b5cf6" />
                    <p className="text-sm text-muted-foreground mt-2">Risk Reduction</p>
                  </div>
                </div>
              </CardContent>
            </AnimatedCard>
          </motion.div>
        );
        
      default:
        return (
          <motion.div 
            className="space-y-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Client Farms"
                value={farms.length}
                icon={<Users className="h-5 w-5 text-blue-500" />}
                trend={{ value: 8, isPositive: true }}
                delay={0}
              />
              
              <StatCard
                title="Assessments This Month"
                value={reports.length}
                icon={<Stethoscope className="h-5 w-5 text-green-500" />}
                trend={{ value: 15, isPositive: true }}
                delay={0.1}
              />
              
              <StatCard
                title="Pending Reviews"
                value={reports.filter(r => r.status !== 'completed').length}
                icon={<Clock className="h-5 w-5 text-orange-500" />}
                delay={0.2}
              />
              
              <StatCard
                title="Average Risk Score"
                value={reports.length > 0 ? Math.round(reports.reduce((sum, r) => sum + (r.risk_score || 0), 0) / reports.length) : 0}
                icon={<Shield className="h-5 w-5 text-purple-500" />}
                delay={0.3}
              />
            </div>

            {/* Progress Rings Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <AnimatedCard delay={0.4}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-accent" />
                    Report Completion
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <ProgressRing progress={85} size={100} color="#10b981" />
                </CardContent>
              </AnimatedCard>

              <AnimatedCard delay={0.5}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-accent" />
                    Client Engagement
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <ProgressRing progress={72} size={100} color="#3b82f6" />
                </CardContent>
              </AnimatedCard>

              <AnimatedCard delay={0.6}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-accent" />
                    Risk Reduction
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <ProgressRing progress={68} size={100} color="#8b5cf6" />
                </CardContent>
              </AnimatedCard>
            </div>

            {/* Recent Activities */}
            <AnimatedCard delay={0.7}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-accent" />
                  Recent Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div 
                  className="space-y-4"
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                >
                  {reports.slice(0, 5).map((report, index) => (
                    <motion.div
                      key={report.id}
                      variants={fadeInUp}
                      className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className={`p-2 rounded-full ${
                        report.status === 'completed' ? 'bg-green-100' : 
                        report.status === 'draft' ? 'bg-yellow-100' : 'bg-blue-100'
                      }`}>
                        <FileText className={`h-4 w-4 ${
                          report.status === 'completed' ? 'text-green-600' : 
                          report.status === 'draft' ? 'text-yellow-600' : 'text-blue-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Assessment for Farm {report.farm_id.slice(0, 8)}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(report.created_at).toLocaleDateString()} • {report.status}
                        </p>
                      </div>
                      {report.risk_score && (
                        <Badge variant="outline" className="bg-accent/10 text-accent">
                          Risk: {report.risk_score}
                        </Badge>
                      )}
                    </motion.div>
                  ))}
                  {reports.length === 0 && (
                    <motion.div 
                      className="text-center py-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Activity className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">No recent activities</p>
                    </motion.div>
                  )}
                </motion.div>
              </CardContent>
            </AnimatedCard>

            {/* Quick Actions */}
            <AnimatedCard delay={0.8}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-accent" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2 hover:bg-accent/10 hover:border-accent"
                    onClick={() => setActiveTab("reports")}
                  >
                    <Plus className="h-6 w-6 text-blue-500" />
                    <span>New Assessment</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2 hover:bg-accent/10 hover:border-accent"
                    onClick={() => setActiveTab("farms")}
                  >
                    <Users className="h-6 w-6 text-green-500" />
                    <span>View Farms</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2 hover:bg-accent/10 hover:border-accent"
                    onClick={() => setActiveTab("analytics")}
                  >
                    <BarChart3 className="h-6 w-6 text-purple-500" />
                    <span>Analytics</span>
                  </Button>
                </div>
              </CardContent>
            </AnimatedCard>
          </motion.div>
        );
    }
  };

  if (loading && activeTab === "overview") {
    return (
      <DashboardLayout
        title="Veterinarian Dashboard"
        user={user}
        sidebarItems={sidebarItems}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onSignOut={handleSignOut}
      >
        <DashboardSkeleton />
      </DashboardLayout>
    );
  }

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