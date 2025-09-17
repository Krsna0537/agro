import { useEffect, useState } from "react";
import { TablesInsert } from "@/integrations/supabase/types";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import RoleGuard from "@/components/auth/RoleGuard";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

type AlertInsert = TablesInsert<'alerts'>;

const AlertsAdmin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"low" | "medium" | "high" | "critical" | "">("");
  const [farmType, setFarmType] = useState<"pig" | "poultry" | "mixed" | "">("");
  const [location, setLocation] = useState("");

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('alerts')
      .select('*')
      .order('created_at', { ascending: false });
    setAlerts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const createAlert = async () => {
    if (!user || !title || !message || !severity) return;
    setCreating(true);
    const payload: AlertInsert = {
      title,
      message,
      severity: severity as any,
      farm_type: (farmType as any) || null,
      location: location || null,
      is_active: true,
      created_by: user.id,
    } as AlertInsert;
    await supabase.from('alerts').insert(payload);
    setTitle("");
    setMessage("");
    setSeverity("");
    setFarmType("");
    setLocation("");
    setCreating(false);
    load();
  };

  return (
    <ProtectedRoute>
      <RoleGuard roles={["regulator"]}>
        <div className="container mx-auto p-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Create Alert
                <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>← Back</Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Avian Influenza advisory" />
                </div>
                <div className="space-y-2">
                  <Label>Severity</Label>
                  <Select value={severity} onValueChange={(v) => setSeverity(v as any)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Message</Label>
                  <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Details and guidance" />
                </div>
                <div className="space-y-2">
                  <Label>Farm Type (optional)</Label>
                  <Select value={farmType} onValueChange={(v) => setFarmType(v as any)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Target farm type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pig">Pig</SelectItem>
                      <SelectItem value="poultry">Poultry</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Location (optional)</Label>
                  <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="District, State" />
                </div>
              </div>
              <div className="mt-4">
                <Button onClick={createAlert} disabled={creating}>Publish Alert</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <div className="space-y-3">
                  {alerts.map((a) => (
                    <div key={a.id} className="p-4 border rounded-lg">
                      <div className="font-medium">{a.title} <span className="text-xs text-muted-foreground">({a.severity})</span></div>
                      <div className="text-sm text-muted-foreground">{a.location ?? 'All locations'} • {a.farm_type ?? 'All farms'}</div>
                      <div className="text-sm mt-1">{a.message}</div>
                    </div>
                  ))}
                  {alerts.length === 0 && <p className="text-muted-foreground">No alerts yet.</p>}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </RoleGuard>
    </ProtectedRoute>
  );
};

export default AlertsAdmin;
