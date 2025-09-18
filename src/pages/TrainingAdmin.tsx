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

type ModuleInsert = TablesInsert<'training_modules'>;

const TrainingAdmin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [modules, setModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [farmType, setFarmType] = useState<"pig" | "poultry" | "mixed" | "">("");
  const [duration, setDuration] = useState<number>(0);
  const [isPublished, setIsPublished] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [content, setContent] = useState<string>("");

  const starterTemplate = (ft: string | "") => `
Module Overview
This module introduces essential biosecurity practices for ${ft || 'pig/poultry'} farms. It is designed for quick on‑farm learning.

Learning Objectives
- Understand farm entry/exit hygiene
- Learn daily disinfection routines
- Recognize signs of common diseases and reporting workflows

Checklist
1. Footbath at all entries and replenish twice daily
2. Hand hygiene before/after animal contact
3. Dedicated tools per shed; color‑coded
4. Visitor log with contact details and purpose
5. Isolate sick animals and notify veterinarian

Best Practices
Keep feed/water areas clean, control vectors (rodents, wild birds), and maintain updated vaccination schedules.

Assessment
After completing, mark the module as complete and create an action list for your farm.
`;

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('training_modules')
      .select('*')
      .order('created_at', { ascending: false });
    setModules(data || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const createModule = async () => {
    if (!user || !title) return;
    setCreating(true);
    const payload: ModuleInsert = {
      title,
      description: description || null,
      farm_type: (farmType as any) || null,
      duration_minutes: duration || null,
      is_published: isPublished,
      created_by: user.id,
      // Store content as JSON object to match json/jsonb columns
      content: ({ text: (content && content.trim().length > 0 ? content : starterTemplate(farmType)) }) as any,
    } as ModuleInsert;
    const { error } = await supabase.from('training_modules').insert(payload);
    if (error) {
      console.error('Create module error:', error);
      alert(`Failed to create module: ${error.message || 'Unknown error'}`);
    }
    setTitle("");
    setDescription("");
    setFarmType("");
    setDuration(0);
    setIsPublished(false);
    setVideoUrl("");
    setContent("");
    setCreating(false);
    load();
  };

  return (
    <ProtectedRoute>
      <RoleGuard roles={["extension_worker", "regulator"]}>
        <div className="container mx-auto p-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Create Training Module
                <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>← Back</Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Biosecurity Basics for Poultry" />
                </div>
                <div className="space-y-2">
                  <Label>Farm Type</Label>
                  <Select value={farmType} onValueChange={(v) => setFarmType(v as any)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select farm type (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pig">Pig</SelectItem>
                      <SelectItem value="poultry">Poultry</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Description</Label>
                  <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short summary of module" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Video URL (optional)</Label>
                  <Input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="https://www.youtube.com/embed/...." />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <div className="flex items-center justify-between">
                    <Label>Content (Plain text)</Label>
                    <Button type="button" variant="outline" size="sm" onClick={() => setContent(starterTemplate(farmType))}>Load Starter Content</Button>
                  </div>
                  <Textarea value={content} onChange={(e) => setContent(e.target.value)} rows={10} placeholder="Add learning content here (plain text; use blank lines for paragraphs, '-' for bullets, '1.' for numbered points)" />
                </div>
                <div className="space-y-2">
                  <Label>Duration (minutes)</Label>
                  <Input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} />
                </div>
                <div className="space-y-2">
                  <Label>Publish Now</Label>
                  <Button variant={isPublished ? "default" : "outline"} onClick={() => setIsPublished(!isPublished)}>
                    {isPublished ? "Published" : "Draft"}
                  </Button>
                </div>
              </div>
              <div className="mt-4">
                <Button onClick={createModule} disabled={creating}>Create Module</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Training Modules</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <div className="space-y-3">
                  {modules.map((m) => (
                    <div key={m.id} className="p-4 border rounded-lg">
                      <div className="font-medium">{m.title}</div>
                      <div className="text-sm text-muted-foreground">{m.farm_type ?? 'All'} • {m.duration_minutes ?? '-'} min • {m.is_published ? 'Published' : 'Draft'}</div>
                    </div>
                  ))}
                  {modules.length === 0 && <p className="text-muted-foreground">No modules yet.</p>}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </RoleGuard>
    </ProtectedRoute>
  );
};

export default TrainingAdmin;


