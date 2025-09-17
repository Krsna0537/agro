import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Shield, 
  BookOpen, 
  ClipboardCheck, 
  Bell, 
  Smartphone, 
  BarChart3,
  Users,
  AlertTriangle
} from "lucide-react";
import dashboardPreview from "@/assets/dashboard-preview.jpg";

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Risk Assessment Tools",
      description: "Customizable assessments adapted to local epidemiological conditions and farm-specific risks.",
      color: "text-primary"
    },
    {
      icon: BookOpen,
      title: "Interactive Training",
      description: "Best practice guidelines tailored specifically for pig and poultry production systems.",
      color: "text-accent"
    },
    {
      icon: ClipboardCheck,
      title: "Compliance Tracking", 
      description: "Tools aligned with regulatory frameworks to support disease-free compartment recognition.",
      color: "text-success"
    },
    {
      icon: Bell,
      title: "Real-Time Alerts",
      description: "Instant notifications for disease outbreaks and potential biosecurity breaches.",
      color: "text-info"
    },
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Accessible interface designed for farmers in remote and rural regions with multilingual support.",
      color: "text-warning"
    },
    {
      icon: BarChart3,
      title: "Data Analytics",
      description: "Comprehensive data collection supporting evidence-based decision-making for policymakers.",
      color: "text-primary"
    },
    {
      icon: Users,
      title: "Collaborative Network",
      description: "Platform connecting farmers, veterinarians, extension workers, and regulatory authorities.",
      color: "text-accent"
    },
    {
      icon: AlertTriangle,
      title: "Outbreak Monitoring",
      description: "Advanced surveillance system for early detection and rapid response to disease threats.",
      color: "text-destructive"
    }
  ];

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Comprehensive Biosecurity Management
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our platform integrates cutting-edge technology with practical farm management tools 
            to deliver end-to-end biosecurity solutions for modern livestock operations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="h-full hover:shadow-card transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className={`mx-auto w-12 h-12 rounded-lg bg-background flex items-center justify-center mb-3 ${feature.color}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4">Powerful Dashboard Analytics</h3>
            <p className="text-muted-foreground mb-6">
              Get instant insights into your farm's biosecurity status with our comprehensive 
              dashboard featuring real-time monitoring, compliance tracking, and risk assessment visualization.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Real-time biosecurity score monitoring</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Compliance status tracking and reporting</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Risk assessment visualization and trends</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Training progress and certification tracking</span>
              </li>
            </ul>
          </div>
          <div>
            <img 
              src={dashboardPreview}
              alt="Farm management dashboard interface"
              className="rounded-lg shadow-elegant w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;