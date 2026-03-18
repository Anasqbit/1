import { useState, useEffect } from "react";
import { ArrowRightLeft, Copy, Trash2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { detectLanguage, translateText, getActiveCharacters } from "@/lib/translator";
import { useToast } from "@/hooks/use-toast";

interface TranslatorPanelProps {
  onActiveCharsChange: (chars: Set<string>) => void;
}

export function TranslatorPanel({ onActiveCharsChange }: TranslatorPanelProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [sourceLang, setSourceLang] = useState<'en'|'ar'>('en');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // 1. Detect language
    const detected = detectLanguage(input);
    setSourceLang(detected);

    // 2. Translate
    const translated = translateText(input, detected);
    setOutput(translated);

    // 3. Update active characters for keyboard highlight
    // If input is English, highlight english keys. If Arabic, highlight those keys.
    onActiveCharsChange(getActiveCharacters(input));
  }, [input, onActiveCharsChange]);

  const handleSwap = () => {
    setInput(output);
  };

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "The translated text has been copied.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the text manually.",
        variant: "destructive",
      });
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 w-full">
      
      {/* INPUT PANEL */}
      <div className="flex-1 flex flex-col gap-2 p-4 bg-panel border border-panel-border rounded-[var(--panel-radius)] shadow-[var(--app-shadow)] panel-blur transition-all duration-300">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-brand tracking-wider uppercase glow-text">
            {sourceLang === 'en' ? 'ENGLISH (LATIN)' : 'ARABIC'} INPUT
          </span>
          <button
            onClick={handleClear}
            className="p-1.5 text-ink-muted hover:text-danger hover:bg-danger/10 rounded-md transition-colors"
            title="Clear"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Start typing..."
          dir={sourceLang === 'ar' ? 'rtl' : 'ltr'}
          className={cn(
            "w-full h-40 lg:h-64 resize-none bg-transparent border-none outline-none focus:ring-0 text-lg md:text-xl",
            "text-ink placeholder:text-ink-muted/50",
            sourceLang === 'ar' ? 'font-sans' : 'font-mono'
          )}
        />
      </div>

      {/* CONTROLS (Center on desktop, middle on mobile) */}
      <div className="flex lg:flex-col items-center justify-center gap-2 py-2">
        <button
          onClick={handleSwap}
          className="p-3 bg-panel border border-panel-border text-ink hover:text-brand hover:border-brand rounded-full shadow-md transition-all hover:scale-110 active:scale-95 z-10"
          title="Swap Input & Output"
        >
          <ArrowRightLeft className="w-5 h-5" />
        </button>
      </div>

      {/* OUTPUT PANEL */}
      <div className="flex-1 flex flex-col gap-2 p-4 bg-panel border border-panel-border rounded-[var(--panel-radius)] shadow-[var(--app-shadow)] panel-blur transition-all duration-300 relative overflow-hidden">
        
        {/* Decorative corner glow for glass theme */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand/20 blur-3xl rounded-full pointer-events-none" />

        <div className="flex items-center justify-between mb-2 relative z-10">
          <span className="text-sm font-semibold text-success tracking-wider uppercase glow-text">
            {sourceLang === 'en' ? 'ARABIC' : 'ENGLISH (LATIN)'} OUTPUT
          </span>
          <button
            onClick={handleCopy}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors text-sm font-medium",
              copied 
                ? "bg-success/20 text-success" 
                : "bg-brand/10 text-brand hover:bg-brand/20"
            )}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        
        <textarea
          value={output}
          readOnly
          dir={sourceLang === 'en' ? 'rtl' : 'ltr'}
          placeholder="Translation will appear here..."
          className={cn(
            "w-full h-40 lg:h-64 resize-none bg-transparent border-none outline-none focus:ring-0 text-lg md:text-xl relative z-10",
            "text-ink placeholder:text-ink-muted/50",
            sourceLang === 'en' ? 'font-sans' : 'font-mono'
          )}
        />
      </div>

    </div>
  );
}
