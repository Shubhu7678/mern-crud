import { useEffect, useState } from "react";
import { ThemeContext } from "@/components/theme-context";

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );
  const [accent, setAccent] = useState(
    localStorage.getItem("accent") || "blue"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("accent-blue", "accent-purple", "accent-green", "accent-orange");
    root.classList.add(`accent-${accent}`);
    localStorage.setItem("accent", accent);
  }, [accent]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, accent, setAccent }}>
      {children}
    </ThemeContext.Provider>
  );
}