import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
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
  LogOut
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import RiskAssessmentForm from "@/components/RiskAssessmentForm";
import TrainingModules from "@/components/TrainingModules";
import ComplianceTracker from "@/components/ComplianceTracker";
import AlertsPanel from "@/components/AlertsPanel";
import { useNavigate } from "react-router-dom";
import { farmerDict, farmerLanguages, FarmerLocale } from "./farmer.i18n";

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
          <RiskAssessmentForm farm={selectedFarm} />
        ) : (
          <div className="text-center py-8">
            <p>{t.selectFarmForAssessment}</p>
          </div>
        );
      
      case "training":
        return <TrainingModules farmType={selectedFarm?.farm_type} />;
      
      case "compliance":
        return selectedFarm ? (
          <ComplianceTracker farm={selectedFarm} />
        ) : (
          <div className="text-center py-8">
            <p>{t.selectFarmForCompliance}</p>
          </div>
        );
      
      case "alerts":
        return <AlertsPanel farmType={selectedFarm?.farm_type} location={selectedFarm?.location} />;
      
      default:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t.totalFarms}</CardTitle>
                  <Tractor className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{farms.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t.riskScore}</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-success">Good</div>
                  <Progress value={75} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t.trainingProgress}</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">60%</div>
                  <Progress value={60} className="mt-2" />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {t.myFarms}
                  <Button size="sm" onClick={() => navigate('/farms')}>
                    <Plus className="h-4 w-4 mr-2" />
                    {t.addFarm}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {farms.length === 0 ? (
                  <div className="text-center py-8">
                    <Tractor className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{t.noFarmsTitle}</h3>
                    <p className="text-muted-foreground mb-4">{t.noFarmsSubtitle}</p>
                    <Button onClick={() => navigate('/farms')}>
                      <Plus className="h-4 w-4 mr-2" />
                      {t.registerFarm}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {farms.map((farm) => (
                      <div 
                        key={farm.id} 
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedFarm?.id === farm.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                        }`}
                        onClick={() => setSelectedFarm(farm)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">{farm.name}</h4>
                            <p className="text-sm text-muted-foreground">{farm.location}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline" className="mb-2">
                              {farm.farm_type}
                            </Badge>
                            <p className="text-sm text-muted-foreground">
                              {farm.animal_count} {t.animals}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
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