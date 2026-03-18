import { motion } from "framer-motion";
import { Monitor, Moon, Sun, Terminal, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

export type ThemeType = 'apple' | 'glass' | 'retro' | 'gradient';
export type ColorMode = 'light' | 'dark';

interface ThemeSelectorProps {
  currentTheme: ThemeType;
  onThemeChange: (theme: ThemeType) => void;
  colorMode: ColorMode;
  onColorModeChange: (mode: ColorMode) => void;
}

export function ThemeSelector({ 
  currentTheme, 
  onThemeChange, 
  colorMode, 
  onColorModeChange 
}: ThemeSelectorProps) {
  
  const themes: { id: ThemeType, label: string, icon: React.ReactNode }[] = [
    { id: 'apple', label: 'Apple', icon: <Monitor className="w-4 h-4" /> },
    { id: 'glass', label: 'Glass', icon: <Layers className="w-4 h-4" /> },
    { id: 'gradient', label: 'Gradient', icon: <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-pink-500 to-violet-500" /> },
    { id: 'retro', label: 'Retro', icon: <Terminal className="w-4 h-4" /> },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-[var(--panel-radius)] bg-panel border border-panel-border shadow-[var(--app-shadow)] panel-blur transition-all duration-300">
      
      <div className="flex space-x-1 bg-canvas/50 p-1 rounded-xl">
        {themes.map((theme) => {
          const isActive = currentTheme === theme.id;
          return (
            <button
              key={theme.id}
              onClick={() => onThemeChange(theme.id)}
              className={cn(
                "relative flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors z-10",
                isActive ? "text-ink" : "text-ink-muted hover:text-ink hover:bg-panel-hover"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="theme-active-bg"
                  className="absolute inset-0 bg-panel border border-panel-border rounded-lg shadow-sm"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  style={{ zIndex: -1 }}
                />
              )}
              <span className="relative z-10">{theme.icon}</span>
              <span className="relative z-10 hidden sm:inline-block">{theme.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onColorModeChange('light')}
          disabled={currentTheme === 'retro'}
          className={cn(
            "p-2 rounded-full transition-colors",
            colorMode === 'light' ? "bg-brand/10 text-brand" : "text-ink-muted hover:bg-panel-hover hover:text-ink",
            currentTheme === 'retro' && "opacity-30 cursor-not-allowed"
          )}
          title="Light Mode"
        >
          <Sun className="w-5 h-5" />
        </button>
        <button
          onClick={() => onColorModeChange('dark')}
          disabled={currentTheme === 'retro'}
          className={cn(
            "p-2 rounded-full transition-colors",
            colorMode === 'dark' ? "bg-brand/10 text-brand" : "text-ink-muted hover:bg-panel-hover hover:text-ink",
            currentTheme === 'retro' && "opacity-30 cursor-not-allowed"
          )}
          title="Dark Mode"
        >
          <Moon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
