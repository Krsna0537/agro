import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  MessageSquare,
  Headphones,
  FileText
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      category: '',
      message: ''
    });
    
    setIsSubmitting(false);
    alert('Thank you for your message! We will get back to you within 24 hours.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      category: value
    }));
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help via email",
      contact: "support@agroguardshield.com",
      response: "Within 24 hours"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Call us directly",
      contact: "+1 (555) 123-4567",
      response: "Mon-Fri, 9AM-6PM"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Chat with our team",
      contact: "Available 24/7",
      response: "Instant response"
    },
    {
      icon: Headphones,
      title: "Technical Support",
      description: "Technical assistance",
      contact: "tech@agroguardshield.com",
      response: "Within 4 hours"
    }
  ];

  const offices = [
    {
      city: "New Delhi, India",
      address: "123 Farm Tech Avenue, Agriculture City, Delhi 110001",
      phone: "+91 11 2345 6789",
      email: "india@agroguardshield.com"
    },
    {
      city: "San Francisco, USA",
      address: "456 Innovation Drive, Tech Valley, CA 94105",
      phone: "+1 (555) 123-4567",
      email: "usa@agroguardshield.com"
    },
    {
      city: "London, UK",
      address: "789 Agri Street, Business District, London EC1A 1BB",
      phone: "+44 20 7946 0958",
      email: "uk@agroguardshield.com"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-white/90">
              We're here to help you protect your farm. Reach out to our team for support, 
              questions, or to learn more about AgroGuard Shield.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What's this about?"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium mb-2">
                        Category
                      </label>
                      <Select value={formData.category} onValueChange={handleSelectChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="support">Technical Support</SelectItem>
                          <SelectItem value="sales">Sales Question</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Methods</h2>
              <div className="grid gap-4">
                {contactMethods.map((method, index) => (
                  <Card key={index} className="hover:shadow-card transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-accent/10 rounded-lg">
                          <method.icon className="h-5 w-5 text-accent" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{method.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                          <p className="font-medium text-accent">{method.contact}</p>
                          <p className="text-xs text-muted-foreground">{method.response}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Office Locations */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Our Offices</h2>
              <div className="space-y-4">
                {offices.map((office, index) => (
                  <Card key={index} className="hover:shadow-card transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-accent mt-1" />
                        <div>
                          <h3 className="font-semibold mb-2">{office.city}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{office.address}</p>
                          <div className="space-y-1">
                            <p className="text-sm">
                              <Phone className="h-3 w-3 inline mr-1" />
                              {office.phone}
                            </p>
                            <p className="text-sm">
                              <Mail className="h-3 w-3 inline mr-1" />
                              {office.email}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Business Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex justify-between">
                      <span className="text-accent font-medium">Emergency Support</span>
                      <span className="font-medium">24/7</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Can't find what you're looking for? Check our FAQ or contact us directly.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="hover:shadow-card transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">How quickly can I get started?</h3>
                  <p className="text-sm text-muted-foreground">
                    You can start using AgroGuard Shield immediately after signing up. 
                    Our setup process takes less than 10 minutes.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-card transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Do you offer training?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes! We provide comprehensive training materials, video tutorials, 
                    and live training sessions for all users.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-card transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">What languages do you support?</h3>
                  <p className="text-sm text-muted-foreground">
                    We support 10+ languages including English, Hindi, Bengali, Tamil, 
                    Telugu, Marathi, Gujarati, Kannada, Malayalam, and Punjabi.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-card transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Is my data secure?</h3>
                  <p className="text-sm text-muted-foreground">
                    Absolutely. We use enterprise-grade encryption and comply with 
                    international data protection standards including GDPR.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center mt-8">
              <Button variant="outline" onClick={() => window.location.href = '/#faq'}>
                <FileText className="mr-2 h-4 w-4" />
                View All FAQs
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

