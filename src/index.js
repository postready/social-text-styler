// --- Unicode Map Tables ---

const UPPER_A = 65;
const UPPER_Z = 90;
const LOWER_A = 97;
const LOWER_Z = 122;
const DIGIT_0 = 48;
const DIGIT_9 = 57;

const SCRIPT_MAP = {
  A: '𝒜', B: 'ℬ', C: '𝒞', D: '𝒟', E: 'ℰ', F: 'ℱ', G: '𝒢', H: 'ℋ', I: 'ℐ', J: '𝒥',
  K: '𝒦', L: 'ℒ', M: 'ℳ', N: '𝒩', O: '𝒪', P: '𝒫', Q: '𝒬', R: 'ℛ', S: '𝒮', T: '𝒯',
  U: '𝒰', V: '𝒱', W: '𝒲', X: '𝒳', Y: '𝒴', Z: '𝒵',
  a: '𝒶', b: '𝒷', c: '𝒸', d: '𝒹', e: 'ℯ', f: '𝒻', g: 'ℊ', h: '𝒽', i: '𝒾', j: '𝒿',
  k: '𝓀', l: '𝓁', m: '𝓂', n: '𝓃', o: 'ℴ', p: '𝓅', q: '𝓆', r: '𝓇', s: '𝓈', t: '𝓉',
  u: '𝓊', v: '𝓋', w: '𝓌', x: '𝓍', y: '𝓎', z: '𝓏'
};

const FRAKTUR_MAP = {
  A: '𝔄', B: '𝔅', C: 'ℭ', D: '𝔇', E: '𝔈', F: '𝔉', G: '𝔊', H: 'ℌ', I: 'ℑ', J: '𝔍',
  K: '𝔎', L: '𝔏', M: '𝔐', N: '𝔑', O: '𝔒', P: '𝔓', Q: '𝔔', R: 'ℜ', S: '𝔖', T: '𝔗',
  U: '𝔘', V: '𝔙', W: '𝔚', X: '𝔛', Y: '𝔜', Z: 'ℨ',
  a: '𝔞', b: '𝔟', c: '𝔠', d: '𝔡', e: '𝔢', f: '𝔣', g: '𝔤', h: '𝔥', i: '𝔦', j: '𝔧',
  k: '𝔨', l: '𝔩', m: '𝔪', n: '𝔫', o: '𝔬', p: '𝔭', q: '𝔮', r: '𝔯', s: '𝔰', t: '𝔱',
  u: '𝔲', v: '𝔳', w: '𝔴', x: '𝔵', y: '𝔶', z: '𝔷'
};

// --- Character Converters ---

function mapRange(char, upperBase, lowerBase, digitBase) {
  const code = char.charCodeAt(0);

  if (code >= UPPER_A && code <= UPPER_Z && upperBase !== null) {
    return String.fromCodePoint(upperBase + (code - UPPER_A));
  }
  if (code >= LOWER_A && code <= LOWER_Z && lowerBase !== null) {
    return String.fromCodePoint(lowerBase + (code - LOWER_A));
  }
  if (code >= DIGIT_0 && code <= DIGIT_9 && digitBase !== null) {
    return String.fromCodePoint(digitBase + (code - DIGIT_0));
  }
  return char;
}

export const STYLES = {
  bold: (char) => mapRange(char, 0x1D5D4, 0x1D5EE, 0x1D7EC),
  serifBold: (char) => mapRange(char, 0x1D400, 0x1D41A, 0x1D7CE),
  italic: (char) => mapRange(char, 0x1D608, 0x1D622, null),
  serifItalic: (char) => {
    if (char === 'h') return 'ℎ';
    return mapRange(char, 0x1D434, 0x1D44E, null);
  },
  boldItalic: (char) => mapRange(char, 0x1D63C, 0x1D656, null),
  monospace: (char) => mapRange(char, 0x1D670, 0x1D68A, 0x1D7F6),
  bubble: (char) => {
    const code = char.charCodeAt(0);
    if (code >= UPPER_A && code <= UPPER_Z) return String.fromCodePoint(0x24B6 + (code - UPPER_A));
    if (code >= LOWER_A && code <= LOWER_Z) return String.fromCodePoint(0x24D0 + (code - LOWER_A));
    if (code === DIGIT_0) return '⓪';
    if (code >= 49 && code <= DIGIT_9) return String.fromCodePoint(0x2460 + (code - 49));
    return char;
  },
  script: (char) => SCRIPT_MAP[char] || char,
  fraktur: (char) => FRAKTUR_MAP[char] || char,
  strikethrough: (char) => (char === ' ' || char === '\n' ? char : `${char}\u0336`),
  underline: (char) => (char === ' ' || char === '\n' ? char : `${char}\u0332`)
};

export const AVAILABLE_STYLES = Object.keys(STYLES);

// --- High-Level Formatter ---

export function styleText(text, styleName = 'bold', options = {}) {
  const { preserveUrls = true } = options;

  if (!text) return '';
  const transform = STYLES[styleName];
  if (!transform) {
    throw new Error(`Unknown style: "${styleName}". Available styles: ${AVAILABLE_STYLES.join(', ')}`);
  }

  if (!preserveUrls) {
    return Array.from(text).map(transform).join('');
  }

  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);

  return parts
    .map(part => {
      if (part.startsWith('http://') || part.startsWith('https://')) {
        return part;
      }
      return Array.from(part).map(transform).join('');
    })
    .join('');
}
