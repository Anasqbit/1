import { motion } from "framer-motion";
import { KEYBOARD_ROWS, KeyDef } from "@/lib/keyboard-layout";
import { cn } from "@/lib/utils";

interface KeyboardProps {
  activeChars: Set<string>;
  theme: string;
}

export function Keyboard({ activeChars, theme }: KeyboardProps) {
  const isKeyActive = (key: KeyDef) => {
    if (key.type === 'action') return false;
    if (key.type === 'modifier') return false;

    // Space key: highlight when space is in input
    if (key.id === 'space') {
      return activeChars.has(' ');
    }

    if (key.type !== 'char') return false;

    const enMatch = key.en ? activeChars.has(key.en.toLowerCase()) : false;
    const arMatch = key.ar ? activeChars.has(key.ar) : false;
    // Special: 'لا' maps to B; highlight if both ل and ا are active OR 'لا' is active
    const laMatch = key.ar === 'لا' && (activeChars.has('لا') || (activeChars.has('ل') && activeChars.has('ا')));

    return enMatch || arMatch || laMatch;
  };

  // Per-key pastel colors for gradient theme
  const getPastelColor = (key: KeyDef, dark: boolean) => {
    if (!key.en) return undefined;
    const hue = (key.en.charCodeAt(0) * 17) % 360;
    return dark
      ? `hsl(${hue} 40% 18%)`
      : `hsl(${hue} 60% 92%)`;
  };

  const isGradient = theme === 'gradient';

  return (
    <div className="w-full overflow-x-auto pb-2" style={{ WebkitOverflowScrolling: 'touch' }}>
      <div className="min-w-[680px] flex flex-col gap-1.5 p-3 bg-panel border border-panel-border rounded-[var(--panel-radius)] shadow-[var(--app-shadow)] panel-blur transition-all duration-300">
        {KEYBOARD_ROWS.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex gap-1.5 w-full">
            {row.map((key) => {
              const active = isKeyActive(key);
              const isSpaceKey = key.id === 'space';
              const isActionOrModifier = key.type === 'action' || key.type === 'modifier';
              // For gradient theme, char keys get unique pastel tints
              const showPastel = isGradient && !active && key.type === 'char' && !isSpaceKey;

              return (
                <motion.div
                  key={key.id}
                  className={cn(
                    "relative flex flex-col justify-between p-1.5 min-w-[2.2rem] h-12 border rounded-[var(--key-radius)] transition-all duration-150 select-none overflow-hidden",
                    key.width ?? "flex-1",
                    active
                      ? "bg-key-active border-brand text-key-active-ink z-10 retro-box-shadow"
                      : "bg-key-bg border-key-border text-key-ink shadow-[var(--key-shadow)] hover:brightness-110 hover:-translate-y-px"
                  )}
                  animate={{ y: active ? 2 : 0, scale: active ? 0.97 : 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  style={
                    showPastel
                      ? { backgroundColor: `var(--pastel-tint-${key.id})` }
                      : undefined
                  }
                >
                  {/* Pastel tint via CSS var for gradient dark mode */}
                  {showPastel && (
                    <style>{`
                      :root { --pastel-tint-${key.id}: ${getPastelColor(key, false)}; }
                      .dark { --pastel-tint-${key.id}: ${getPastelColor(key, true)} !important; }
                    `}</style>
                  )}

                  {isActionOrModifier ? (
                    /* Action / Modifier keys — show label, full opacity */
                    <div className="w-full h-full flex items-center justify-center text-[10px] font-semibold opacity-75 tracking-tight text-center leading-tight px-0.5">
                      {key.label}
                    </div>
                  ) : isSpaceKey ? (
                    /* Space key — show "Space" label and highlight when space pressed */
                    <div className={cn(
                      "w-full h-full flex items-center justify-center text-[10px] font-semibold tracking-tight",
                      active ? "opacity-100" : "opacity-75"
                    )}>
                      Space
                    </div>
                  ) : (
                    /* Regular char key — English on top, Arabic on bottom */
                    <>
                      <div className={cn(
                        "text-[10px] font-semibold leading-none",
                        active ? "opacity-100" : "opacity-90"
                      )}>
                        {key.en}
                      </div>
                      {key.ar && (
                        <div className={cn(
                          "text-xs font-bold text-right leading-none",
                          active ? "opacity-100" : "opacity-70"
                        )}>
                          {key.ar}
                        </div>
                      )}
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
