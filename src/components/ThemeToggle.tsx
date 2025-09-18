import { Button } from "@/components/ui/button";
import { Moon, Sun, Laptop } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

const ThemeToggle = () => {
  const { theme, setTheme, isDark } = useTheme();

  const cycle = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  const icon = theme === "system" ? <Laptop className="h-4 w-4" /> : isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />;

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={() => setTheme("light")} aria-label="Light mode">
        <Sun className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="sm" onClick={() => setTheme("dark")} aria-label="Dark mode">
        <Moon className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="sm" onClick={() => setTheme("system")} aria-label="System theme">
        <Laptop className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ThemeToggle;


