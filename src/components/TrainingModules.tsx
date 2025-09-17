import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { BookOpen, Clock, CheckCircle, Play } from "lucide-react";

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
}

interface TrainingModulesProps {
  farmType?: string;
}

const TrainingModules = ({ farmType }: TrainingModulesProps) => {
  const [modules, setModules] = useState<TrainingModule[]>([]);
  const [loading, setLoading] = useState(true);

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

      const { error } = await supabase
        .from('user_training_progress')
        .upsert({
          user_id: user.data.user.id,
          module_id: moduleId,
          progress_percentage: 0,
          completed: false
        });

      if (error) throw error;

      toast.success('Training module started!');
      fetchModules();
    } catch (error: any) {
      toast.error('Error starting module');
      console.error('Error:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading training modules...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Training Modules</h2>
        <Badge variant="outline">
          {modules.filter(m => m.progress?.completed).length} of {modules.length} completed
        </Badge>
      </div>

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
          modules.map((module) => (
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
                      onClick={() => startModule(module.id)}
                      variant={module.progress?.progress_percentage > 0 ? "default" : "outline"}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      {module.progress?.progress_percentage > 0 ? "Continue" : "Start"} Module
                    </Button>
                    
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
      </div>
    </div>
  );
};

export default TrainingModules;