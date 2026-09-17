import { Moon, Palette, Sun } from "lucide-react";
import { useTheme } from "@/components/use-theme";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";

const accents = [
  { name: "Ocean", value: "blue", className: "bg-sky-500" },
  { name: "Violet", value: "purple", className: "bg-violet-500" },
  { name: "Forest", value: "green", className: "bg-emerald-500" },
  { name: "Sunset", value: "orange", className: "bg-orange-500" },
];

const modes = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
];

const SidebarSettings = () => {
  const { theme, setTheme, accent, setAccent } = useTheme();

  return (
    <SidebarGroup className="mt-auto border-t border-sidebar-border pt-4">
      <SidebarGroupLabel className="gap-2 text-[11px] uppercase tracking-[0.14em]">
        <Palette className="size-3.5" aria-hidden="true" />
        Settings
      </SidebarGroupLabel>
      <SidebarGroupContent className="space-y-3 px-2">
        <div className="flex rounded-xl bg-sidebar-accent/70 p-1">
          {modes.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => setTheme(value)}
              aria-pressed={theme === value}
              className={`flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium transition-colors ${
                theme === value
                  ? "bg-sidebar text-sidebar-foreground shadow-sm"
                  : "text-sidebar-foreground/60 hover:text-sidebar-foreground"
              }`}
            >
              <Icon className="size-3.5" aria-hidden="true" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        <div>
          <p className="mb-2 text-[11px] font-medium text-sidebar-foreground/60">Accent color</p>
          <div className="flex items-center gap-2">
            {accents.map(({ name, value, className }) => (
              <button
                key={value}
                type="button"
                title={name}
                aria-label={`Use ${name} accent`}
                aria-pressed={accent === value}
                onClick={() => setAccent(value)}
                className={`size-6 rounded-full ${className} transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar ${
                  accent === value ? "ring-2 ring-sidebar ring-offset-2 ring-offset-sidebar" : ""
                }`}
              />
            ))}
          </div>
        </div>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default SidebarSettings;
