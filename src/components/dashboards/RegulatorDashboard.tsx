import { useEffect, useMemo, useState } from "react";
import { User } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building, 
  Map, 
  AlertTriangle, 
  TrendingUp,
  Activity,
  Shield,
  Target,
  Users,
  Calendar,
  MapPin,
  BarChart3,
  Plus,
  Eye,
  Edit,
  Clock,
  CheckCircle,
  FileText,
  Globe,
  Zap
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { AnimatedCard, StatCard } from "@/components/ui/animated-card";
import { DashboardSkeleton } from "@/components/ui/loading-skeleton";
import { ProgressRing } from "@/components/ui/progress-ring";
import { MetricCard, BarChart, TrendChart } from "@/components/ui/data-visualization";
import { fadeInUp, staggerContainer, slideInFromTop } from "@/lib/animations";

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <AnimatedCard>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Map className="h-5 w-5 text-accent" />
                  Regional Surveillance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Risk Heatmap</h3>
                    <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Map className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">Interactive risk heatmap</p>
                        <p className="text-sm text-muted-foreground">Coming soon</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Regional Statistics</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <span className="font-medium">North Region</span>
                        <Badge variant="outline" className="bg-green-100 text-green-700">Low Risk</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <span className="font-medium">South Region</span>
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-700">Medium Risk</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <span className="font-medium">East Region</span>
                        <Badge variant="outline" className="bg-green-100 text-green-700">Low Risk</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <span className="font-medium">West Region</span>
                        <Badge variant="outline" className="bg-red-100 text-red-700">High Risk</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </AnimatedCard>

            <AnimatedCard>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-accent" />
                  Monitoring Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <ProgressRing progress={85} size={80} color="#10b981" />
                    <p className="text-sm text-muted-foreground mt-2">Overall Compliance</p>
                  </div>
                  <div className="text-center">
                    <ProgressRing progress={72} size={80} color="#3b82f6" />
                    <p className="text-sm text-muted-foreground mt-2">Risk Mitigation</p>
                  </div>
                  <div className="text-center">
                    <ProgressRing progress={68} size={80} color="#8b5cf6" />
                    <p className="text-sm text-muted-foreground mt-2">Response Time</p>
                  </div>
                </div>
              </CardContent>
            </AnimatedCard>
          </motion.div>
        );
        
      case "alerts":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <AnimatedCard>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-accent" />
                    Alert Management
                  </div>
                  <Button size="sm" onClick={() => navigate('/admin/alerts')} className="bg-accent hover:bg-accent/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Manage Alerts
                  </Button>
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
                    {activeAlerts.map((alert, index) => (
                      <motion.div
                        key={alert.id}
                        variants={fadeInUp}
                        className="p-6 border rounded-xl hover:shadow-lg transition-all duration-300"
                        whileHover={{ y: -2 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-lg ${
                              alert.severity === 'high' ? 'bg-red-100' : 
                              alert.severity === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
                            }`}>
                              <AlertTriangle className={`h-6 w-6 ${
                                alert.severity === 'high' ? 'text-red-600' : 
                                alert.severity === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                              }`} />
                            </div>
                            <div>
                              <h4 className="font-semibold text-lg">{alert.title}</h4>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  {alert.location ?? 'All regions'}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Target className="h-4 w-4" />
                                  {alert.farm_type ?? 'All types'}
                                </div>
                                <Badge variant="outline" className={
                                  alert.severity === 'high' ? 'bg-red-100 text-red-700' : 
                                  alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                                }>
                                  {alert.severity.toUpperCase()}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="text-right space-y-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              {new Date(alert.created_at).toLocaleDateString()}
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4 mr-1" />
                                Manage
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm">{alert.message}</p>
                        </div>
                      </motion.div>
                    ))}
                    {activeAlerts.length === 0 && (
                      <motion.div 
                        className="text-center py-12"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <AlertTriangle className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
                        <h3 className="text-xl font-semibold mb-3">No Active Alerts</h3>
                        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                          All systems are operating normally. No alerts require immediate attention.
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
                    Compliance Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <TrendChart
                    data={[
                      { date: "Jan", value: 78 },
                      { date: "Feb", value: 82 },
                      { date: "Mar", value: 85 },
                      { date: "Apr", value: 88 },
                      { date: "May", value: 90 },
                      { date: "Jun", value: 92 }
                    ]}
                  />
                </CardContent>
              </AnimatedCard>

              <AnimatedCard>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-accent" />
                    Regional Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <BarChart
                    data={[
                      { label: "North", value: 95, color: "bg-green-500" },
                      { label: "South", value: 88, color: "bg-blue-500" },
                      { label: "East", value: 92, color: "bg-green-500" },
                      { label: "West", value: 75, color: "bg-yellow-500" }
                    ]}
                  />
                </CardContent>
              </AnimatedCard>
            </div>

            <AnimatedCard>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  Policy Impact Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <ProgressRing progress={92} size={80} color="#10b981" />
                    <p className="text-sm text-muted-foreground mt-2">Overall Compliance</p>
                  </div>
                  <div className="text-center">
                    <ProgressRing progress={85} size={80} color="#3b82f6" />
                    <p className="text-sm text-muted-foreground mt-2">Policy Adoption</p>
                  </div>
                  <div className="text-center">
                    <ProgressRing progress={78} size={80} color="#8b5cf6" />
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
                title="Registered Farms"
                value="1,247"
                icon={<Building className="h-5 w-5 text-blue-500" />}
                trend={{ value: 8, isPositive: true }}
                delay={0}
              />
              
              <StatCard
                title="Active Alerts"
                value={activeAlerts.length}
                icon={<AlertTriangle className="h-5 w-5 text-orange-500" />}
                trend={{ value: -15, isPositive: true }}
                delay={0.1}
              />
              
              <StatCard
                title="Compliance Rate"
                value="92%"
                icon={<Shield className="h-5 w-5 text-green-500" />}
                progress={92}
                delay={0.2}
              />
              
              <StatCard
                title="Risk Assessments"
                value={recentAssessments.length}
                icon={<FileText className="h-5 w-5 text-purple-500" />}
                trend={{ value: 12, isPositive: true }}
                delay={0.3}
              />
            </div>

            {/* Progress Rings Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <AnimatedCard delay={0.4}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-accent" />
                    Regional Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <ProgressRing progress={92} size={100} color="#10b981" />
                </CardContent>
              </AnimatedCard>

              <AnimatedCard delay={0.5}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-accent" />
                    Risk Mitigation
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <ProgressRing progress={85} size={100} color="#3b82f6" />
                </CardContent>
              </AnimatedCard>

              <AnimatedCard delay={0.6}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-accent" />
                    Policy Effectiveness
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <ProgressRing progress={78} size={100} color="#8b5cf6" />
                </CardContent>
              </AnimatedCard>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnimatedCard delay={0.7}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-accent" />
                    Compliance Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <TrendChart
                    data={[
                      { date: "Jan", value: 78 },
                      { date: "Feb", value: 82 },
                      { date: "Mar", value: 85 },
                      { date: "Apr", value: 88 },
                      { date: "May", value: 90 },
                      { date: "Jun", value: 92 }
                    ]}
                  />
                </CardContent>
              </AnimatedCard>

              <AnimatedCard delay={0.8}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-accent" />
                    Regional Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <BarChart
                    data={[
                      { label: "North", value: 95, color: "bg-green-500" },
                      { label: "South", value: 88, color: "bg-blue-500" },
                      { label: "East", value: 92, color: "bg-green-500" },
                      { label: "West", value: 75, color: "bg-yellow-500" }
                    ]}
                  />
                </CardContent>
              </AnimatedCard>
            </div>

            {/* Recent Assessments */}
            <AnimatedCard delay={0.9}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-accent" />
                  Recent Risk Assessments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div 
                  className="space-y-4"
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                >
                  {recentAssessments.slice(0, 5).map((assessment, index) => (
                    <motion.div
                      key={assessment.id}
                      variants={fadeInUp}
                      className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className={`p-2 rounded-full ${
                        assessment.status === 'completed' ? 'bg-green-100' : 
                        assessment.status === 'draft' ? 'bg-yellow-100' : 'bg-blue-100'
                      }`}>
                        <FileText className={`h-4 w-4 ${
                          assessment.status === 'completed' ? 'text-green-600' : 
                          assessment.status === 'draft' ? 'text-yellow-600' : 'text-blue-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">
                          Assessment {assessment.id.slice(0, 8)} • Farm {assessment.farm_id.slice(0, 8)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(assessment.created_at).toLocaleDateString()} • {assessment.status}
                        </p>
                      </div>
                      {assessment.risk_score && (
                        <Badge variant="outline" className="bg-accent/10 text-accent">
                          Risk: {assessment.risk_score}
                        </Badge>
                      )}
                    </motion.div>
                  ))}
                  {recentAssessments.length === 0 && (
                    <motion.div 
                      className="text-center py-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">No recent assessments</p>
                    </motion.div>
                  )}
                </motion.div>
              </CardContent>
            </AnimatedCard>

            {/* Quick Actions */}
            <AnimatedCard delay={1}>
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
                    onClick={() => navigate('/admin/alerts')}
                  >
                    <AlertTriangle className="h-6 w-6 text-orange-500" />
                    <span>Manage Alerts</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2 hover:bg-accent/10 hover:border-accent"
                    onClick={() => setActiveTab("surveillance")}
                  >
                    <Map className="h-6 w-6 text-blue-500" />
                    <span>Surveillance</span>
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

  if (loading && activeTab === "overview") {
    return (
      <DashboardLayout
        title="Regulator Dashboard"
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