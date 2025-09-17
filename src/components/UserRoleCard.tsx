import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface UserRoleCardProps {
  title: string;
  description: string;
  features: string[];
  icon: LucideIcon;
  color: "primary" | "accent" | "success" | "info";
}

const colorClasses = {
  primary: "border-primary/20 hover:border-primary/40",
  accent: "border-accent/20 hover:border-accent/40", 
  success: "border-success/20 hover:border-success/40",
  info: "border-info/20 hover:border-info/40"
};

const iconColorClasses = {
  primary: "text-primary",
  accent: "text-accent",
  success: "text-success", 
  info: "text-info"
};

const UserRoleCard = ({ title, description, features, icon: Icon, color }: UserRoleCardProps) => {
  return (
    <Card className={`h-full transition-all duration-300 hover:shadow-card ${colorClasses[color]}`}>
      <CardHeader className="text-center">
        <div className={`mx-auto w-12 h-12 rounded-lg bg-background flex items-center justify-center mb-4 ${iconColorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <p className="text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Button className="w-full mt-6" onClick={() => window.location.href = '/auth'}>
          Register as {title}
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserRoleCard;