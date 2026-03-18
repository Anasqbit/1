import { motion } from "framer-motion";
import { KEYBOARD_ROWS, KeyDef } from "@/lib/keyboard-layout";
import { cn } from "@/lib/utils";

interface KeyboardProps {
  activeChars: Set<string>;
  theme: string;
}

export function Keyboard({ activeChars, theme }: KeyboardProps) {
  
  // Helper to check if a key should be highlighted
  const isKeyActive = (key: KeyDef) => {
    if (key.type !== 'char') return false;
    
    const enMatch = key.en && activeChars.has(key.en.toLowerCase());
    const arMatch = key.ar && activeChars.has(key.ar);
    
    // Special handling for 'لا'
    const specialArMatch = key.ar === 'لا' && activeChars.has('ل') && activeChars.has('ا');
    
    return enMatch || arMatch || specialArMatch;
  };

  return (
    <div className="w-full overflow-x-auto pb-4 hide-scrollbar">
      <div className="min-w-[800px] flex flex-col gap-1.5 p-4 bg-panel border border-panel-border rounded-[var(--panel-radius)] shadow-[var(--app-shadow)] panel-blur transition-all duration-300">
        
        {KEYBOARD_ROWS.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex gap-1.5 w-full">
            {row.map((key) => {
              const active = isKeyActive(key);
              
              // Gradient theme gets random pastel tints for inactive keys
              const isGradient = theme === 'gradient';
              const randPastel = isGradient && !active && key.type === 'char' 
                ? `hsl(${((key.en?.charCodeAt(0) || 0) * 17) % 360} 70% 90%)` 
                : undefined;
              const darkRandPastel = isGradient && !active && key.type === 'char' 
                ? `hsl(${((key.en?.charCodeAt(0) || 0) * 17) % 360} 40% 20%)` 
                : undefined;

              return (
                <motion.div
                  key={key.id}
                  className={cn(
                    "relative flex flex-col justify-between p-2 min-w-[2.5rem] h-14 border rounded-[var(--key-radius)] transition-all duration-150 select-none",
                    key.width || "flex-1",
                    active 
                      ? "bg-key-active border-brand text-key-active-ink shadow-inner z-10 scale-[0.98]" 
                      : "bg-key-bg border-key-border text-key-ink shadow-[var(--key-shadow)] hover:bg-panel-hover hover:-translate-y-0.5",
                    "retro-box-shadow" // Only applies if retro theme active due to CSS nesting
                  )}
                  style={
                    isGradient && !active && key.type === 'char' 
                      ? { backgroundColor: `var(--pastel-tint, ${randPastel})` } 
                      : {}
                  }
                  animate={{
                    y: active ? 2 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  {/* CSS Var hack for gradient dark mode pastel tinting */}
                  {isGradient && !active && key.type === 'char' && (
                    <style>{`
                      .dark [data-key-id="${key.id}"] { --pastel-tint: ${darkRandPastel} !important; }
                    `}</style>
                  )}
                  
                  <div data-key-id={key.id} className="absolute inset-0 pointer-events-none" />

                  {key.type === 'action' || key.type === 'modifier' ? (
                    <div className="w-full h-full flex items-center justify-center text-xs font-medium opacity-60">
                      {key.label}
                    </div>
                  ) : (
                    <>
                      <div className={cn(
                        "text-xs font-semibold leading-none",
                        active ? "opacity-100" : "opacity-80"
                      )}>
                        {key.en}
                      </div>
                      <div className={cn(
                        "text-sm font-bold text-right leading-none",
                        active ? "opacity-100" : "opacity-60"
                      )}>
                        {key.ar}
                      </div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
