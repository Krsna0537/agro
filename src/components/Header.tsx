import { Button } from "@/components/ui/button";
import { Shield, Menu, Bell } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-card border-b shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-foreground">AgroGuard Shield</h1>
              <p className="text-xs text-muted-foreground">Advanced Biosecurity Management</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-foreground hover:text-primary transition-colors">Features</a>
            <button 
              onClick={() => navigate('/pricing')} 
              className="text-foreground hover:text-primary transition-colors"
            >
              Pricing
            </button>
            <button 
              onClick={() => navigate('/about')} 
              className="text-foreground hover:text-primary transition-colors"
            >
              About
            </button>
            <a href="#testimonials" className="text-foreground hover:text-primary transition-colors">Testimonials</a>
            <button 
              onClick={() => navigate('/faq')} 
              className="text-foreground hover:text-primary transition-colors"
            >
              FAQ
            </button>
            <button 
              onClick={() => navigate('/contact')} 
              className="text-foreground hover:text-primary transition-colors"
            >
              Contact
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => navigate('/alerts')} aria-label="Alerts">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate('/auth')}>Sign In</Button>
            <Button size="sm" onClick={() => navigate('/auth')}>Get Started</Button>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col gap-2">
              <a href="#features" className="text-foreground hover:text-primary transition-colors py-2">Features</a>
              <button 
                onClick={() => navigate('/pricing')} 
                className="text-foreground hover:text-primary transition-colors py-2 text-left"
              >
                Pricing
              </button>
              <button 
                onClick={() => navigate('/about')} 
                className="text-foreground hover:text-primary transition-colors py-2 text-left"
              >
                About
              </button>
              <a href="#testimonials" className="text-foreground hover:text-primary transition-colors py-2">Testimonials</a>
              <button 
                onClick={() => navigate('/faq')} 
                className="text-foreground hover:text-primary transition-colors py-2 text-left"
              >
                FAQ
              </button>
              <button 
                onClick={() => navigate('/contact')} 
                className="text-foreground hover:text-primary transition-colors py-2 text-left"
              >
                Contact
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;