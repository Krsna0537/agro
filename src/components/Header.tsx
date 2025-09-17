import { Button } from "@/components/ui/button";
import { Shield, Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
              <h1 className="text-xl font-bold text-foreground">FarmGuard</h1>
              <p className="text-xs text-muted-foreground">Biosecurity Management</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-foreground hover:text-primary transition-colors">Features</a>
            <a href="#roles" className="text-foreground hover:text-primary transition-colors">User Roles</a>
            <a href="#training" className="text-foreground hover:text-primary transition-colors">Training</a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-4">
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
              <a href="#roles" className="text-foreground hover:text-primary transition-colors py-2">User Roles</a>
              <a href="#training" className="text-foreground hover:text-primary transition-colors py-2">Training</a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors py-2">Contact</a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;