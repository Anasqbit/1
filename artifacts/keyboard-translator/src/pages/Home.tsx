import { useState, useEffect } from "react";
import { ThemeSelector, ThemeType, ColorMode } from "@/components/ThemeSelector";
import { TranslatorPanel } from "@/components/TranslatorPanel";
import { Keyboard } from "@/components/Keyboard";
import { cn } from "@/lib/utils";

export default function Home() {
  const [theme, setTheme] = useState<ThemeType>('glass');
  const [colorMode, setColorMode] = useState<ColorMode>('dark');
  const [activeChars, setActiveChars] = useState<Set<string>>(new Set());

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-apple', 'theme-glass', 'theme-retro', 'theme-gradient', 'dark', 'light');
    root.classList.add(`theme-${theme}`);
    root.classList.add(theme === 'retro' ? 'dark' : colorMode);
  }, [theme, colorMode]);

  return (
    <div className={cn(
      "min-h-screen w-full relative flex flex-col",
      theme === 'glass' && colorMode === 'dark' && "bg-gradient-cyberpunk",
      theme === 'gradient' && "bg-gradient-modern"
    )}>

      {/* Background Images */}
      {theme === 'glass' && colorMode === 'dark' && (
        <div className="fixed inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
          <img
            src={`${import.meta.env.BASE_URL}images/cyberpunk-bg.png`}
            alt=""
            className="w-full h-full object-cover blur-sm"
          />
        </div>
      )}
      {theme === 'gradient' && (
        <div className="fixed inset-0 z-0 opacity-25 mix-blend-multiply pointer-events-none">
          <img
            src={`${import.meta.env.BASE_URL}images/gradient-bg.png`}
            alt=""
            className="w-full h-full object-cover blur-xl"
          />
        </div>
      )}

      {/* Retro scanlines */}
      {theme === 'retro' && <div className="scanlines" />}

      {/* Main Content */}
      <main className="flex-1 relative z-10 flex flex-col max-w-6xl mx-auto w-full px-3 sm:px-4 md:px-6 py-6 md:py-10 gap-6 md:gap-8">

        {/* Header — stacked on mobile, side-by-side on md+ */}
        <header className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-ink tracking-tight glow-text retro-text-shadow">
                Arab<span className="text-brand">Eng</span>
              </h1>
              <p className="text-xs sm:text-sm text-ink-muted mt-0.5 font-medium">
                Keyboard Layout Translator
              </p>
            </div>
            <ThemeSelector
              currentTheme={theme}
              onThemeChange={setTheme}
              colorMode={colorMode}
              onColorModeChange={setColorMode}
            />
          </div>
        </header>

        {/* Translator */}
        <section className="w-full">
          <TranslatorPanel onActiveCharsChange={setActiveChars} theme={theme} />
        </section>

        {/* Keyboard */}
        <section className="w-full flex flex-col gap-2">
          <h2 className="text-xs font-semibold text-ink-muted uppercase tracking-widest pl-1">
            Layout Reference
          </h2>
          <Keyboard activeChars={activeChars} theme={theme} />
        </section>

      </main>
    </div>
  );
}
