import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  Tractor, 
  AlertTriangle, 
  BookOpen, 
  CheckCircle, 
  TrendingUp,
  Plus,
  Bell,
  Home,
  LogOut,
  Activity,
  Shield,
  Target,
  Users,
  Calendar,
  MapPin,
  BarChart3
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import RiskAssessmentForm from "@/components/RiskAssessmentForm";
import TrainingModules from "@/components/TrainingModules";
import ComplianceTracker from "@/components/ComplianceTracker";
import AlertsPanel from "@/components/AlertsPanel";
import { useNavigate } from "react-router-dom";
import { farmerDict, farmerLanguages, FarmerLocale } from "./farmer.i18n";
import { AnimatedCard, StatCard } from "@/components/ui/animated-card";
import { DashboardSkeleton } from "@/components/ui/loading-skeleton";
import { ProgressRing } from "@/components/ui/progress-ring";
import { MetricCard, BarChart, TrendChart } from "@/components/ui/data-visualization";
import { fadeInUp, staggerContainer, slideInFromTop } from "@/lib/animations";

interface Farm {
  id: string;
  name: string;
  farm_type: string;
  location: string;
  animal_count: number;
}

interface FarmerDashboardProps {
  user: User;
}

const FarmerDashboard = ({ user }: FarmerDashboardProps) => {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [locale, setLocale] = useState<FarmerLocale>(() => (localStorage.getItem('farmer_locale') as FarmerLocale) || 'en');
  const t = farmerDict[locale];

  useEffect(() => {
    fetchFarms();
  }, [user]);

  const fetchFarms = async () => {
    try {
      const { data, error } = await supabase
        .from('farms')
        .select('*')
        .eq('owner_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setFarms(data || []);
      if (data && data.length > 0) {
        setSelectedFarm(data[0]);
      }
    } catch (error: any) {
      toast.error('Error loading farms');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      toast.error('Error signing out');
    }
  };

  const sidebarItems = [
    { id: "overview", label: t.overview, icon: Home },
    { id: "assessment", label: t.assessment, icon: AlertTriangle },
    { id: "training", label: t.training, icon: BookOpen },
    { id: "compliance", label: t.compliance, icon: CheckCircle },
    { id: "alerts", label: t.alerts, icon: Bell },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "assessment":
        return selectedFarm ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <RiskAssessmentForm farm={selectedFarm} />
          </motion.div>
        ) : (
          <motion.div 
            className="text-center py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <AlertTriangle className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-lg text-muted-foreground">{t.selectFarmForAssessment}</p>
          </motion.div>
        );
      
      case "training":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TrainingModules farmType={selectedFarm?.farm_type} />
          </motion.div>
        );
      
      case "compliance":
        return selectedFarm ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ComplianceTracker farm={selectedFarm} />
          </motion.div>
        ) : (
          <motion.div 
            className="text-center py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <CheckCircle className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-lg text-muted-foreground">{t.selectFarmForCompliance}</p>
          </motion.div>
        );
      
      case "alerts":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AlertsPanel farmType={selectedFarm?.farm_type} location={selectedFarm?.location} />
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
                title={t.totalFarms}
                value={farms.length}
                icon={<Tractor className="h-5 w-5 text-blue-500" />}
                trend={{ value: 12, isPositive: true }}
                delay={0}
              />
              
              <StatCard
                title={t.riskScore}
                value="Good"
                icon={<Shield className="h-5 w-5 text-green-500" />}
                progress={75}
                delay={0.1}
              />
              
              <StatCard
                title={t.trainingProgress}
                value="60%"
                icon={<BookOpen className="h-5 w-5 text-purple-500" />}
                progress={60}
                delay={0.2}
              />
              
              <StatCard
                title="Active Alerts"
                value="2"
                icon={<Bell className="h-5 w-5 text-orange-500" />}
                trend={{ value: -25, isPositive: true }}
                delay={0.3}
              />
            </div>

            {/* Progress Rings Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <AnimatedCard delay={0.4}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-accent" />
                    Biosecurity Score
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
                    Compliance Rate
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <ProgressRing progress={78} size={100} color="#3b82f6" />
                </CardContent>
              </AnimatedCard>

              <AnimatedCard delay={0.6}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-accent" />
                    Training Completion
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <ProgressRing progress={60} size={100} color="#8b5cf6" />
                </CardContent>
              </AnimatedCard>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnimatedCard delay={0.7}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-accent" />
                    Risk Assessment Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <TrendChart
                    data={[
                      { date: "Jan", value: 65 },
                      { date: "Feb", value: 72 },
                      { date: "Mar", value: 68 },
                      { date: "Apr", value: 75 },
                      { date: "May", value: 82 },
                      { date: "Jun", value: 78 }
                    ]}
                  />
                </CardContent>
              </AnimatedCard>

              <AnimatedCard delay={0.8}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-accent" />
                    Farm Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <BarChart
                    data={[
                      { label: "Biosecurity", value: 85, color: "bg-green-500" },
                      { label: "Compliance", value: 78, color: "bg-blue-500" },
                      { label: "Training", value: 60, color: "bg-purple-500" },
                      { label: "Equipment", value: 92, color: "bg-orange-500" }
                    ]}
                  />
                </CardContent>
              </AnimatedCard>
            </div>

            {/* Enhanced Farms Section */}
            <AnimatedCard delay={0.9}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Tractor className="h-5 w-5 text-accent" />
                    {t.myFarms}
                  </div>
                  <Button size="sm" onClick={() => navigate('/farms')} className="bg-accent hover:bg-accent/90">
                    <Plus className="h-4 w-4 mr-2" />
                    {t.addFarm}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {farms.length === 0 ? (
                  <motion.div 
                    className="text-center py-12"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <Tractor className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
                    <h3 className="text-xl font-semibold mb-3">{t.noFarmsTitle}</h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">{t.noFarmsSubtitle}</p>
                    <Button onClick={() => navigate('/farms')} size="lg" className="bg-accent hover:bg-accent/90">
                      <Plus className="h-5 w-5 mr-2" />
                      {t.registerFarm}
                    </Button>
                  </motion.div>
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
                        className={`p-6 border rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg ${
                          selectedFarm?.id === farm.id 
                            ? 'border-accent bg-accent/5 shadow-lg' 
                            : 'hover:bg-muted/50 hover:border-accent/50'
                        }`}
                        onClick={() => setSelectedFarm(farm)}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-accent/10 rounded-lg">
                              <Tractor className="h-6 w-6 text-accent" />
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
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Users className="h-4 w-4" />
                              {farm.animal_count} {t.animals}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
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
                    onClick={() => setActiveTab("assessment")}
                  >
                    <AlertTriangle className="h-6 w-6 text-orange-500" />
                    <span>Risk Assessment</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2 hover:bg-accent/10 hover:border-accent"
                    onClick={() => setActiveTab("training")}
                  >
                    <BookOpen className="h-6 w-6 text-blue-500" />
                    <span>Training</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2 hover:bg-accent/10 hover:border-accent"
                    onClick={() => setActiveTab("compliance")}
                  >
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    <span>Compliance</span>
                  </Button>
                </div>
              </CardContent>
            </AnimatedCard>
          </motion.div>
        );
    }
  };

  if (loading) {
    return (
      <DashboardLayout
        title={t.title}
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
      title={t.title}
      user={user}
      sidebarItems={sidebarItems}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onSignOut={handleSignOut}
    >
      <div className="flex items-center justify-end mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Language:</span>
          <select
            className="border rounded-md p-1 bg-background"
            value={locale}
            onChange={(e) => {
              const next = e.target.value as FarmerLocale;
              setLocale(next);
              localStorage.setItem('farmer_locale', next);
            }}
          >
            {farmerLanguages.map((l) => (
              <option key={l.code} value={l.code}>{l.name}</option>
            ))}
          </select>
        </div>
      </div>
      {renderContent()}
    </DashboardLayout>
  );
};

export default FarmerDashboard;