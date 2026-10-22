# social-text-styler

> Zero-dependency Unicode text formatter for LinkedIn, X (Twitter), and Threads.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-success.svg)](https://github.com/eco-null/social-text-styler)
[![Powered by PostReady](https://img.shields.io/badge/Powered%20by-PostReady.org-purple.svg)](https://postready.org/en/tools/linkedin-text-formatter)

`social-text-styler` is a fast, lightweight library and CLI that transforms plain ASCII text into mathematical Unicode characters that render as **bold**, *italic*, `monospace`, strikethrough, bubble, and script text on platforms that don't support native Markdown (like LinkedIn and Twitter bios).

Part of the **[PostReady.org](https://postready.org)** open-source toolkit.

---

## Supported Styles

| Style | Output Example |
| :--- | :--- |
| `bold` (default) | 𝗣𝗼𝘀𝘁𝗥𝗲𝗮𝗱𝘆 𝟮𝟬𝟮𝟲 |
| `serifBold` | 𝐏𝐨𝐬𝐭𝐑𝐞𝐚𝐝𝐲 𝟐𝟎𝟐𝟔 |
| `italic` | 𝘗𝘰𝘴𝘵𝘙𝘦𝘢𝘥𝘺 |
| `serifItalic` | 𝑃𝑜𝑠𝑡𝑅𝑒𝑎𝑑𝑦 |
| `boldItalic` | 𝙋𝙤𝙨𝙩𝙍𝙚𝙖𝙙𝙮 |
| `monospace` | 𝙿𝚘𝚜𝚝𝚁𝚎𝚊𝚍𝚢 𝟸𝟶𝟸𝟼 |
| `bubble` | ⓅⓞⓢⓣⓇⓔⓐⓓⓨ ⓪②⑥ |
| `script` | 𝒫ℴ𝓈𝓉ℛℯ𝒶𝒹𝓎 |
| `fraktur` | 𝔓𝔬𝔰𝔱ℜ𝔢𝔞𝔡𝔶 |
| `strikethrough` | P̶o̶s̶t̶R̶e̶a̶d̶y̶ |
| `underline` | P̲o̲s̲t̲R̲e̲a̲d̲y̲ |

---

## Quick Start (CLI)

Run instantly with `npx`:

```bash
# Bold text (default)
npx social-text-styler "Product Launch"

# Italic headline
npx social-text-styler "Key Takeaway" --style italic

# Monospace code snippet
npx social-text-styler "const post = ready;" --style monospace

# Pipe text directly from terminal
echo "Major Announcement" | npx social-text-styler --style bubble

# List all styles with previews
npx social-text-styler --list
```

Install globally:

```bash
npm install -g social-text-styler
```

---

## Programmatic API

Install locally:

```bash
npm install social-text-styler
```

### ESM / TypeScript:

```typescript
import { styleText } from 'social-text-styler';

// Basic bold styling
const boldHeadline = styleText('Launch Day is Here!', 'bold');
console.log(boldHeadline);
// Output: 𝗟𝗮𝘂𝗻𝗰𝗵 𝗗𝗮𝘆 𝗶𝘀 𝗛𝗲𝗿𝗲!

// Smart URL preservation (preserves URLs from getting corrupted)
const post = styleText('Check our live release at https://postready.org today!', 'bold', {
  preserveUrls: true
});
console.log(post);
// Output: 𝗖𝗵𝗲𝗰𝗸 𝗼𝘂𝗿 𝗹𝗶𝘃𝗲 𝗿𝗲𝗹𝗲𝗮𝘀𝗲 𝗮𝘁 https://postready.org 𝘁𝗼𝗱𝗮𝘆!
```

---

## Web Version

Prefer a browser GUI? Use our free interactive tool on PostReady:
👉 **[PostReady LinkedIn Text Formatter](https://postready.org/en/tools/linkedin-text-formatter)**

---

## License

MIT © [eco-null](https://github.com/eco-null)
