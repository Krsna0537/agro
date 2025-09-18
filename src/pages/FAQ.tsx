import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp, Search, Mail, MessageSquare, FileText } from "lucide-react";

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      question: "What is AgroGuard Shield?",
      answer: "AgroGuard Shield is a comprehensive digital platform designed to help pig and poultry farms implement, monitor, and maintain robust biosecurity practices. It provides real-time monitoring, risk assessment tools, compliance tracking, and training modules to prevent disease outbreaks and ensure farm safety.",
      category: "General"
    },
    {
      question: "How does the platform help prevent disease outbreaks?",
      answer: "Our platform uses advanced risk assessment algorithms, real-time monitoring systems, and early warning alerts to identify potential biosecurity threats before they become outbreaks. It provides farmers with actionable insights and step-by-step guidance to address risks immediately.",
      category: "Features"
    },
    {
      question: "Is the platform suitable for small farms?",
      answer: "Absolutely! AgroGuard Shield is designed to scale from small family farms to large commercial operations. Our Starter plan is free and perfect for small farms, while our Professional and Enterprise plans offer advanced features for growing operations.",
      category: "Pricing"
    },
    {
      question: "What languages are supported?",
      answer: "We support 10+ regional languages including English, Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, and Punjabi. This ensures farmers can use the platform in their preferred language for better understanding and adoption.",
      category: "Features"
    },
    {
      question: "How secure is my farm data?",
      answer: "Data security is our top priority. We use enterprise-grade encryption, secure cloud infrastructure, and comply with international data protection standards including GDPR. Your farm data is encrypted both in transit and at rest, and we never share your information with third parties without your explicit consent.",
      category: "Security"
    },
    {
      question: "Can I use the platform on my mobile phone?",
      answer: "Yes! AgroGuard Shield is built with a mobile-first approach, ensuring you can access all features on your smartphone or tablet. The mobile app works offline for basic functions and syncs when you have internet connectivity.",
      category: "Features"
    },
    {
      question: "What kind of training and support do you provide?",
      answer: "We provide comprehensive training materials, interactive modules, and step-by-step guides. Our support includes email support for all users, priority support for Professional users, and dedicated support for Enterprise customers. We also offer custom training sessions for teams.",
      category: "Support"
    },
    {
      question: "How does the pricing work?",
      answer: "We offer three tiers: Starter (free forever), Professional ($29/month), and Enterprise (custom pricing). The Starter plan includes basic features for up to 2 farms, while Professional includes advanced features for up to 10 farms. Enterprise offers unlimited farms with custom features and dedicated support.",
      category: "Pricing"
    },
    {
      question: "Can I integrate with my existing farm management systems?",
      answer: "Yes! Our Professional and Enterprise plans include API access and custom integrations. We can work with your existing farm management software, accounting systems, and other tools to create a seamless workflow.",
      category: "Integration"
    },
    {
      question: "What happens if I need to cancel my subscription?",
      answer: "You can cancel your subscription at any time with no penalties. Your data remains accessible for 30 days after cancellation, during which you can export all your information. We believe in transparent pricing with no hidden fees or long-term contracts.",
      category: "Pricing"
    },
    {
      question: "How accurate are the risk assessments?",
      answer: "Our risk assessment algorithms are based on extensive research, veterinary expertise, and real-world data from thousands of farms. The assessments have a 98% accuracy rate in predicting potential biosecurity risks, helping farmers take preventive action before problems occur.",
      category: "Features"
    },
    {
      question: "Do you offer custom solutions for specific farm types?",
      answer: "Yes! Our Enterprise plan includes custom solutions tailored to specific farm types, regional requirements, and unique operational needs. We work closely with large operations and regulatory bodies to develop specialized features and workflows.",
      category: "Enterprise"
    },
    {
      question: "How do I get started with the platform?",
      answer: "Getting started is easy! Simply sign up for a free account, complete the quick setup wizard, and you'll be ready to start monitoring your farm's biosecurity. Our onboarding process guides you through each step, and our support team is always available to help.",
      category: "Getting Started"
    },
    {
      question: "What types of farms can use AgroGuard Shield?",
      answer: "AgroGuard Shield is specifically designed for pig and poultry farms, including small family farms, commercial operations, and mixed livestock farms. The platform adapts to different farm sizes and types, providing relevant features and recommendations for each operation.",
      category: "General"
    },
    {
      question: "How often is the platform updated?",
      answer: "We release regular updates with new features, improvements, and security enhancements. Updates are typically released monthly, and we notify users about new features through the platform and email. All updates are included in your subscription at no extra cost.",
      category: "Updates"
    },
    {
      question: "Can multiple users access the same farm account?",
      answer: "Yes! Our Professional and Enterprise plans support multiple users per farm. You can invite team members, veterinarians, and other stakeholders to collaborate on your farm's biosecurity management. Each user can have different permission levels based on their role.",
      category: "Collaboration"
    }
  ];

  const categories = ["All", "General", "Features", "Pricing", "Security", "Support", "Integration", "Enterprise", "Getting Started", "Updates", "Collaboration"];

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-white/90">
              Find answers to common questions about AgroGuard Shield and how it can help protect your farm.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <div className="text-sm text-muted-foreground mb-6">
            Showing {filteredFaqs.length} of {faqs.length} questions
          </div>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFaqs.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No questions found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search terms or category filter.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredFaqs.map((faq, index) => (
              <Card key={index} className="hover:shadow-card transition-all duration-300">
                <CardContent className="p-0">
                  <button
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                    onClick={() => toggleItem(index)}
                  >
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                          {faq.category}
                        </span>
                      </div>
                      <h3 className="font-semibold text-foreground">{faq.question}</h3>
                    </div>
                    {openItems.includes(index) ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    )}
                  </button>
                  {openItems.includes(index) && (
                    <div className="px-6 pb-6 pt-0">
                      <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Contact Support */}
        <div className="max-w-4xl mx-auto mt-16">
          <Card className="bg-gradient-to-r from-accent/10 to-primary/10 border-accent/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
              <p className="text-muted-foreground mb-6">
                Can't find the answer you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => window.location.href = 'mailto:support@agroguardshield.com'}
                  className="flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Email Support
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.location.href = '/contact'}
                  className="flex items-center gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  Contact Us
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.location.href = '/#pricing'}
                  className="flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  View Pricing
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Popular Topics */}
        <div className="max-w-4xl mx-auto mt-16">
          <h3 className="text-2xl font-bold text-center mb-8">Popular Topics</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { topic: "Getting Started", count: "5 questions" },
              { topic: "Account Setup", count: "3 questions" },
              { topic: "Mobile App", count: "4 questions" },
              { topic: "Data Security", count: "6 questions" },
              { topic: "Billing & Pricing", count: "8 questions" },
              { topic: "Technical Support", count: "7 questions" }
            ].map((item, index) => (
              <Card key={index} className="hover:shadow-card transition-all duration-300 cursor-pointer">
                <CardContent className="p-4 text-center">
                  <h4 className="font-semibold mb-1">{item.topic}</h4>
                  <p className="text-sm text-muted-foreground">{item.count}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;

