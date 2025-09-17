import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CheckCircle, XCircle, AlertCircle, FileText } from "lucide-react";

interface Farm {
  id: string;
  name: string;
  farm_type: string;
}

interface ComplianceRecord {
  id: string;
  checklist_item: string;
  is_compliant: boolean;
  notes: string;
  checked_at: string;
}

interface ComplianceTrackerProps {
  farm: Farm;
}

const complianceItems = {
  pig: [
    "Biosecurity plan documented and updated",
    "Visitor access control and log maintained",
    "Vehicle disinfection protocols implemented",
    "Feed storage meets safety standards",
    "Water quality testing conducted monthly",
    "Waste management system operational",
    "Staff trained in biosecurity protocols",
    "Emergency response procedures established",
    "Record keeping system maintained",
    "Regular veterinary health checks scheduled"
  ],
  poultry: [
    "Biosecurity plan documented and updated",
    "Access control measures for all entry points",
    "Footbath disinfection at farm entrance",
    "Feed storage protected from contamination",
    "Water system cleaned and tested regularly",
    "Proper disposal of dead birds",
    "Staff hygiene protocols followed",
    "Wild bird exclusion measures implemented",
    "Vaccination schedule maintained",
    "Health monitoring records updated"
  ],
  mixed: [
    "Comprehensive biosecurity plan for all species",
    "Species separation protocols maintained",
    "Cross-contamination prevention measures",
    "Unified visitor control system",
    "Equipment disinfection between areas",
    "Feed storage segregated by species",
    "Water quality monitoring for all systems",
    "Integrated waste management system",
    "Staff training for multi-species operations",
    "Veterinary oversight for all animals"
  ]
};

const ComplianceTracker = ({ farm }: ComplianceTrackerProps) => {
  const [records, setRecords] = useState<ComplianceRecord[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchComplianceRecords();
  }, [farm.id]);

  const fetchComplianceRecords = async () => {
    try {
      const { data, error } = await supabase
        .from('compliance_records')
        .select('*')
        .eq('farm_id', farm.id)
        .order('checked_at', { ascending: false });

      if (error) throw error;
      setRecords(data || []);
    } catch (error: any) {
      toast.error('Error loading compliance records');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateCompliance = async (item: string, isCompliant: boolean) => {
    setUpdating(item);
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) return;

      const { error } = await supabase
        .from('compliance_records')
        .upsert({
          farm_id: farm.id,
          checklist_item: item,
          is_compliant: isCompliant,
          notes: notes[item] || '',
          checked_by: user.data.user.id,
          checked_at: new Date().toISOString()
        });

      if (error) throw error;
      
      fetchComplianceRecords();
      toast.success('Compliance status updated');
    } catch (error: any) {
      toast.error('Error updating compliance');
      console.error('Error:', error);
    } finally {
      setUpdating(null);
    }
  };

  const getItemStatus = (item: string) => {
    const record = records.find(r => r.checklist_item === item);
    return record;
  };

  const getComplianceRate = () => {
    const items = complianceItems[farm.farm_type as keyof typeof complianceItems] || [];
    const compliantCount = items.filter(item => {
      const record = getItemStatus(item);
      return record?.is_compliant;
    }).length;
    return Math.round((compliantCount / items.length) * 100);
  };

  if (loading) {
    return <div className="text-center py-8">Loading compliance tracker...</div>;
  }

  const items = complianceItems[farm.farm_type as keyof typeof complianceItems] || [];
  const complianceRate = getComplianceRate();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Compliance Status - {farm.name}</span>
            <Badge 
              variant={complianceRate >= 90 ? "default" : complianceRate >= 70 ? "secondary" : "destructive"}
              className="text-lg px-3 py-1"
            >
              {complianceRate}%
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span>{items.filter(item => getItemStatus(item)?.is_compliant).length} Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-destructive" />
              <span>{items.filter(item => {
                const status = getItemStatus(item);
                return status && !status.is_compliant;
              }).length} Non-compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-warning" />
              <span>{items.filter(item => !getItemStatus(item)).length} Pending</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {items.map((item, index) => {
          const status = getItemStatus(item);
          const isUpdating = updating === item;
          
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={status?.is_compliant || false}
                          onCheckedChange={(checked) => 
                            updateCompliance(item, checked as boolean)
                          }
                          disabled={isUpdating}
                        />
                        <span className={`${status?.is_compliant ? 'line-through text-muted-foreground' : ''}`}>
                          {item}
                        </span>
                      </div>
                      
                      {status && (
                        <div className="ml-8 mt-2 text-sm text-muted-foreground">
                          Last checked: {new Date(status.checked_at).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {status?.is_compliant ? (
                        <CheckCircle className="h-5 w-5 text-success" />
                      ) : status ? (
                        <XCircle className="h-5 w-5 text-destructive" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-warning" />
                      )}
                    </div>
                  </div>

                  <div className="ml-8 space-y-2">
                    <Textarea
                      placeholder="Add notes about compliance status..."
                      value={notes[item] || status?.notes || ''}
                      onChange={(e) => setNotes(prev => ({
                        ...prev,
                        [item]: e.target.value
                      }))}
                      rows={2}
                    />
                    
                    {(notes[item] && notes[item] !== (status?.notes || '')) && (
                      <Button 
                        size="sm" 
                        onClick={() => updateCompliance(item, status?.is_compliant || false)}
                        disabled={isUpdating}
                      >
                        <FileText className="h-3 w-3 mr-1" />
                        {isUpdating ? 'Saving...' : 'Save Notes'}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ComplianceTracker;