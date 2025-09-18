import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  CheckCircle
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

  const team = [
    {
      name: "Dr. Sarah Wilson",
      role: "Chief Executive Officer",
      expertise: "Veterinary Medicine, 15+ years",
      image: "/api/placeholder/80/80"
    },
    {
      name: "Rajesh Kumar",
      role: "Chief Technology Officer",
      expertise: "Agricultural Technology, 12+ years",
      image: "/api/placeholder/80/80"
    },
    {
      name: "Dr. Priya Sharma",
      role: "Head of Veterinary Services",
      expertise: "Livestock Health, 18+ years",
      image: "/api/placeholder/80/80"
    },
    {
      name: "Amit Patel",
      role: "Head of Product",
      expertise: "Farm Management Systems, 10+ years",
      image: "/api/placeholder/80/80"
    }
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Mission Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Mission & Vision
          </h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto mb-8">
            We're on a mission to protect livestock and ensure food security through 
            innovative biosecurity solutions that empower farmers and protect communities.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Target className="h-8 w-8 text-accent" />
              Our Mission
            </h3>
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
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Heart className="h-8 w-8 text-accent" />
              Our Vision
            </h3>
            <p className="text-muted-foreground mb-6">
              A world where every farm has access to advanced biosecurity protection, 
              where disease outbreaks are prevented before they start, and where 
              sustainable agriculture supports thriving communities.
            </p>
            <div className="bg-accent/10 rounded-lg p-6">
              <h4 className="font-semibold mb-3 text-accent">By 2030, we aim to:</h4>
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
          <h3 className="text-2xl font-bold text-center mb-8">Our Core Values</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-card transition-all duration-300">
                <CardContent className="p-6">
                  <div className="mx-auto w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h4 className="font-semibold mb-2">{value.title}</h4>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Our Journey</h3>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-accent/20"></div>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <Card className="hover:shadow-card transition-all duration-300">
                      <CardContent className="p-4">
                        <Badge className="mb-2 bg-accent text-accent-foreground">{milestone.year}</Badge>
                        <h4 className="font-semibold mb-1">{milestone.title}</h4>
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

        {/* Team Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Meet Our Team</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-card transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-2xl font-bold text-muted-foreground">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h4 className="font-semibold mb-1">{member.name}</h4>
                  <p className="text-sm text-accent mb-2">{member.role}</p>
                  <p className="text-xs text-muted-foreground">{member.expertise}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-8">Our Impact in Numbers</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold mb-2">50,000+</div>
              <div className="text-sm opacity-90">Farms Protected</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">98%</div>
              <div className="text-sm opacity-90">Disease Prevention Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">25+</div>
              <div className="text-sm opacity-90">Countries Served</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">99.9%</div>
              <div className="text-sm opacity-90">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
