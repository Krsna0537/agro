import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { AlertTriangle, Bell, CheckCircle, Clock, MapPin } from "lucide-react";

interface Alert {
  id: string;
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  farm_type?: string;
  location?: string;
  created_at: string;
  expires_at?: string;
  user_alerts?: {
    read_at?: string;
  }[];
}

interface AlertsPanelProps {
  farmType?: string;
  location?: string;
}

const AlertsPanel = ({ farmType, location }: AlertsPanelProps) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
  }, [farmType, location]);

  const fetchAlerts = async () => {
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) return;

      let query = supabase
        .from('alerts')
        .select(`
          *,
          user_alerts!left (
            read_at
          )
        `)
        .eq('is_active', true)
        .eq('user_alerts.user_id', user.data.user.id)
        .order('created_at', { ascending: false });

      if (farmType) {
        query = query.or(`farm_type.eq.${farmType},farm_type.is.null`);
      }

      const { data, error } = await query;

      if (error) throw error;
      setAlerts(data || []);
    } catch (error: any) {
      toast.error('Error loading alerts');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (alertId: string) => {
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) return;

      const { error } = await supabase
        .from('user_alerts')
        .upsert({
          user_id: user.data.user.id,
          alert_id: alertId,
          read_at: new Date().toISOString()
        });

      if (error) throw error;
      fetchAlerts();
    } catch (error: any) {
      toast.error('Error marking alert as read');
      console.error('Error:', error);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': 
      case 'high': 
        return <AlertTriangle className="h-4 w-4" />;
      case 'medium': 
        return <Bell className="h-4 w-4" />;
      default: 
        return <Bell className="h-4 w-4" />;
    }
  };

  const isExpired = (expiresAt?: string) => {
    if (!expiresAt) return false;
    return new Date(expiresAt) < new Date();
  };

  if (loading) {
    return <div className="text-center py-8">Loading alerts...</div>;
  }

  const activeAlerts = alerts.filter(alert => !isExpired(alert.expires_at));
  const unreadAlerts = activeAlerts.filter(alert => 
    !alert.user_alerts?.[0]?.read_at
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Alerts & Notifications</h2>
        <div className="flex items-center gap-4">
          <Badge variant="outline">
            {unreadAlerts.length} unread
          </Badge>
          <Badge variant="secondary">
            {activeAlerts.length} active
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        {activeAlerts.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <CheckCircle className="h-12 w-12 mx-auto text-success mb-4" />
              <h3 className="text-lg font-semibold mb-2">No active alerts</h3>
              <p className="text-muted-foreground">
                All clear! You'll be notified of any biosecurity alerts in your area.
              </p>
            </CardContent>
          </Card>
        ) : (
          activeAlerts.map((alert) => {
            const isRead = !!alert.user_alerts?.[0]?.read_at;
            
            return (
              <Card 
                key={alert.id} 
                className={`hover:shadow-md transition-shadow ${
                  !isRead ? 'border-l-4 border-l-primary' : ''
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="mt-1">
                        {getSeverityIcon(alert.severity)}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">
                          {alert.title}
                          {!isRead && <span className="ml-2 w-2 h-2 bg-primary rounded-full inline-block" />}
                        </CardTitle>
                        <p className="text-muted-foreground mb-3">
                          {alert.message}
                        </p>
                      </div>
                    </div>
                    
                    <Badge variant={getSeverityColor(alert.severity) as any}>
                      {alert.severity}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(alert.created_at).toLocaleDateString()}
                      </div>
                      
                      {alert.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {alert.location}
                        </div>
                      )}
                      
                      {alert.farm_type && (
                        <Badge variant="outline" className="text-xs">
                          {alert.farm_type} farms
                        </Badge>
                      )}
                      
                      {alert.expires_at && (
                        <span className="text-xs">
                          Expires: {new Date(alert.expires_at).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    
                    {!isRead && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => markAsRead(alert.id)}
                      >
                        Mark as Read
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AlertsPanel;