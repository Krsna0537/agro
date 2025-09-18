import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Pig Farm Owner",
      location: "Punjab, India",
      image: "/api/placeholder/40/40",
      rating: 5,
      content: "AgroGuard Shield has revolutionized our farm's biosecurity management. The real-time monitoring and alerts have helped us prevent two potential disease outbreaks this year alone.",
      farm: "Kumar Farms - 150 pigs"
    },
    {
      name: "Dr. Priya Sharma",
      role: "Veterinarian",
      location: "Haryana, India", 
      image: "/api/placeholder/40/40",
      rating: 5,
      content: "The platform's comprehensive risk assessment tools and compliance tracking make it easy to monitor multiple farms. It's become an essential part of my practice.",
      farm: "Delhi Veterinary Clinic"
    },
    {
      name: "Amit Patel",
      role: "Mixed Farm Owner",
      location: "Gujarat, India",
      image: "/api/placeholder/40/40",
      rating: 5,
      content: "Managing both pig and poultry operations was challenging until we started using AgroGuard Shield. The multi-species support and training modules are excellent.",
      farm: "Patel Mixed Farm - 200 animals"
    },
    {
      name: "Sunita Singh",
      role: "Farm Manager",
      location: "Uttar Pradesh, India",
      image: "/api/placeholder/40/40",
      rating: 5,
      content: "The mobile app is fantastic for remote monitoring. I can check our farm's biosecurity status from anywhere and get instant alerts if anything needs attention.",
      farm: "Singh Livestock - 120 pigs"
    },
    {
      name: "Dr. Vikram Reddy",
      role: "Extension Worker",
      location: "Telangana, India",
      image: "/api/placeholder/40/40",
      rating: 5,
      content: "This platform has made it so much easier to provide guidance to farmers. The training materials and compliance tracking help farmers understand and implement best practices.",
      farm: "Telangana Extension Services"
    },
    {
      name: "Lakshmi Nair",
      role: "Regulatory Officer",
      location: "Kerala, India",
      image: "/api/placeholder/40/40",
      rating: 5,
      content: "AgroGuard Shield provides the data transparency and compliance reporting we need for regulatory oversight. It's a game-changer for disease surveillance.",
      farm: "Kerala Agriculture Department"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted by Farmers & Professionals
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            See what our users say about their experience with AgroGuard Shield
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="h-full hover:shadow-card transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <div className="relative mb-4">
                  <Quote className="h-6 w-6 text-accent/20 absolute -top-2 -left-2" />
                  <p className="text-muted-foreground italic pl-4">
                    "{testimonial.content}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.location}</div>
                    <div className="text-xs text-accent font-medium">{testimonial.farm}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-8">Trusted by leading organizations</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-2xl font-bold text-muted-foreground">Ministry of Agriculture</div>
            <div className="text-2xl font-bold text-muted-foreground">Veterinary Council</div>
            <div className="text-2xl font-bold text-muted-foreground">Farmers Association</div>
            <div className="text-2xl font-bold text-muted-foreground">Extension Services</div>
            <div className="text-2xl font-bold text-muted-foreground">Research Institutes</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
