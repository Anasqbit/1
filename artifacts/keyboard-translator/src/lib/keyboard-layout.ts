export type KeyType = 'char' | 'action' | 'modifier';

export interface KeyDef {
  id: string;
  en?: string;
  ar?: string;
  label?: string;
  type: KeyType;
  width?: string;
}

export const KEYBOARD_ROWS: KeyDef[][] = [
  // Row 1
  [
    { id: 'esc', label: 'Esc', type: 'action' },
    { id: 'f1', label: 'F1', type: 'action' },
    { id: 'f2', label: 'F2', type: 'action' },
    { id: 'f3', label: 'F3', type: 'action' },
    { id: 'f4', label: 'F4', type: 'action' },
    { id: 'f5', label: 'F5', type: 'action' },
    { id: 'f6', label: 'F6', type: 'action' },
    { id: 'f7', label: 'F7', type: 'action' },
    { id: 'f8', label: 'F8', type: 'action' },
    { id: 'f9', label: 'F9', type: 'action' },
    { id: 'f10', label: 'F10', type: 'action' },
    { id: 'f11', label: 'F11', type: 'action' },
    { id: 'f12', label: 'F12', type: 'action' },
    { id: 'prtsc', label: 'PrtSc', type: 'action' },
    { id: 'scrlk', label: 'ScrLk', type: 'action' },
    { id: 'pause', label: 'Pause', type: 'action' },
  ],
  // Row 2
  [
    { id: 'backtick', en: '`', ar: 'ذ', type: 'char' },
    { id: '1', en: '1', ar: '١', type: 'char' },
    { id: '2', en: '2', ar: '٢', type: 'char' },
    { id: '3', en: '3', ar: '٣', type: 'char' },
    { id: '4', en: '4', ar: '٤', type: 'char' },
    { id: '5', en: '5', ar: '٥', type: 'char' },
    { id: '6', en: '6', ar: '٦', type: 'char' },
    { id: '7', en: '7', ar: '٧', type: 'char' },
    { id: '8', en: '8', ar: '٨', type: 'char' },
    { id: '9', en: '9', ar: '٩', type: 'char' },
    { id: '0', en: '0', ar: '٠', type: 'char' },
    { id: 'minus', en: '-', type: 'char' },
    { id: 'equals', en: '=', type: 'char' },
    { id: 'backspace', label: 'Backspace', type: 'action', width: 'flex-[1.5]' },
  ],
  // Row 3
  [
    { id: 'tab', label: 'Tab', type: 'action', width: 'flex-[1.5]' },
    { id: 'q', en: 'Q', ar: 'ض', type: 'char' },
    { id: 'w', en: 'W', ar: 'ص', type: 'char' },
    { id: 'e', en: 'E', ar: 'ث', type: 'char' },
    { id: 'r', en: 'R', ar: 'ق', type: 'char' },
    { id: 't', en: 'T', ar: 'ف', type: 'char' },
    { id: 'y', en: 'Y', ar: 'غ', type: 'char' },
    { id: 'u', en: 'U', ar: 'ع', type: 'char' },
    { id: 'i', en: 'I', ar: 'ه', type: 'char' },
    { id: 'o', en: 'O', ar: 'خ', type: 'char' },
    { id: 'p', en: 'P', ar: 'ح', type: 'char' },
    { id: 'bracket_left', en: '[', ar: 'ج', type: 'char' },
    { id: 'bracket_right', en: ']', ar: 'د', type: 'char' },
    { id: 'backslash', en: '\\', type: 'char', width: 'flex-[1.2]' },
  ],
  // Row 4
  [
    { id: 'caps', label: 'CapsLk', type: 'action', width: 'flex-[1.8]' },
    { id: 'a', en: 'A', ar: 'ش', type: 'char' },
    { id: 's', en: 'S', ar: 'س', type: 'char' },
    { id: 'd', en: 'D', ar: 'ي', type: 'char' },
    { id: 'f', en: 'F', ar: 'ب', type: 'char' },
    { id: 'g', en: 'G', ar: 'ل', type: 'char' },
    { id: 'h', en: 'H', ar: 'ا', type: 'char' },
    { id: 'j', en: 'J', ar: 'ت', type: 'char' },
    { id: 'k', en: 'K', ar: 'ن', type: 'char' },
    { id: 'l', en: 'L', ar: 'م', type: 'char' },
    { id: 'semicolon', en: ';', ar: 'ك', type: 'char' },
    { id: 'quote', en: "'", ar: 'ط', type: 'char' },
    { id: 'enter', label: 'Enter', type: 'action', width: 'flex-[2.2]' },
  ],
  // Row 5
  [
    { id: 'shift_left', label: 'Shift', type: 'modifier', width: 'flex-[2.4]' },
    { id: 'z', en: 'Z', ar: 'ئ', type: 'char' },
    { id: 'x', en: 'X', ar: 'ء', type: 'char' },
    { id: 'c', en: 'C', ar: 'ؤ', type: 'char' },
    { id: 'v', en: 'V', ar: 'ر', type: 'char' },
    { id: 'b', en: 'B', ar: 'لا', type: 'char' },
    { id: 'n', en: 'N', ar: 'ى', type: 'char' },
    { id: 'm', en: 'M', ar: 'ة', type: 'char' },
    { id: 'comma', en: ',', ar: 'و', type: 'char' },
    { id: 'period', en: '.', ar: 'ز', type: 'char' },
    { id: 'slash', en: '/', ar: 'ظ', type: 'char' },
    { id: 'shift_right', label: 'Shift', type: 'modifier', width: 'flex-[2.4]' },
  ],
  // Row 6
  [
    { id: 'ctrl_left', label: 'Ctrl', type: 'modifier', width: 'flex-[1.5]' },
    { id: 'win_left', label: 'Win', type: 'modifier', width: 'flex-[1.2]' },
    { id: 'alt_left', label: 'Alt', type: 'modifier', width: 'flex-[1.2]' },
    { id: 'space', label: 'Space', type: 'char', width: 'flex-[6]' },
    { id: 'alt_right', label: 'Alt', type: 'modifier', width: 'flex-[1.2]' },
    { id: 'win_right', label: 'Win', type: 'modifier', width: 'flex-[1.2]' },
    { id: 'menu', label: 'Menu', type: 'modifier', width: 'flex-[1.2]' },
    { id: 'ctrl_right', label: 'Ctrl', type: 'modifier', width: 'flex-[1.5]' },
  ]
];
