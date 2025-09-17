import { useEffect, useState } from "react";
import { TablesInsert } from "@/integrations/supabase/types";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useNavigate } from "react-router-dom";

type FarmInsert = TablesInsert<'farms'>;

const Farms = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [farms, setFarms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [farmType, setFarmType] = useState<"pig" | "poultry" | "mixed" | "">("");
  const [animalCount, setAnimalCount] = useState<number>(0);

  const load = async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase
      .from('farms')
      .select('*')
      .eq('owner_id', user.id)
      .order('created_at', { ascending: false });
    setFarms(data || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const createFarm = async () => {
    if (!user || !name || !location || !farmType) return;
    setCreating(true);
    const payload: FarmInsert = {
      name,
      location,
      farm_type: farmType,
      owner_id: user.id,
      animal_count: animalCount || null,
    } as FarmInsert;
    await supabase.from('farms').insert(payload);
    setName("");
    setLocation("");
    setFarmType("");
    setAnimalCount(0);
    setCreating(false);
    load();
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Register New Farm
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>← Back</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Farm Name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Sunrise Poultry" />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="District, State" />
              </div>
              <div className="space-y-2">
                <Label>Farm Type</Label>
                <Select value={farmType} onValueChange={(v) => setFarmType(v as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select farm type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pig">Pig</SelectItem>
                    <SelectItem value="poultry">Poultry</SelectItem>
                    <SelectItem value="mixed">Mixed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Animal Count</Label>
                <Input type="number" value={animalCount} onChange={(e) => setAnimalCount(Number(e.target.value))} />
              </div>
            </div>
            <div className="mt-4">
              <Button onClick={createFarm} disabled={creating}>Create Farm</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Farms</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="space-y-3">
                {farms.map((f) => (
                  <div key={f.id} className="p-4 border rounded-lg">
                    <div className="font-medium">{f.name}</div>
                    <div className="text-sm text-muted-foreground">{f.location} • {f.farm_type} • {f.animal_count ?? 0} animals</div>
                  </div>
                ))}
                {farms.length === 0 && <p className="text-muted-foreground">No farms yet.</p>}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
};

export default Farms;


