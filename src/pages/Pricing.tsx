import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Star, Shield, Users, Zap, ArrowRight, CheckCircle } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      description: "Perfect for small farms getting started with biosecurity",
      price: "Free",
      period: "forever",
      popular: false,
      features: [
        "Up to 2 farms",
        "Basic risk assessment",
        "Mobile app access",
        "Email support",
        "Standard training modules",
        "Basic compliance tracking"
      ],
      limitations: [
        "Limited analytics",
        "No custom reports",
        "Basic alerts only"
      ],
      cta: "Start Free Trial",
      icon: Shield
    },
    {
      name: "Professional",
      description: "Ideal for growing farms and veterinary practices",
      price: "$29",
      period: "per month",
      popular: true,
      features: [
        "Up to 10 farms",
        "Advanced risk assessment",
        "Real-time monitoring",
        "Priority support",
        "All training modules",
        "Comprehensive compliance tracking",
        "Custom reports",
        "API access",
        "Multi-language support"
      ],
      limitations: [],
      cta: "Start 14-day Trial",
      icon: Users
    },
    {
      name: "Enterprise",
      description: "For large operations and regulatory bodies",
      price: "Custom",
      period: "pricing",
      popular: false,
      features: [
        "Unlimited farms",
        "Advanced analytics & AI insights",
        "24/7 monitoring",
        "Dedicated support",
        "Custom training programs",
        "Full compliance suite",
        "Advanced reporting",
        "White-label options",
        "Custom integrations",
        "SLA guarantees"
      ],
      limitations: [],
      cta: "Contact Sales",
      icon: Zap
    }
  ];

  const addOns = [
    {
      name: "Additional Farms",
      description: "Add more farms to your plan",
      price: "$5 per farm/month"
    },
    {
      name: "Premium Support",
      description: "24/7 phone and chat support",
      price: "$19/month"
    },
    {
      name: "Custom Training",
      description: "Tailored training programs for your team",
      price: "$99/session"
    },
    {
      name: "API Access",
      description: "Integrate with your existing systems",
      price: "$49/month"
    }
  ];

  const faqs = [
    {
      question: "Can I change plans anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences."
    },
    {
      question: "Is there a setup fee?",
      answer: "No setup fees for any plan. We believe in transparent pricing with no hidden costs."
    },
    {
      question: "What happens to my data if I cancel?",
      answer: "Your data remains accessible for 30 days after cancellation. You can export all your data in standard formats during this period."
    },
    {
      question: "Do you offer discounts for annual billing?",
      answer: "Yes! We offer 20% discount for annual billing on Professional and Enterprise plans. Contact us for custom pricing for longer commitments."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-white/90">
              Choose the plan that fits your farm's needs. All plans include core biosecurity features 
              with no hidden fees or long-term contracts.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Pricing Plans */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative h-full ${
                plan.popular 
                  ? 'border-accent shadow-lg scale-105' 
                  : 'hover:shadow-card'
              } transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-accent text-accent-foreground px-4 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className={`mx-auto w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4 ${
                  plan.popular ? 'bg-accent/10' : ''
                }`}>
                  <plan.icon className={`h-6 w-6 ${plan.popular ? 'text-accent' : 'text-muted-foreground'}`} />
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <p className="text-muted-foreground text-sm">{plan.description}</p>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">{plan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <Button 
                  className={`w-full mb-6 ${
                    plan.popular 
                      ? 'bg-accent text-accent-foreground hover:bg-accent/90' 
                      : 'bg-primary text-primary-foreground hover:bg-primary/90'
                  }`}
                >
                  {plan.cta}
                </Button>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">What's included:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-success flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {plan.limitations.map((limitation, limitIndex) => (
                      <li key={limitIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <X className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span>{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add-ons Section */}
        <div className="bg-muted/30 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Add-ons & Extensions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <div key={index} className="text-center">
                <h3 className="font-semibold mb-2">{addon.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{addon.description}</p>
                <p className="text-accent font-semibold">{addon.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="hover:shadow-card transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of farmers who trust AgroGuard Shield to protect their livestock. 
            Start your free trial today with no commitment required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => window.location.href = '/auth'}>
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.location.href = '/contact'}>
              Contact Sales
            </Button>
          </div>
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
    </div>
  );
};

export default Pricing;

