import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { getRADict } from "@/components/dashboards/risk_assessment.i18n";

interface Farm {
  id: string;
  name: string;
  farm_type: string;
}

interface RiskAssessmentFormProps {
  farm: Farm;
}

const assessmentQuestionsBase = [
  {
    id: "biosecurity_plan",
    key: "q_biosecurity_plan",
    categoryKey: "category_Planning"
  },
  {
    id: "visitor_control",
    key: "q_visitor_control",
    categoryKey: "category_Access"
  },
  {
    id: "vehicle_disinfection",
    key: "q_vehicle_disinfection",
    categoryKey: "category_Sanitation"
  },
  {
    id: "feed_storage",
    key: "q_feed_storage",
    categoryKey: "category_Feed"
  },
  {
    id: "water_quality",
    key: "q_water_quality",
    categoryKey: "category_Water"
  },
  {
    id: "waste_management",
    key: "q_waste_management",
    categoryKey: "category_Waste"
  },
  {
    id: "quarantine_facilities",
    key: "q_quarantine_facilities",
    categoryKey: "category_Health"
  },
  {
    id: "staff_training",
    key: "q_staff_training",
    categoryKey: "category_HR"
  }
];

const RiskAssessmentForm = ({ farm }: RiskAssessmentFormProps) => {
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const locale = (localStorage.getItem('farmer_locale') as any) || 'en';
  const t = useMemo(() => getRADict(locale), [locale]);
  const assessmentQuestions = useMemo(() => assessmentQuestionsBase.map(q => ({
    ...q,
    question: t[q.key],
    category: t[q.categoryKey],
  })), [t]);

  const handleResponseChange = (questionId: string, value: string) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const calculateRiskScore = () => {
    const totalQuestions = assessmentQuestions.length;
    const yesAnswers = Object.values(responses).filter(response => response === "yes").length;
    return Math.round((yesAnswers / totalQuestions) * 100);
  };

  const getRiskLevel = (score: number) => {
    if (score >= 80) return { level: t.low, color: "success", icon: CheckCircle };
    if (score >= 60) return { level: t.medium, color: "warning", icon: AlertTriangle };
    return { level: t.high, color: "destructive", icon: XCircle };
  };

  const getProgress = () => {
    const answered = Object.keys(responses).length;
    return (answered / assessmentQuestions.length) * 100;
  };

  const handleSubmit = async () => {
    if (Object.keys(responses).length < assessmentQuestions.length) {
      toast.error(t.complete);
      return;
    }

    setLoading(true);
    
    try {
      const riskScore = calculateRiskScore();
      const assessmentData = {
        responses,
        categories: assessmentQuestions.reduce((acc, q) => {
          acc[q.category] = (acc[q.category] || 0) + (responses[q.id] === "yes" ? 1 : 0);
          return acc;
        }, {} as Record<string, number>)
      };

      const { error } = await supabase
        .from('biosecurity_assessments')
        .insert([
          {
            farm_id: farm.id,
            assessor_id: (await supabase.auth.getUser()).data.user?.id,
            status: 'completed',
            risk_score: riskScore,
            assessment_data: assessmentData,
            recommendations: notes,
            completed_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;

      setCompleted(true);
      toast.success(t.completed);
    } catch (error: any) {
      toast.error(t.saving);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (completed) {
    const riskScore = calculateRiskScore();
    const { level, color, icon: Icon } = getRiskLevel(riskScore);
    
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-success" />
            {t.completed}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Icon className={`h-8 w-8 text-${color}`} />
              <div>
                <div className="text-3xl font-bold">{riskScore}%</div>
                <Badge variant={color as any} className="mt-2">
                  {level} {t.risk}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t.recommendations}</h3>
            {riskScore < 80 && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{t.improveAreas}</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {assessmentQuestions
                    .filter(q => responses[q.id] !== "yes")
                    .map(q => (
                      <li key={q.id}>{q.question}</li>
                    ))}
                </ul>
              </div>
            )}
            {notes && (
              <div>
                <h4 className="font-medium mb-2">{t.additionalNotes}</h4>
                <p className="text-sm text-muted-foreground bg-muted p-3 rounded">
                  {notes}
                </p>
              </div>
            )}
          </div>
          
          <Button onClick={() => setCompleted(false)} variant="outline" className="w-full">
            {t.takeAnother}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t.title} - {farm.name}</CardTitle>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{t.progress}</span>
              <span>{Object.keys(responses).length} {t.of} {assessmentQuestions.length}</span>
            </div>
            <Progress value={getProgress()} />
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-6">
        {assessmentQuestions.map((question, index) => (
          <Card key={question.id}>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <Badge variant="outline" className="mb-2">{question.category}</Badge>
                  <Label className="text-base font-medium">
                    {index + 1}. {question.question}
                  </Label>
                </div>
                
                <RadioGroup 
                  value={responses[question.id] || ""} 
                  onValueChange={(value) => handleResponseChange(question.id, value)}
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id={`${question.id}-yes`} />
                    <Label htmlFor={`${question.id}-yes`}>{t.yes}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id={`${question.id}-no`} />
                    <Label htmlFor={`${question.id}-no`}>{t.no}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="partial" id={`${question.id}-partial`} />
                    <Label htmlFor={`${question.id}-partial`}>{t.partial}</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <Label htmlFor="notes">{t.notesLabel}</Label>
            <Textarea
              id="notes"
              placeholder={t.notesPlaceholder}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Button 
        onClick={handleSubmit} 
        disabled={loading || Object.keys(responses).length < assessmentQuestions.length}
        className="w-full"
        size="lg"
      >
        {loading ? t.saving : t.complete}
      </Button>
    </div>
  );
};

export default RiskAssessmentForm;