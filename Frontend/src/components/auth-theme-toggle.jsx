import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/use-theme";

const AuthThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
      onClick={() => setTheme(nextTheme)}
      className="rounded-xl bg-background/80 shadow-sm backdrop-blur"
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
};

export default AuthThemeToggle;
