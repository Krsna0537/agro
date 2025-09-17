import { useState } from "react";
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

interface Farm {
  id: string;
  name: string;
  farm_type: string;
}

interface RiskAssessmentFormProps {
  farm: Farm;
}

const assessmentQuestions = [
  {
    id: "biosecurity_plan",
    question: "Do you have a written biosecurity plan?",
    category: "Planning"
  },
  {
    id: "visitor_control",
    question: "Do you control and record all farm visitors?",
    category: "Access Control"
  },
  {
    id: "vehicle_disinfection",
    question: "Are all vehicles disinfected before entering the farm?",
    category: "Sanitation"
  },
  {
    id: "feed_storage",
    question: "Is feed stored in secure, pest-proof containers?",
    category: "Feed Security"
  },
  {
    id: "water_quality",
    question: "Is water quality regularly tested and treated if necessary?",
    category: "Water Management"
  },
  {
    id: "waste_management",
    question: "Do you have proper dead animal disposal procedures?",
    category: "Waste Management"
  },
  {
    id: "quarantine_facilities",
    question: "Do you have quarantine facilities for new animals?",
    category: "Animal Health"
  },
  {
    id: "staff_training",
    question: "Are all staff trained in biosecurity protocols?",
    category: "Human Resources"
  }
];

const RiskAssessmentForm = ({ farm }: RiskAssessmentFormProps) => {
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

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
    if (score >= 80) return { level: "Low", color: "success", icon: CheckCircle };
    if (score >= 60) return { level: "Medium", color: "warning", icon: AlertTriangle };
    return { level: "High", color: "destructive", icon: XCircle };
  };

  const getProgress = () => {
    const answered = Object.keys(responses).length;
    return (answered / assessmentQuestions.length) * 100;
  };

  const handleSubmit = async () => {
    if (Object.keys(responses).length < assessmentQuestions.length) {
      toast.error("Please answer all questions before submitting");
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
      toast.success("Risk assessment completed successfully!");
    } catch (error: any) {
      toast.error("Error saving assessment");
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
            Assessment Completed
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Icon className={`h-8 w-8 text-${color}`} />
              <div>
                <div className="text-3xl font-bold">{riskScore}%</div>
                <Badge variant={color as any} className="mt-2">
                  {level} Risk
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Recommendations</h3>
            {riskScore < 80 && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Based on your assessment, consider improving these areas:
                </p>
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
                <h4 className="font-medium mb-2">Additional Notes:</h4>
                <p className="text-sm text-muted-foreground bg-muted p-3 rounded">
                  {notes}
                </p>
              </div>
            )}
          </div>
          
          <Button onClick={() => setCompleted(false)} variant="outline" className="w-full">
            Take Another Assessment
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Biosecurity Risk Assessment - {farm.name}</CardTitle>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{Object.keys(responses).length} of {assessmentQuestions.length}</span>
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
                    <Label htmlFor={`${question.id}-yes`}>Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id={`${question.id}-no`} />
                    <Label htmlFor={`${question.id}-no`}>No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="partial" id={`${question.id}-partial`} />
                    <Label htmlFor={`${question.id}-partial`}>Partially</Label>
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
            <Label htmlFor="notes">Additional Notes or Observations</Label>
            <Textarea
              id="notes"
              placeholder="Add any additional observations or specific challenges you face..."
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
        {loading ? "Saving..." : "Complete Assessment"}
      </Button>
    </div>
  );
};

export default RiskAssessmentForm;