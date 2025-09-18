import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  Shield,
  ArrowRight,
  Globe,
  Award,
  Users,
  TrendingUp
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "API Documentation", href: "#api" },
      { name: "Integrations", href: "#integrations" },
      { name: "Mobile App", href: "#mobile" }
    ],
    solutions: [
      { name: "Pig Farming", href: "#pig-farming" },
      { name: "Poultry Production", href: "#poultry" },
      { name: "Mixed Livestock", href: "#mixed" },
      { name: "Veterinary Services", href: "#veterinary" },
      { name: "Extension Services", href: "#extension" }
    ],
    resources: [
      { name: "Help Center", href: "#help" },
      { name: "Training Materials", href: "#training" },
      { name: "Case Studies", href: "#cases" },
      { name: "White Papers", href: "#papers" },
      { name: "Blog", href: "#blog" }
    ],
    company: [
      { name: "About Us", href: "#about" },
      { name: "Careers", href: "#careers" },
      { name: "Partners", href: "#partners" },
      { name: "Press", href: "#press" },
      { name: "Contact", href: "#contact" }
    ],
    legal: [
      { name: "Privacy Policy", href: "#privacy" },
      { name: "Terms of Service", href: "#terms" },
      { name: "Cookie Policy", href: "#cookies" },
      { name: "GDPR Compliance", href: "#gdpr" },
      { name: "Data Security", href: "#security" }
    ]
  };

  const stats = [
    { icon: Users, value: "50,000+", label: "Active Farms" },
    { icon: Shield, value: "98%", label: "Disease Prevention" },
    { icon: TrendingUp, value: "25%", label: "Cost Reduction" },
    { icon: Award, value: "99.9%", label: "Uptime" }
  ];

  return (
    <footer className="bg-slate-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-primary to-accent py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Stay Updated with Latest Biosecurity Insights
            </h3>
            <p className="text-lg mb-8 text-white/90">
              Get expert tips, industry updates, and best practices delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email address"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
              />
              <Button className="bg-white text-primary hover:bg-white/90">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2">
                  <stat.icon className="h-8 w-8 text-accent" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-accent mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-8 w-8 text-accent" />
                <span className="text-xl font-bold">AgroGuard Shield</span>
              </div>
              <p className="text-slate-300 mb-6 max-w-sm">
                Advanced biosecurity management platform protecting livestock farms worldwide 
                with cutting-edge technology and comprehensive monitoring solutions.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-300">
                  <Mail className="h-4 w-4 text-accent" />
                  <span>support@agroguardshield.com</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Phone className="h-4 w-4 text-accent" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <MapPin className="h-4 w-4 text-accent" />
                  <span>123 Farm Tech Ave, Agriculture City, AC 12345</span>
                </div>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-3">
                {footerLinks.product.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-slate-300 hover:text-accent transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions Links */}
            <div>
              <h4 className="font-semibold mb-4">Solutions</h4>
              <ul className="space-y-3">
                {footerLinks.solutions.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-slate-300 hover:text-accent transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-slate-300 hover:text-accent transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-slate-300 hover:text-accent transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-700 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4 text-slate-400 text-sm">
              <p>&copy; {currentYear} AgroGuard Shield. All rights reserved.</p>
              <div className="flex gap-6">
                {footerLinks.legal.map((link, index) => (
                  <a 
                    key={index}
                    href={link.href} 
                    className="hover:text-accent transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-slate-400 text-sm">Available in:</span>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-accent" />
                <span className="text-sm">English, हिन्दी, বাংলা, தமிழ், తెలుగు</span>
              </div>
            </div>
          </div>
          
          {/* Social Media Links */}
          <div className="flex justify-center md:justify-end mt-6">
            <div className="flex gap-4">
              <a 
                href="#" 
                className="p-2 bg-slate-800 rounded-lg hover:bg-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-slate-800 rounded-lg hover:bg-accent transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-slate-800 rounded-lg hover:bg-accent transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-slate-800 rounded-lg hover:bg-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
