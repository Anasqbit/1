import { useState, useEffect } from "react";
import { ThemeSelector, ThemeType, ColorMode } from "@/components/ThemeSelector";
import { TranslatorPanel } from "@/components/TranslatorPanel";
import { Keyboard } from "@/components/Keyboard";
import { cn } from "@/lib/utils";

export default function Home() {
  const [theme, setTheme] = useState<ThemeType>('glass');
  const [colorMode, setColorMode] = useState<ColorMode>('dark');
  const [activeChars, setActiveChars] = useState<Set<string>>(new Set());

  // Apply classes to document.documentElement based on theme and color mode
  useEffect(() => {
    const root = document.documentElement;
    
    // Clear old theme classes
    root.classList.remove('theme-apple', 'theme-glass', 'theme-retro', 'theme-gradient', 'dark', 'light');
    
    // Add current theme class
    root.classList.add(`theme-${theme}`);
    
    // Add dark/light class
    if (theme === 'retro') {
      root.classList.add('dark'); // Retro is always dark
    } else {
      root.classList.add(colorMode);
    }
  }, [theme, colorMode]);

  return (
    <div className={cn(
      "min-h-screen w-full relative flex flex-col",
      theme === 'glass' && colorMode === 'dark' && "bg-gradient-cyberpunk",
      theme === 'gradient' && "bg-gradient-modern"
    )}>
      
      {/* Background Images for specific themes */}
      {theme === 'glass' && colorMode === 'dark' && (
        <div className="fixed inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
          <img 
            src={`${import.meta.env.BASE_URL}images/cyberpunk-bg.png`} 
            alt="Cyberpunk background" 
            className="w-full h-full object-cover blur-sm"
          />
        </div>
      )}
      
      {theme === 'gradient' && (
        <div className="fixed inset-0 z-0 opacity-30 mix-blend-multiply pointer-events-none">
           <img 
            src={`${import.meta.env.BASE_URL}images/gradient-bg.png`} 
            alt="Gradient background" 
            className="w-full h-full object-cover blur-xl"
          />
        </div>
      )}

      {/* Retro scanlines effect */}
      {theme === 'retro' && <div className="scanlines" />}

      {/* Main Content */}
      <main className="flex-1 relative z-10 flex flex-col max-w-6xl mx-auto w-full px-4 py-8 md:py-12 gap-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-ink tracking-tight glow-text retro-text-shadow">
              Arab<span className="text-brand">Eng</span>
            </h1>
            <p className="text-ink-muted mt-1 font-medium">Keyboard Layout Translator</p>
          </div>

          <ThemeSelector 
            currentTheme={theme} 
            onThemeChange={setTheme}
            colorMode={colorMode}
            onColorModeChange={setColorMode}
          />
        </header>

        {/* Translator Area */}
        <section className="w-full mt-4">
          <TranslatorPanel onActiveCharsChange={setActiveChars} />
        </section>

        {/* Keyboard Area */}
        <section className="w-full mt-8 flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-ink-muted uppercase tracking-widest pl-2">Layout Reference</h2>
          <Keyboard activeChars={activeChars} theme={theme} />
        </section>

      </main>
    </div>
  );
}
