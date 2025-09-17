import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, TrendingUp, Users } from "lucide-react";
import farmHeroImage from "@/assets/farm-hero.jpg";

const Hero = () => {
  return (
    <section className="relative bg-gradient-hero text-primary-foreground">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Protect Your Farm with 
                <span className="text-accent"> Advanced Biosecurity</span>
              </h1>
              <p className="text-lg text-primary-foreground/90 max-w-xl">
                Comprehensive digital platform for implementing, monitoring, and sustaining robust 
                biosecurity practices in pig and poultry farms.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Disease Prevention</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span>Risk Assessment</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Collaborative Network</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Watch Demo
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">98%</div>
                <div className="text-sm text-primary-foreground/80">Disease Prevention Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">50K+</div>
                <div className="text-sm text-primary-foreground/80">Farms Protected</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">24/7</div>
                <div className="text-sm text-primary-foreground/80">Monitoring</div>
              </div>
            </div>
          </div>

          <div className="lg:block">
            <div className="relative">
              <img 
                src={farmHeroImage} 
                alt="Modern farm with digital biosecurity measures"
                className="rounded-lg shadow-elegant w-full h-auto"
              />
              <div className="absolute -bottom-4 -right-4 bg-card p-4 rounded-lg shadow-card border">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-foreground">Live Monitoring Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;