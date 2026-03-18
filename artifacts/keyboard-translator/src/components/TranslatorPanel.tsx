import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRightLeft, Copy, Trash2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { detectLanguage, translateText, getActiveCharacters } from "@/lib/translator";

interface TranslatorPanelProps {
  onActiveCharsChange: (chars: Set<string>) => void;
  theme: string;
}

export function TranslatorPanel({ onActiveCharsChange, theme }: TranslatorPanelProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [sourceLang, setSourceLang] = useState<'en' | 'ar'>('en');
  const [copyState, setCopyState] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const detected = detectLanguage(input);
    setSourceLang(detected);
    const translated = translateText(input, detected);
    setOutput(translated);
    onActiveCharsChange(getActiveCharacters(input));
  }, [input, onActiveCharsChange]);

  const handleSwap = () => {
    setInput(output);
  };

  const handleCopy = useCallback(async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopyState('success');
    } catch {
      setCopyState('error');
    }
    setTimeout(() => setCopyState('idle'), 2500);
  }, [output]);

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  // Theme-aware notification colors
  const notificationStyle = (() => {
    if (theme === 'retro') return "bg-[#00ff41] text-black border border-[#00ff41] font-mono";
    if (theme === 'glass') return "bg-purple-600/90 backdrop-blur text-white border border-purple-400/50 shadow-[0_0_20px_rgba(192,132,252,0.4)]";
    if (theme === 'gradient') return "bg-pink-500 text-white shadow-lg";
    return "bg-[#0071e3] text-white shadow-md"; // apple
  })();

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Two panels + swap button */}
      <div className="flex flex-col lg:flex-row gap-3 w-full">

        {/* INPUT PANEL */}
        <div className="flex-1 flex flex-col gap-2 p-4 bg-panel border border-panel-border rounded-[var(--panel-radius)] shadow-[var(--app-shadow)] panel-blur transition-all duration-300 min-h-[200px]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-brand tracking-wider uppercase glow-text">
              {sourceLang === 'en' ? 'English Input' : 'Arabic Input'}
            </span>
            <button
              onClick={handleClear}
              className="p-1.5 text-ink-muted hover:text-red-500 hover:bg-red-500/10 rounded-md transition-colors"
              title="Clear"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Start typing…"
            dir={sourceLang === 'ar' ? 'rtl' : 'ltr'}
            className={cn(
              "flex-1 w-full min-h-[140px] resize-none bg-transparent border-none outline-none focus:ring-0 text-base md:text-lg",
              "text-ink placeholder:text-ink-muted/40",
              sourceLang === 'ar' ? 'font-sans' : 'font-mono'
            )}
          />
        </div>

        {/* SWAP BUTTON — horizontal on mobile, vertical on desktop */}
        <div className="flex lg:flex-col items-center justify-center">
          <button
            onClick={handleSwap}
            title="Swap"
            className="p-3 bg-panel border border-panel-border text-ink hover:text-brand hover:border-brand rounded-full shadow-md transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <ArrowRightLeft className="w-5 h-5" />
          </button>
        </div>

        {/* OUTPUT PANEL */}
        <div className="flex-1 flex flex-col gap-2 p-4 bg-panel border border-panel-border rounded-[var(--panel-radius)] shadow-[var(--app-shadow)] panel-blur transition-all duration-300 min-h-[200px] relative overflow-hidden">

          {/* Decorative glow for glass theme */}
          <div className="absolute -top-8 -right-8 w-28 h-28 bg-brand/20 blur-3xl rounded-full pointer-events-none" />

          <div className="flex items-center justify-between relative z-10">
            <span className="text-xs font-semibold text-brand tracking-wider uppercase glow-text">
              {sourceLang === 'en' ? 'Arabic Output' : 'English Output'}
            </span>

            {/* COPY BUTTON */}
            <button
              onClick={handleCopy}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200",
                copyState === 'success'
                  ? "bg-green-500 text-white scale-95"
                  : copyState === 'error'
                    ? "bg-red-500 text-white"
                    : "bg-brand text-brand-foreground hover:opacity-90 active:scale-95"
              )}
            >
              {copyState === 'success'
                ? <><Check className="w-3.5 h-3.5" /> Copied!</>
                : copyState === 'error'
                  ? "Failed"
                  : <><Copy className="w-3.5 h-3.5" /> Copy</>}
            </button>
          </div>

          <textarea
            value={output}
            readOnly
            dir={sourceLang === 'en' ? 'rtl' : 'ltr'}
            placeholder="Translation will appear here…"
            className={cn(
              "flex-1 w-full min-h-[140px] resize-none bg-transparent border-none outline-none focus:ring-0 text-base md:text-lg relative z-10",
              "text-ink placeholder:text-ink-muted/40",
              sourceLang === 'en' ? 'font-sans' : 'font-mono'
            )}
          />
        </div>
      </div>

      {/* COPY NOTIFICATION — floating, fully opaque, theme-aware */}
      <AnimatePresence>
        {copyState !== 'idle' && (
          <motion.div
            key="copy-notification"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={cn(
              "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 pointer-events-none",
              notificationStyle
            )}
          >
            {copyState === 'success'
              ? <><Check className="w-4 h-4" /> Copied to clipboard!</>
              : "⚠ Copy failed — please copy manually"}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
