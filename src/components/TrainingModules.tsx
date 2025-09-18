import { useMemo, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { BookOpen, Clock, CheckCircle, Play, Filter, Search, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DashboardSkeleton } from "@/components/ui/loading-skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface TrainingModule {
  id: string;
  title: string;
  description: string;
  duration_minutes: number;
  farm_type: string;
  progress?: {
    progress_percentage: number;
    completed: boolean;
  };
  // Optional content fields if present in DB
  content?: string | null;
  video_url?: string | null;
}

interface TrainingModulesProps {
  farmType?: string;
}

const TrainingModules = ({ farmType }: TrainingModulesProps) => {
  const [modules, setModules] = useState<TrainingModule[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [sort, setSort] = useState<string>("recent");
  const [viewing, setViewing] = useState<TrainingModule | null>(null);

  useEffect(() => {
    fetchModules();
  }, [farmType]);

  const fetchModules = async () => {
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) return;

      let query = supabase
        .from('training_modules')
        .select(`
          *,
          user_training_progress (
            progress_percentage,
            completed
          )
        `)
        .eq('is_published', true)
        .eq('user_training_progress.user_id', user.data.user.id);

      if (farmType) {
        query = query.or(`farm_type.eq.${farmType},farm_type.is.null`);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;

      const modulesWithProgress = data?.map(module => ({
        ...module,
        progress: module.user_training_progress?.[0] || { progress_percentage: 0, completed: false }
      })) || [];

      setModules(modulesWithProgress);
    } catch (error: any) {
      toast.error('Error loading training modules');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const startModule = async (moduleId: string) => {
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) return;

      // Upsert with composite conflict target; ignore duplicate creation
      const { error } = await supabase
        .from('user_training_progress')
        .upsert({
          user_id: user.data.user.id,
          module_id: moduleId,
          progress_percentage: 0,
          completed: false
        }, { onConflict: 'user_id,module_id', ignoreDuplicates: true });

      if (error && (error as any).code !== '23505') throw error;

      toast.success('Training module started!');
      fetchModules();
    } catch (error: any) {
      toast.error('Error starting module');
      console.error('Error:', error);
    }
  };

  const openModule = async (m: TrainingModule) => {
    await startModule(m.id);
    setViewing(m);
  };

  const completeModule = async (moduleId: string) => {
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) return;
      const { error } = await supabase
        .from('user_training_progress')
        .upsert({
          user_id: user.data.user.id,
          module_id: moduleId,
          progress_percentage: 100,
          completed: true
        }, { onConflict: 'user_id,module_id' });
      if (error) throw error;
      toast.success('Marked as completed');
      fetchModules();
    } catch (e) {
      console.error(e);
      toast.error('Failed to mark completed');
    }
  };

  const filtered = useMemo(() => {
    let rows = modules.filter(m =>
      (q.trim() === '' || m.title.toLowerCase().includes(q.toLowerCase()) || m.description.toLowerCase().includes(q.toLowerCase())) &&
      (status === 'all' || (status === 'completed' ? m.progress?.completed : !m.progress?.completed))
    );
    if (sort === 'recent') rows = rows; // already sorted by created_at desc
    if (sort === 'short') rows = [...rows].sort((a,b) => (a.duration_minutes||0) - (b.duration_minutes||0));
    if (sort === 'long') rows = [...rows].sort((a,b) => (b.duration_minutes||0) - (a.duration_minutes||0));
    return rows;
  }, [modules, q, status, sort]);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Training Modules</h2>
        <Badge variant="outline">
          {modules.filter(m => m.progress?.completed).length} of {modules.length} completed
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Filter className="h-5 w-5 text-accent" /> Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input className="pl-9" placeholder="Search modules..." value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="inprogress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger>
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="short">Shortest First</SelectItem>
                <SelectItem value="long">Longest First</SelectItem>
              </SelectContent>
            </Select>
            <div />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {modules.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No training modules available</h3>
              <p className="text-muted-foreground">
                Training modules will appear here once they are published.
              </p>
            </CardContent>
          </Card>
        ) : (
          filtered.map((module) => (
            <Card key={module.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      {module.title}
                      {module.progress?.completed && (
                        <CheckCircle className="h-4 w-4 text-success" />
                      )}
                    </CardTitle>
                    <p className="text-muted-foreground mt-2">{module.description}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {module.duration_minutes} min
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {module.farm_type && (
                    <Badge variant="secondary">{module.farm_type} farms</Badge>
                  )}
                  
                  {module.progress && module.progress.progress_percentage > 0 ? (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{module.progress.progress_percentage}%</span>
                      </div>
                      <Progress value={module.progress.progress_percentage} />
                    </div>
                  ) : null}

                  <div className="flex gap-2">
                    <Button 
                      onClick={() => openModule(module)}
                      variant={module.progress?.progress_percentage > 0 ? "default" : "outline"}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      {module.progress?.progress_percentage > 0 ? "Continue" : "Start"} Module
                    </Button>

                    {module.progress && !module.progress.completed && (
                      <Button variant="outline" onClick={() => completeModule(module.id)}>
                        <Check className="h-4 w-4 mr-2" />
                        Mark Complete
                      </Button>
                    )}
                    
                    {module.progress?.completed && (
                      <Badge variant="outline" className="text-success border-success">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Completed
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      
      <Dialog open={!!viewing} onOpenChange={() => setViewing(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              {viewing?.title}
            </DialogTitle>
            <DialogDescription className="sr-only">Training module details</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <Clock className="h-4 w-4" /> {viewing?.duration_minutes ?? '-'} min
              {viewing?.farm_type && <Badge variant="secondary">{viewing.farm_type} farms</Badge>}
            </div>
            {viewing?.video_url ? (
              <div className="aspect-video rounded-lg overflow-hidden bg-black">
                <iframe
                  src={viewing.video_url}
                  title="Training Video"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : null}
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
      </div>
    </div>
  );
};

export default TrainingModules;