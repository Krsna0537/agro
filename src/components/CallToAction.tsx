import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Shield, Users, Zap, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CallToAction = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: Shield,
      title: "98% Disease Prevention",
      description: "Proven track record in preventing livestock disease outbreaks"
    },
    {
      icon: Users,
      title: "50,000+ Farms Protected",
      description: "Join thousands of successful farmers worldwide"
    },
    {
      icon: Zap,
      title: "24/7 Real-time Monitoring",
      description: "Never miss a potential biosecurity threat again"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-primary to-accent text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Farm's Biosecurity?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of farmers who trust AgroGuard Shield to protect their livestock 
            and ensure sustainable, profitable farming operations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              variant="secondary" 
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6"
              onClick={() => navigate('/auth')}
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6"
              onClick={() => navigate('/auth')}
            >
              Schedule a Demo
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-white/10 border-white/20 text-white">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center mb-4">
                    <benefit.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-white/80">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-white/10 rounded-lg p-6 border border-white/20">
            <h3 className="text-xl font-semibold mb-4">Why Choose AgroGuard Shield?</h3>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-sm">No setup fees or hidden costs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-sm">14-day free trial with full access</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-sm">Cancel anytime, no long-term contracts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-sm">Multi-language support (10+ languages)</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-sm">Mobile-first design for remote access</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-sm">Expert training and support included</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-sm">Compliance with regulatory standards</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-sm">Data export and backup included</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-sm text-white/70">
            <p>Trusted by farmers, veterinarians, and agricultural organizations worldwide</p>
            <div className="flex justify-center items-center gap-8 mt-4 opacity-60">
              <span className="text-lg font-semibold">Ministry of Agriculture</span>
              <span className="text-lg font-semibold">Veterinary Council</span>
              <span className="text-lg font-semibold">Farmers Association</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
