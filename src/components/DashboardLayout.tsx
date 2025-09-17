import { ReactNode } from "react";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Tractor, 
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}

interface DashboardLayoutProps {
  title: string;
  user: User;
  children: ReactNode;
  sidebarItems: SidebarItem[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  onSignOut: () => void;
}

const DashboardLayout = ({
  title,
  user,
  children,
  sidebarItems,
  activeTab,
  onTabChange,
  onSignOut
}: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div className={`
        fixed lg:relative inset-y-0 left-0 z-40 w-64 bg-card border-r transform transition-transform
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Tractor className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-bold text-lg">FarmGuard</h2>
                <p className="text-sm text-muted-foreground">Biosecurity Portal</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 p-4">
            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => {
                      onTabChange(item.id);
                      setSidebarOpen(false);
                    }}
                  >
                    <Icon className="h-4 w-4 mr-3" />
                    {item.label}
                  </Button>
                );
              })}
            </nav>
          </div>

          {/* User info and sign out */}
          <div className="p-4 border-t">
            <div className="mb-4">
              <p className="text-sm font-medium">{user.email}</p>
              <p className="text-xs text-muted-foreground">
                {user.user_metadata?.first_name} {user.user_metadata?.last_name}
              </p>
            </div>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={onSignOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-background border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold ml-12 lg:ml-0">{title}</h1>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;