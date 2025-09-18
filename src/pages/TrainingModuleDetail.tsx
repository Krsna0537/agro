import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft, BookOpen, CheckCircle, Clock, Video } from "lucide-react";

interface ModuleRow {
  id: string;
  title: string;
  description: string | null;
  duration_minutes: number | null;
  farm_type: string | null;
  // Optional content fields if present in DB
  content?: string | null;
  video_url?: string | null;
  user_training_progress?: Array<{ progress_percentage: number; completed: boolean }>
}

const TrainingModuleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [mod, setMod] = useState<ModuleRow | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);

  const load = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const user = await supabase.auth.getUser();
      const uid = user.data.user?.id;
      let query = supabase
        .from('training_modules')
        .select(`*, user_training_progress(progress_percentage, completed)`) // optional fields like content/video_url returned if exist
        .eq('id', id)
        .limit(1)
        .maybeSingle();
      const { data, error } = await query;
      if (error) throw error;
      if (!data) {
        toast.error('Module not found');
        navigate(-1);
        return;
      }
      setMod(data as unknown as ModuleRow);
      const prog = (data as any).user_training_progress?.[0];
      setProgress(prog?.progress_percentage ?? 0);
      setCompleted(!!prog?.completed);
    } catch (e) {
      console.error(e);
      toast.error('Failed to load module');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [id]);

  const saveProgress = async (pct: number) => {
    try {
      setSaving(true);
      const user = await supabase.auth.getUser();
      const uid = user.data.user?.id;
      if (!uid || !id) return;
      const { error } = await supabase.from('user_training_progress').upsert({
        user_id: uid,
        module_id: id,
        progress_percentage: Math.max(0, Math.min(100, Math.round(pct))),
        completed: pct >= 100 ? true : completed,
      } as any);
      if (error) throw error;
      setProgress(Math.max(0, Math.min(100, Math.round(pct))));
      if (pct >= 100) setCompleted(true);
      toast.success('Progress saved');
    } catch (e) {
      console.error(e);
      toast.error('Failed to save progress');
    } finally {
      setSaving(false);
    }
  };

  const markComplete = async () => saveProgress(100);

  const contentHtml = useMemo(() => {
    // If a rich content field exists (e.g., HTML/MD converted), use it; else fallback to description
    return (mod as any)?.content ?? mod?.description ?? '';
  }, [mod]);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        {mod?.farm_type && <Badge variant="secondary">{mod.farm_type} farms</Badge>}
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              {mod?.title || 'Training Module'}
              {completed && <CheckCircle className="h-4 w-4 text-success" />}
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {mod?.duration_minutes ?? '-'} min
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Video */}
          {mod?.video_url ? (
            <div className="mb-6 aspect-video rounded-lg overflow-hidden bg-black">
              <iframe
                src={mod.video_url}
                title="Training Video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ) : null}

          {/* Text content */}
          {contentHtml && (
            <div className="prose dark:prose-invert max-w-none">
              {contentHtml}
            </div>
          )}

          {/* Progress controls */}
          <div className="mt-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} />
            <div className="flex flex-wrap gap-2">
              {[0, 25, 50, 75, 100].map(p => (
                <Button key={p} variant="outline" size="sm" disabled={saving} onClick={() => saveProgress(p)}>
                  Set {p}%
                </Button>
              ))}
              <Button disabled={saving || completed} onClick={markComplete}>
                <CheckCircle className="h-4 w-4 mr-2" /> Mark Complete
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainingModuleDetail;


