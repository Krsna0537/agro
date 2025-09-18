import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  TrendingUp,
  Activity,
  Target,
  Award,
  Calendar,
  MapPin,
  BarChart3,
  Plus,
  Eye,
  Edit,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { AnimatedCard, StatCard } from "@/components/ui/animated-card";
import { DashboardSkeleton } from "@/components/ui/loading-skeleton";
import { ProgressRing } from "@/components/ui/progress-ring";
import { MetricCard, BarChart, TrendChart } from "@/components/ui/data-visualization";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { fadeInUp, staggerContainer, slideInFromTop } from "@/lib/animations";

interface ExtensionWorkerDashboardProps {
  user: User;
}

const ExtensionWorkerDashboard = ({ user }: ExtensionWorkerDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [farmers, setFarmers] = useState<Array<{ user_id: string; first_name: string; last_name: string; location: string | null }>>([]);
  const [modules, setModules] = useState<any[]>([]);
  const [progress, setProgress] = useState<any[]>([]);
  const [viewing, setViewing] = useState<any | null>(null);

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatedCard>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-accent" />
                  Assigned Farmers
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-3">
                    {Array.from({ length: 5 }).map((_, i) => (
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
                    {farmers.map((farmer, index) => (
                      <motion.div
                        key={farmer.user_id}
                        variants={fadeInUp}
                        className="p-6 border rounded-xl hover:shadow-lg transition-all duration-300 hover:bg-muted/50"
                        whileHover={{ y: -2 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-accent/10 rounded-lg">
                              <Users className="h-6 w-6 text-accent" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-lg">{farmer.first_name} {farmer.last_name}</h4>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                {farmer.location ?? 'Location not set'}
                              </div>
                            </div>
                          </div>
                          <div className="text-right space-y-2">
                            <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                              Active
                            </Badge>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4 mr-1" />
                                Contact
                              </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    {farmers.length === 0 && (
                      <motion.div 
                        className="text-center py-12"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Users className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
                        <h3 className="text-xl font-semibold mb-3">No Farmers Assigned</h3>
                        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                          Contact your supervisor to get assigned farmers in your region.
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </CardContent>
            </AnimatedCard>
          </motion.div>
        );
        
      case "training":
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
                    <BookOpen className="h-5 w-5 text-accent" />
                    Training Content
                  </div>
                  <Button size="sm" onClick={() => navigate('/admin/training')} className="bg-accent hover:bg-accent/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Manage Modules
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
                    {modules.map((module, index) => (
                      <motion.div
                        key={module.id}
                        variants={fadeInUp}
                        className="p-6 border rounded-xl hover:shadow-lg transition-all duration-300"
                        whileHover={{ y: -2 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-lg ${
                              module.is_published ? 'bg-green-100' : 'bg-yellow-100'
                            }`}>
                              <BookOpen className={`h-6 w-6 ${
                                module.is_published ? 'text-green-600' : 'text-yellow-600'
                              }`} />
                            </div>
                            <div>
                              <h4 className="font-semibold text-lg">{module.title}</h4>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Target className="h-4 w-4" />
                                  {module.farm_type ?? 'All Types'}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {module.duration_minutes ?? '-'} min
                                </div>
                                <Badge variant="outline" className={
                                  module.is_published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                }>
                                  {module.is_published ? 'Published' : 'Draft'}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => setViewing(module)}>
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => navigate('/admin/training')}>
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    {modules.length === 0 && (
                      <motion.div 
                        className="text-center py-12"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
                        <h3 className="text-xl font-semibold mb-3">No Training Modules</h3>
                        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                          Create your first training module to help farmers learn best practices.
                        </p>
                        <Button onClick={() => navigate('/admin/training')} size="lg" className="bg-accent hover:bg-accent/90">
                          <Plus className="h-5 w-5 mr-2" />
                          Create First Module
                        </Button>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </CardContent>
            </AnimatedCard>

            <Dialog open={!!viewing} onOpenChange={() => setViewing(null)}>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    {viewing?.title}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <Target className="h-4 w-4" /> {viewing?.farm_type ?? 'All Types'}
                    <Clock className="h-4 w-4" /> {viewing?.duration_minutes ?? '-'} min
                    <Badge variant="outline">{viewing?.is_published ? 'Published' : 'Draft'}</Badge>
                  </div>
                  <div className="max-w-none whitespace-pre-wrap leading-relaxed text-sm">
                    {(() => {
                      const c: any = viewing?.content;
                      if (!c) return viewing?.description || 'No content provided.';
                      if (typeof c === 'string') return c;
                      if (typeof c === 'object' && typeof c.text === 'string') return c.text;
                      return JSON.stringify(c, null, 2);
                    })()}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
        );
        
      case "progress":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatedCard>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  Training Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-3">
                    {Array.from({ length: 5 }).map((_, i) => (
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
                    {progress.map((prog, index) => (
                      <motion.div
                        key={prog.id}
                        variants={fadeInUp}
                        className="p-6 border rounded-xl hover:shadow-lg transition-all duration-300"
                        whileHover={{ y: -2 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-lg ${
                              prog.completed ? 'bg-green-100' : 'bg-blue-100'
                            }`}>
                              <GraduationCap className={`h-6 w-6 ${
                                prog.completed ? 'text-green-600' : 'text-blue-600'
                              }`} />
                            </div>
                            <div>
                              <h4 className="font-semibold text-lg">
                                {prog.module?.title ?? prog.module_id}
                              </h4>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Users className="h-4 w-4" />
                                  Farmer {prog.user_id.slice(0, 8)}
                                </div>
                                <Badge variant="outline" className={
                                  prog.completed ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                }>
                                  {prog.completed ? 'Completed' : 'In Progress'}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="text-right space-y-2">
                            <div className="flex items-center gap-2">
                              <Target className="h-4 w-4 text-accent" />
                              <span className="font-medium">{prog.progress_percentage ?? 0}%</span>
                            </div>
                            <div className="w-24 bg-muted rounded-full h-2">
                              <motion.div
                                className="h-2 bg-accent rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${prog.progress_percentage ?? 0}%` }}
                                transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    {progress.length === 0 && (
                      <motion.div 
                        className="text-center py-12"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <TrendingUp className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
                        <h3 className="text-xl font-semibold mb-3">No Progress Records</h3>
                        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                          Training progress will appear here once farmers start taking modules.
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                )}
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
                title="Assigned Farmers"
                value={farmers.length}
                icon={<Users className="h-5 w-5 text-blue-500" />}
                trend={{ value: 12, isPositive: true }}
                delay={0}
              />
              
              <StatCard
                title="Training Modules"
                value={modules.length}
                icon={<BookOpen className="h-5 w-5 text-green-500" />}
                trend={{ value: 5, isPositive: true }}
                delay={0.1}
              />
              
              <StatCard
                title="Active Progress"
                value={progress.filter(p => !p.completed).length}
                icon={<Activity className="h-5 w-5 text-orange-500" />}
                delay={0.2}
              />
              
              <StatCard
                title="Completion Rate"
                value={progress.length > 0 ? Math.round((progress.filter(p => p.completed).length / progress.length) * 100) : 0}
                icon={<Award className="h-5 w-5 text-purple-500" />}
                progress={progress.length > 0 ? (progress.filter(p => p.completed).length / progress.length) * 100 : 0}
                delay={0.3}
              />
            </div>

            {/* Progress Rings Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <AnimatedCard delay={0.4}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-accent" />
                    Training Engagement
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <ProgressRing progress={78} size={100} color="#10b981" />
                </CardContent>
              </AnimatedCard>

              <AnimatedCard delay={0.5}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-accent" />
                    Module Completion
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <ProgressRing progress={65} size={100} color="#3b82f6" />
                </CardContent>
              </AnimatedCard>

              <AnimatedCard delay={0.6}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-accent" />
                    Farmer Satisfaction
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <ProgressRing progress={82} size={100} color="#8b5cf6" />
                </CardContent>
              </AnimatedCard>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnimatedCard delay={0.7}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-accent" />
                    Training Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <TrendChart
                    data={[
                      { date: "Jan", value: 15 },
                      { date: "Feb", value: 22 },
                      { date: "Mar", value: 18 },
                      { date: "Apr", value: 28 },
                      { date: "May", value: 32 },
                      { date: "Jun", value: 35 }
                    ]}
                  />
                </CardContent>
              </AnimatedCard>

              <AnimatedCard delay={0.8}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-accent" />
                    Module Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <BarChart
                    data={[
                      { label: "Biosecurity", value: 85, color: "bg-green-500" },
                      { label: "Animal Health", value: 78, color: "bg-blue-500" },
                      { label: "Farm Management", value: 72, color: "bg-purple-500" },
                      { label: "Safety Protocols", value: 88, color: "bg-orange-500" }
                    ]}
                  />
                </CardContent>
              </AnimatedCard>
            </div>

            {/* Recent Activities */}
            <AnimatedCard delay={0.9}>
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
                  {progress.slice(0, 5).map((prog, index) => (
                    <motion.div
                      key={prog.id}
                      variants={fadeInUp}
                      className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className={`p-2 rounded-full ${
                        prog.completed ? 'bg-green-100' : 'bg-blue-100'
                      }`}>
                        <GraduationCap className={`h-4 w-4 ${
                          prog.completed ? 'text-green-600' : 'text-blue-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">
                          {prog.module?.title ?? prog.module_id} - Farmer {prog.user_id.slice(0, 8)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {prog.progress_percentage ?? 0}% complete • {prog.completed ? 'Completed' : 'In Progress'}
                        </p>
                      </div>
                      <Badge variant="outline" className="bg-accent/10 text-accent">
                        {prog.progress_percentage ?? 0}%
                      </Badge>
                    </motion.div>
                  ))}
                  {progress.length === 0 && (
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
                    onClick={() => navigate('/admin/training')}
                  >
                    <Plus className="h-6 w-6 text-blue-500" />
                    <span>Create Module</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2 hover:bg-accent/10 hover:border-accent"
                    onClick={() => setActiveTab("farmers")}
                  >
                    <Users className="h-6 w-6 text-green-500" />
                    <span>View Farmers</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2 hover:bg-accent/10 hover:border-accent"
                    onClick={() => setActiveTab("progress")}
                  >
                    <TrendingUp className="h-6 w-6 text-purple-500" />
                    <span>Track Progress</span>
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
        // Farmers: all profiles with role farmer
        const { data: farmerRoles } = await supabase
          .from('user_roles')
          .select('user_id')
          .eq('role', 'farmer');
        const farmerIds = (farmerRoles || []).map(r => r.user_id);
        if (farmerIds.length > 0) {
          const { data: farmerProfiles } = await supabase
            .from('profiles')
            .select('user_id, first_name, last_name, location')
            .in('user_id', farmerIds);
          setFarmers(farmerProfiles as any || []);
        } else {
          setFarmers([]);
        }

        // Training modules
        const { data: moduleRows } = await supabase
          .from('training_modules')
          .select('*')
          .order('created_at', { ascending: false });
        setModules(moduleRows || []);

        // Training progress with simple join (get module title separately)
        const { data: progressRows } = await supabase
          .from('user_training_progress')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(25);
        // Attach module title
        const moduleMap = new Map((moduleRows || []).map(m => [m.id, m]));
        setProgress((progressRows || []).map(r => ({ ...r, module: moduleMap.get(r.module_id) })));
      } catch (e) {
        console.error(e);
        toast.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading && activeTab === "overview") {
    return (
      <DashboardLayout
        title="Extension Worker Dashboard"
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