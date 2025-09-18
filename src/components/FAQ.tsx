import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

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
      answer: "AgroGuard Shield is a comprehensive digital platform designed to help pig and poultry farms implement, monitor, and maintain robust biosecurity practices. It provides real-time monitoring, risk assessment tools, compliance tracking, and training modules to prevent disease outbreaks and ensure farm safety."
    },
    {
      question: "How does the platform help prevent disease outbreaks?",
      answer: "Our platform uses advanced risk assessment algorithms, real-time monitoring systems, and early warning alerts to identify potential biosecurity threats before they become outbreaks. It provides farmers with actionable insights and step-by-step guidance to address risks immediately."
    },
    {
      question: "Is the platform suitable for small farms?",
      answer: "Absolutely! AgroGuard Shield is designed to scale from small family farms to large commercial operations. Our Starter plan is free and perfect for small farms, while our Professional and Enterprise plans offer advanced features for growing operations."
    },
    {
      question: "What languages are supported?",
      answer: "We support 10+ regional languages including English, Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, and Punjabi. This ensures farmers can use the platform in their preferred language for better understanding and adoption."
    },
    {
      question: "How secure is my farm data?",
      answer: "Data security is our top priority. We use enterprise-grade encryption, secure cloud infrastructure, and comply with international data protection standards including GDPR. Your farm data is encrypted both in transit and at rest, and we never share your information with third parties without your explicit consent."
    },
    {
      question: "Can I use the platform on my mobile phone?",
      answer: "Yes! AgroGuard Shield is built with a mobile-first approach, ensuring you can access all features on your smartphone or tablet. The mobile app works offline for basic functions and syncs when you have internet connectivity."
    },
    {
      question: "What kind of training and support do you provide?",
      answer: "We provide comprehensive training materials, interactive modules, and step-by-step guides. Our support includes email support for all users, priority support for Professional users, and dedicated support for Enterprise customers. We also offer custom training sessions for teams."
    },
    {
      question: "How does the pricing work?",
      answer: "We offer three tiers: Starter (free forever), Professional ($29/month), and Enterprise (custom pricing). The Starter plan includes basic features for up to 2 farms, while Professional includes advanced features for up to 10 farms. Enterprise offers unlimited farms with custom features and dedicated support."
    },
    {
      question: "Can I integrate with my existing farm management systems?",
      answer: "Yes! Our Professional and Enterprise plans include API access and custom integrations. We can work with your existing farm management software, accounting systems, and other tools to create a seamless workflow."
    },
    {
      question: "What happens if I need to cancel my subscription?",
      answer: "You can cancel your subscription at any time with no penalties. Your data remains accessible for 30 days after cancellation, during which you can export all your information. We believe in transparent pricing with no hidden fees or long-term contracts."
    },
    {
      question: "How accurate are the risk assessments?",
      answer: "Our risk assessment algorithms are based on extensive research, veterinary expertise, and real-world data from thousands of farms. The assessments have a 98% accuracy rate in predicting potential biosecurity risks, helping farmers take preventive action before problems occur."
    },
    {
      question: "Do you offer custom solutions for specific farm types?",
      answer: "Yes! Our Enterprise plan includes custom solutions tailored to specific farm types, regional requirements, and unique operational needs. We work closely with large operations and regulatory bodies to develop specialized features and workflows."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Find answers to common questions about AgroGuard Shield and how it can help protect your farm.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="hover:shadow-card transition-all duration-300">
              <CardContent className="p-0">
                <button
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                  onClick={() => toggleItem(index)}
                >
                  <h3 className="font-semibold text-foreground pr-4">{faq.question}</h3>
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
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:support@agroguardshield.com" 
              className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Contact Support
            </a>
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Schedule a Call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
