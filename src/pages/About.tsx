import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Target, 
  Users, 
  Award, 
  Globe, 
  Shield, 
  Heart,
  TrendingUp,
  BookOpen,
  Zap,
  CheckCircle,
  ArrowRight,
  Mail,
  Phone,
  MapPin
} from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "Protection First",
      description: "We prioritize the health and safety of livestock and the communities that depend on them."
    },
    {
      icon: Users,
      title: "Farmer-Centric",
      description: "Every feature is designed with real farmers' needs and challenges in mind."
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Supporting sustainable agriculture practices that benefit farmers worldwide."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to delivering the highest quality solutions and support."
    }
  ];

  const milestones = [
    {
      year: "2020",
      title: "Company Founded",
      description: "Started with a vision to revolutionize farm biosecurity"
    },
    {
      year: "2021",
      title: "First 100 Farms",
      description: "Reached our first milestone of 100 protected farms"
    },
    {
      year: "2022",
      title: "AI Integration",
      description: "Launched AI-powered risk assessment and monitoring"
    },
    {
      year: "2023",
      title: "10,000+ Farms",
      description: "Expanded to protect over 10,000 farms globally"
    },
    {
      year: "2024",
      title: "Multi-Language Support",
      description: "Launched support for 10+ regional languages"
    }
  ];


  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About AgroGuard Shield
            </h1>
            <p className="text-xl text-white/90">
              We're on a mission to protect livestock and ensure food security through 
              innovative biosecurity solutions that empower farmers and protect communities.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Mission Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Target className="h-8 w-8 text-accent" />
              Our Mission
            </h2>
            <p className="text-muted-foreground mb-6">
              To revolutionize livestock farming by providing comprehensive, accessible, 
              and effective biosecurity management tools that prevent disease outbreaks, 
              protect animal welfare, and ensure sustainable food production.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" />
                <span>Prevent disease outbreaks through early detection</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" />
                <span>Empower farmers with knowledge and tools</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" />
                <span>Support sustainable agriculture practices</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" />
                <span>Ensure food security for growing populations</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Heart className="h-8 w-8 text-accent" />
              Our Vision
            </h2>
            <p className="text-muted-foreground mb-6">
              A world where every farm has access to advanced biosecurity protection, 
              where disease outbreaks are prevented before they start, and where 
              sustainable agriculture supports thriving communities.
            </p>
            <div className="bg-accent/10 rounded-lg p-6">
              <h3 className="font-semibold mb-3 text-accent">By 2030, we aim to:</h3>
              <ul className="space-y-2 text-sm">
                <li>• Protect 1 million farms worldwide</li>
                <li>• Reduce livestock disease outbreaks by 90%</li>
                <li>• Train 100,000 farmers in best practices</li>
                <li>• Support 50+ countries with localized solutions</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-card transition-all duration-300">
                <CardContent className="p-6">
                  <div className="mx-auto w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-accent/20"></div>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <Card className="hover:shadow-card transition-all duration-300">
                      <CardContent className="p-4">
                        <Badge className="mb-2 bg-accent text-accent-foreground">{milestone.year}</Badge>
                        <h3 className="font-semibold mb-1">{milestone.title}</h3>
                        <p className="text-sm text-muted-foreground">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="w-4 h-4 bg-accent rounded-full border-4 border-background z-10"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* Contact Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Us?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you're a farmer looking to protect your livestock, a veterinarian wanting to help clients, 
            or an organization interested in partnership, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => window.location.href = '/contact'}>
              Get in Touch
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.location.href = '/#pricing'}>
              View Pricing
            </Button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="p-6">
              <Mail className="h-8 w-8 text-accent mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Email Us</h3>
              <p className="text-sm text-muted-foreground">support@agroguardshield.com</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Phone className="h-8 w-8 text-accent mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Call Us</h3>
              <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <MapPin className="h-8 w-8 text-accent mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Visit Us</h3>
              <p className="text-sm text-muted-foreground">123 Farm Tech Ave, Agriculture City</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;

