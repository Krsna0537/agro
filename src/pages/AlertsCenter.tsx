import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Calendar, MapPin, Filter, Check, Download } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Severity = "low" | "medium" | "high";

interface AlertRow {
  id: string;
  title: string;
  message: string;
  severity: Severity;
  location: string | null;
  farm_type: string | null;
  is_active: boolean;
  created_at: string;
  read_at?: string | null;
}

const severityBadge = (s: Severity) => (
  <Badge variant="outline" className={
    s === 'high' ? 'bg-red-100 text-red-700' : s === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
  }>
    {s.toUpperCase()}
  </Badge>
);

const AlertsCenter = ({ user }: { user: any }) => {
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState<AlertRow[]>([]);
  const [q, setQ] = useState("");
  const [severity, setSeverity] = useState<string>("all");
  const [status, setStatus] = useState<string>("active");

  const loadAlerts = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from('alerts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200);
      const rows = (data || []) as any as AlertRow[];

      // join read state from user_alerts if exists
      const ids = rows.map(r => r.id);
      let readMap = new Map<string, string | null>();
      if (ids.length > 0) {
        const { data: userAlertRows } = await supabase
          .from('user_alerts')
          .select('alert_id, read_at')
          .eq('user_id', user?.id)
          .in('alert_id', ids);
        (userAlertRows || []).forEach((ua: any) => readMap.set(ua.alert_id, ua.read_at));
      }
      setAlerts(rows.map(r => ({ ...r, read_at: readMap.get(r.id) ?? null })));
    } catch (e) {
      console.error(e);
      toast.error('Failed to load alerts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAlerts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const filtered = useMemo(() => {
    return alerts.filter(a => {
      const matchQ = q.trim() === '' || a.title.toLowerCase().includes(q.toLowerCase()) || a.message.toLowerCase().includes(q.toLowerCase());
      const matchSeverity = severity === 'all' || a.severity === severity;
      const matchStatus = status === 'all' || (status === 'active' ? a.is_active : !a.is_active);
      return matchQ && matchSeverity && matchStatus;
    });
  }, [alerts, q, severity, status]);

  const markAllRead = async () => {
    try {
      const now = new Date().toISOString();
      const ids = alerts.map(a => a.id);
      if (ids.length === 0) return;
      const payload = ids.map(id => ({ id: crypto.randomUUID(), user_id: user.id, alert_id: id, read_at: now }));
      await supabase.from('user_alerts').upsert(payload, { onConflict: 'user_id,alert_id' } as any);
      await loadAlerts();
      toast.success('All alerts marked as read');
    } catch (e) {
      console.error(e);
      toast.error('Failed to mark as read');
    }
  };

  const exportCsv = () => {
    const rows = filtered.map(a => ({ id: a.id, title: a.title, severity: a.severity, location: a.location ?? '', farm_type: a.farm_type ?? '', status: a.is_active ? 'active' : 'inactive', created_at: a.created_at }));
    const header = Object.keys(rows[0] || { id: '', title: '', severity: '', location: '', farm_type: '', status: '', created_at: '' });
    const csv = [header.join(','), ...rows.map(r => header.map(h => String((r as any)[h]).replaceAll(',', ' ')).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `alerts_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout
      title="Alert Center"
      user={user}
      sidebarItems={[{ id: 'center', label: 'Alerts', icon: AlertTriangle }]}
      activeTab={'center'}
      onTabChange={() => {}}
      onSignOut={() => {}}
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-accent" />
                Filters
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={markAllRead}>
                  <Check className="h-4 w-4 mr-2" />
                  Mark all read
                </Button>
                <Button variant="outline" onClick={exportCsv}>
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input placeholder="Search alerts..." value={q} onChange={(e) => setQ(e.target.value)} />
              <Select value={severity} onValueChange={setSeverity}>
                <SelectTrigger>
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All severities</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <div />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filtered.map((a) => (
                <div key={a.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-accent" />
                        <span className="font-medium">{a.title}</span>
                        {severityBadge(a.severity)}
                        {!a.read_at ? <Badge variant="outline">Unread</Badge> : null}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {a.message}
                      </div>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <div className="flex items-center gap-1 justify-end">
                        <MapPin className="h-3 w-3" />
                        {a.location ?? 'All regions'}
                      </div>
                      <div className="flex items-center gap-1 justify-end">
                        <Calendar className="h-3 w-3" />
                        {new Date(a.created_at).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filtered.length === 0 && (
                <div className="text-center text-muted-foreground py-8">No alerts match your filters.</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AlertsCenter;


