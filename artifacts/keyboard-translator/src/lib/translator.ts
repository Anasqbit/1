// EN to AR Mapping
export const EN_TO_AR: Record<string, string> = {
  'q':'ض','w':'ص','e':'ث','r':'ق','t':'ف','y':'غ','u':'ع','i':'ه','o':'خ','p':'ح',
  '[':'ج',']':'د','a':'ش','s':'س','d':'ي','f':'ب','g':'ل','h':'ا','j':'ت','k':'ن',
  'l':'م',';':'ك',"'":'ط','z':'ئ','x':'ء','c':'ؤ','v':'ر','b':'لا','n':'ى','m':'ة',
  ',':'و','.':'ز','/':'ظ','`':'ذ',
  // Uppercase variations mapped to the same output for convenience, 
  // though traditional layout might require shift combinations, 
  // typical basic conversion ignores case for the base letters.
  'Q':'ض','W':'ص','E':'ث','R':'ق','T':'ف','Y':'غ','U':'ع','I':'ه','O':'خ','P':'ح',
  'A':'ش','S':'س','D':'ي','F':'ب','G':'ل','H':'ا','J':'ت','K':'ن','L':'م',
  'Z':'ئ','X':'ء','C':'ؤ','V':'ر','B':'لا','N':'ى','M':'ة',
};

// AR to EN Mapping (Reverse generation)
export const AR_TO_EN: Record<string, string> = {};
for (const [en, ar] of Object.entries(EN_TO_AR)) {
  if (en === en.toLowerCase() && ar !== 'لا') {
    AR_TO_EN[ar] = en;
  }
}
// Manually handle the special case mapping back
AR_TO_EN['لا'] = 'b';

// Helper to determine dominant language
export function detectLanguage(text: string): 'en' | 'ar' {
  if (!text) return 'en';
  
  let arCount = 0;
  let enCount = 0;
  
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    // Basic Arabic Unicode range check (0600–06FF)
    if (charCode >= 0x0600 && charCode <= 0x06FF) {
      arCount++;
    } else if (/[a-zA-Z]/.test(text[i])) {
      enCount++;
    }
  }
  
  return arCount > enCount ? 'ar' : 'en';
}

export function translateText(text: string, fromLang: 'en' | 'ar'): string {
  let result = '';
  
  if (fromLang === 'en') {
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      result += EN_TO_AR[char] !== undefined ? EN_TO_AR[char] : char;
    }
  } else {
    for (let i = 0; i < text.length; i++) {
      // Lookahead for 'لا'
      if (text[i] === 'ل' && text[i+1] === 'ا') {
        result += 'b';
        i++; // Skip the next character ('ا')
      } else {
        const char = text[i];
        result += AR_TO_EN[char] !== undefined ? AR_TO_EN[char] : char;
      }
    }
  }
  
  return result;
}

export function getActiveCharacters(text: string): Set<string> {
  const active = new Set<string>();
  for (let i = 0; i < text.length; i++) {
    active.add(text[i].toLowerCase());
  }
  return active;
}
